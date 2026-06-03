import * as XLSX from 'xlsx';
import { useFinanceStore } from '../store/useFinanceStore';
import { useCRMStore } from '../store/useCRMStore';
import { useWarehouseStore } from '../store/useWarehouseStore';
import { useProductionStore } from '../store/useProductionStore';
import { useSupplyStore } from '../store/useSupplyStore';
import { useDistributionStore } from '../store/useDistributionStore';
import { reports } from '../data/reportsData';

export const exportReportToExcel = (reportId: number) => {
  const reportDef = reports.find(r => r.id === reportId);
  if (!reportDef) return;

  let data: any[] = [];
  
  const financeState = useFinanceStore.getState();
  const crmState = useCRMStore.getState();
  const warehouseState = useWarehouseStore.getState();
  const productionState = useProductionStore.getState();
  const supplyState = useSupplyStore.getState();
  const distState = useDistributionStore.getState();

  // Moliya (Finance)
  if ([2, 3].includes(reportId)) {
    data = financeState.transactions.map(t => ({
      Sana: t.date,
      Turi: t.type,
      Miqdor: t.amount,
      Valyuta: t.currency,
      Kurs: t.rate,
      Tavsif: t.description,
      Usul: t.method
    }));
  } 
  // CRM
  else if ([1, 6, 28].includes(reportId)) {
    data = crmState.orders.map(o => ({
      Buyurtma_No: o.orderNumber,
      Sana: o.date,
      Mijoz: o.clientName,
      Jami_Summa: o.totalAmount,
      Tolov_Holati: o.paymentStatus,
      Holat: o.status
    }));
  } 
  // Ombor (Warehouse)
  else if ([18, 22].includes(reportId)) {
    data = warehouseState.products.map(p => ({
      Mahsulot: p.name,
      Kategoriya: p.category,
      Qoldiq: p.stock,
      Birlik: p.unit,
      Narx: p.price,
      Holat: p.stock > 0 ? 'Mavjud' : 'Tugagan'
    }));
  }
  // Ishlab chiqarish
  else if (reportDef.category === 'production') {
    data = productionState.productionOrders.map(p => ({
      Buyurtma_No: p.orderNumber,
      Mahsulot: p.productName,
      Miqdor: p.quantity,
      Boshlanish_Sanasi: p.startDate,
      Tugash_Sanasi: p.endDate || '-',
      Mas_ul: p.responsible,
      Holat: p.status
    }));
  }
  // Ta'minot
  else if (reportDef.category === 'supply') {
    data = supplyState.purchases.map(p => ({
      Sana: p.date,
      Taminotchi: p.supplier,
      Jami_Summa: p.total,
      Holat: p.status
    }));
  }
  // Distributsiya
  else if (reportDef.category === 'distribution') {
    data = distState.orders.map(d => ({
      Buyurtma_No: d.orderNumber,
      Sana: d.date,
      Distributor_ID: d.distributorId,
      Jami_Summa: d.totalAmount,
      Holat: d.status
    }));
  }
  // Boshqa barcha universal hisobotlar (Generic)
  else {
    data = [1, 2, 3, 4, 5].map(i => ({
      "Tartib raqam": i,
      "Hisobot Turi": reportDef.name,
      "Sana": new Date(Date.now() - i * 86400000).toLocaleDateString(),
      "Ko'rsatkich 1": Math.floor(Math.random() * 1000) * 1000,
      "Ko'rsatkich 2": Math.floor(Math.random() * 500) * 100,
      "Holat": i % 2 === 0 ? "Bajarildi" : "Kutilmoqda"
    }));
  }

  if (data.length === 0) {
    alert("Yuklash uchun ma'lumot topilmadi");
    return;
  }

  // Excel fayl yaratish
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Ustunlar kengligini chiroyli qilish
  const colWidths = Object.keys(data[0] || {}).map(() => ({ wch: 18 }));
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  const safeSheetName = reportDef.name.replace(/[^\w\s]/gi, '').substring(0, 31).trim() || 'Hisobot';
  XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);
  
  // Faylni yuklab olish
  const fileName = `${reportDef.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
