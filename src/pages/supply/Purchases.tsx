import { useState } from 'react';
import { ShoppingBag, Plus, Search, Truck, Clock, CheckCircle, XCircle, Eye, DollarSign, Calendar, FileText, Trash2, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useSupplyStore } from '../../store/useSupplyStore';
import type { Purchase } from '../../store/useSupplyStore';
import { useWarehouseStore } from '../../store/useWarehouseStore';
import { exportToExcel } from '../../utils/exportToExcel';

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType; border: string }> = {
  "qabul_qilindi": { label: "Qabul qilindi", color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200/60 dark:border-emerald-900/30', icon: CheckCircle },
  "kutilmoqda": { label: 'Kutilmoqda', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200/60 dark:border-amber-900/30', icon: Clock },
  "bekor_qilingan": { label: "Bekor qilingan", color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20', border: 'border-red-200/60 dark:border-red-900/30', icon: XCircle },
};

export default function Purchases() {
  const { purchases, addPurchase, updatePurchaseStatus, suppliers } = useSupplyStore();
  const { products, updateStock } = useWarehouseStore();
  const [search, setSearch] = useState('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  // Form State
  const [supplier, setSupplier] = useState('');
  const [additionalExpense, setAdditionalExpense] = useState(0);
  const [itemsList, setItemsList] = useState<{ productId: number; productName: string; quantity: number; price: number }[]>([]);

  const filtered = purchases.filter(p =>
    p.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = purchases.reduce((a, p) => a + p.total, 0);
  const totalAdditionalExpense = purchases.reduce((a, p) => a + (p.additionalExpense || 0), 0);

  const calculatedTotal = itemsList.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const handleAddItem = () => {
    if (products.length > 0) {
      setItemsList([...itemsList, { productId: products[0].id, productName: products[0].name, quantity: 1, price: 0 }]);
    }
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const newItems = [...itemsList];
    if (field === 'productId') {
      const prod = products.find(p => p.id === Number(value));
      if (prod) {
        newItems[index] = { ...newItems[index], productId: prod.id, productName: prod.name };
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: Number(value) };
    }
    setItemsList(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setItemsList(itemsList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier || itemsList.length === 0) return;

    addPurchase({
      supplier,
      items: itemsList.length,
      total: calculatedTotal,
      additionalExpense: Number(additionalExpense),
      status: 'kutilmoqda',
      itemsList
    });

    setSupplier('');
    setAdditionalExpense(0);
    setItemsList([]);
    setIsAddModalOpen(false);
  };

  const handleStatusChange = (purchase: Purchase, newStatus: Purchase['status']) => {
    if (newStatus === 'qabul_qilindi' && purchase.status !== 'qabul_qilindi') {
      // Omborga tovarlarni qo'shish
      if (purchase.itemsList) {
        purchase.itemsList.forEach(item => {
          updateStock(item.productId, item.quantity); // qo'shish
        });
      }
    }
    updatePurchaseStatus(purchase.id, newStatus);
    setIsViewModalOpen(false);
  };

  const handleViewDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  const handleExport = () => {
    const data = filtered.map(p => ({
      "Sana": p.date,
      "Taminotchi": p.supplier,
      "Qo'shimcha xarajat": p.additionalExpense || 0,
      "Jami summa": p.total,
      "Holati": statusConfig[p.status]?.label || p.status,
      "Mahsulotlar soni": p.items
    }));
    exportToExcel(data, 'Xaridlar_Hisoboti');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#20c997]" />
            Ta'minot va Xaridlar
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Xomashyo va tovarlar xaridi, omborga kirim qilish
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button
            variant="outline"
            className="rounded-xl h-10 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /> Excel yuklash
          </Button>
          <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all active:scale-95" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Yangi xarid
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Jami xaridlar soni', value: `${purchases.length} ta`, icon: ShoppingBag, color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-white/5' },
          { label: 'Jami tovarlar qiymati', value: `${totalValue.toLocaleString()} UZS`, icon: DollarSign, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          { label: "Jami transport/qo'shimcha", value: `${totalAdditionalExpense.toLocaleString()} UZS`, icon: Truck, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
          >
            <div className={`w-10 h-10 flex items-center justify-center ${stat.bg} rounded-xl transition-all duration-300 group-hover:scale-105`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.6} />
            </div>
            <div className="mt-4">
              <h4 className={`text-xl font-bold truncate ${idx === 1 ? 'text-emerald-600 dark:text-emerald-400' : idx === 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>{stat.value}</h4>
              <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Table Area */}
      <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-transparent bg-slate-50/50 dark:bg-white/5">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
            </div>
            <Input 
              className="pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-full transition-all h-10 shadow-sm" 
              placeholder="Yetkazib beruvchi nomi bo'yicha qidiring..."
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key: 'date', label: 'Sana' },
            { key: 'supplier', label: 'Yetkazib beruvchi' },
            { key: 'items', label: 'Mahsulotlar' },
            { key: 'total', label: 'Tovar summasi' },
            { key: 'status', label: 'Holat' },
            { key: 'actions', label: 'Amallar', className: 'text-right' },
          ]}
          data={filtered}
          renderRow={(purchase) => {
            const status = statusConfig[purchase.status] || { label: purchase.status, color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200', icon: Clock };
            const StatusIcon = status.icon;
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[13px] text-slate-500 dark:text-slate-400 sm:pl-6">{purchase.date}</td>
                <td className="whitespace-nowrap px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center font-bold text-[12px] text-indigo-600 dark:text-indigo-400">
                      {purchase.supplier.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">{purchase.supplier}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-medium text-slate-600 dark:text-slate-400">{purchase.items} xil tovar</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                  {purchase.total.toLocaleString()} <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">UZS</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${status.bg} ${status.color} ${status.border}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right text-[13px] font-medium">
                  {purchase.status === 'kutilmoqda' && (
                    <Button variant="outline" size="sm" className="mr-2 h-8 rounded-lg border-emerald-200 text-emerald-600 hover:bg-emerald-50" onClick={() => handleStatusChange(purchase, 'qabul_qilindi')}>
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Qabul qilish
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="h-8 px-2 rounded-lg text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5 hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10" onClick={() => handleViewDetails(purchase)}>
                    <Eye className="w-3.5 h-3.5 mr-1" /> Tafsilot
                  </Button>
                </td>
              </>
            );
          }}
        />
      </div>

      {/* Add Purchase Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Yangi xarid rasmiylashtirish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Yetkazib beruvchi *</label>
              <select value={supplier} onChange={(e) => setSupplier(e.target.value)}
                className="w-full h-11 px-3 bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 rounded-xl text-[14px] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" required>
                <option value="">Yetkazib beruvchini tanlang...</option>
                {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Qo'shimcha xarajat (UZS)</label>
              <Input type="number" min={0} value={additionalExpense || ''}
                onChange={(e) => setAdditionalExpense(Number(e.target.value))} className="h-11 rounded-xl" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/10">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Xarid qilinayotgan tovarlar</h4>
              <Button type="button" size="sm" variant="outline" onClick={handleAddItem} className="rounded-lg h-8 px-3">
                <Plus className="w-4 h-4 mr-1" /> Tovar qo'shish
              </Button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {itemsList.map((item, index) => (
                <div key={index} className="flex gap-2 items-center bg-slate-50 dark:bg-white/5 p-2 rounded-xl border border-slate-100 dark:border-transparent">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={(e) => handleUpdateItem(index, 'productId', e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f19] text-sm"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number" min={0.1} step="any"
                      placeholder="Miqdor"
                      value={item.quantity || ''}
                      onChange={(e) => handleUpdateItem(index, 'quantity', e.target.value)}
                      className="h-9 rounded-lg"
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number" min={0}
                      placeholder="Narx (UZS)"
                      value={item.price || ''}
                      onChange={(e) => handleUpdateItem(index, 'price', e.target.value)}
                      className="h-9 rounded-lg"
                    />
                  </div>
                  <button type="button" onClick={() => handleRemoveItem(index)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {itemsList.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Hali tovarlar qo'shilmadi.</p>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
              <span className="font-semibold text-indigo-800 dark:text-indigo-300">Jami hisoblangan summa:</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {calculatedTotal.toLocaleString()} UZS
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100 dark:border-transparent">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsAddModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50" disabled={itemsList.length === 0}>
              Xaridni rasmiylashtirish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Details View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Xarid tafsilotlari">
        {selectedPurchase && (
          <div className="space-y-5 p-1">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-transparent pb-3">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-slate-100">Xarid tranzaksiyasi</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedPurchase.date}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border ${
                statusConfig[selectedPurchase.status]?.bg || 'bg-slate-100 dark:bg-white/[0.06]'} ${statusConfig[selectedPurchase.status]?.color || 'text-slate-600 dark:text-slate-400'} ${statusConfig[selectedPurchase.status]?.border || 'border-slate-200 dark:border-transparent'}`}>
                {statusConfig[selectedPurchase.status]?.label || selectedPurchase.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Yetkazib beruvchi</h5>
                <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/60 dark:border-white/5 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-sm">
                    {selectedPurchase.supplier.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">{selectedPurchase.supplier}</h6>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Xarid qilingan tovarlar soni: {selectedPurchase.items} xil</p>
                  </div>
                </div>
              </div>

              {selectedPurchase.itemsList && selectedPurchase.itemsList.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Tovar ro'yxati</h5>
                  <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 dark:bg-white/5 text-xs">
                        <tr>
                          <th className="px-4 py-2 font-semibold">Nomi</th>
                          <th className="px-4 py-2 font-semibold text-center">Miqdor</th>
                          <th className="px-4 py-2 font-semibold text-right">Narx</th>
                          <th className="px-4 py-2 font-semibold text-right">Summa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {selectedPurchase.itemsList.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2">{item.productName}</td>
                            <td className="px-4 py-2 text-center font-medium">{item.quantity}</td>
                            <td className="px-4 py-2 text-right">{(item.price).toLocaleString()}</td>
                            <td className="px-4 py-2 text-right font-semibold">{(item.quantity * item.price).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <h5 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Moliyaviy hisobot</h5>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/5 space-y-2.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>Tovar umumiy summasi:</span>
                    <span className="text-slate-800 dark:text-slate-200">{selectedPurchase.total.toLocaleString()} UZS</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>Qo'shimcha / Transport xarajati:</span>
                    <span className="text-indigo-600 dark:text-indigo-400">+{(selectedPurchase.additionalExpense || 0).toLocaleString()} UZS</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-transparent pt-2">
                    <span>Jami Xarid Summasi:</span>
                    <span>{(selectedPurchase.total + (selectedPurchase.additionalExpense || 0)).toLocaleString()} UZS</span>
                  </div>
                </div>
              </div>

              {selectedPurchase.status === 'kutilmoqda' && (
                <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/30 p-3 rounded-xl">
                  <h6 className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Eslatma:
                  </h6>
                  <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                    "Qabul qilish" tugmasini bosganingizda ushbu tovarlar avtomatik ravishda ombor qoldig'iga qo'shiladi.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-transparent">
              {selectedPurchase.status === 'kutilmoqda' && (
                <Button className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleStatusChange(selectedPurchase, 'qabul_qilindi')}>
                  Tovarlarni Qabul Qilish (Kirim)
                </Button>
              )}
              <Button type="button" variant="outline" className="rounded-xl px-6" onClick={() => setIsViewModalOpen(false)}>Yopish</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
