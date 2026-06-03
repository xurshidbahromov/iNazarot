import type { Product } from '../store/useWarehouseStore';
import type { Transaction } from '../store/useFinanceStore';

interface ReceiptItem {
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

interface PrintReceiptOptions {
  items: ReceiptItem[];
  total: number;
  method: string;
  checkId: string;
  cashierName?: string;
}

export function printReceipt({ items, total, method, checkId, cashierName = 'Kassir 01' }: PrintReceiptOptions) {
  const now = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date());

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:6px 4px; border-bottom:1px dashed #e2e8f0; font-size:13px; color:#1e293b;">${item.name}</td>
      <td style="padding:6px 4px; border-bottom:1px dashed #e2e8f0; font-size:13px; text-align:center; color:#64748b;">${item.quantity} ${item.unit}</td>
      <td style="padding:6px 4px; border-bottom:1px dashed #e2e8f0; font-size:13px; text-align:right; color:#64748b;">${item.price.toLocaleString()}</td>
      <td style="padding:6px 4px; border-bottom:1px dashed #e2e8f0; font-size:13px; text-align:right; font-weight:700; color:#0f172a;">${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  const receiptHtml = `
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8" />
      <title>Chek — POS-${checkId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', Courier, monospace; background: #fff; color: #1e293b; }
        .receipt { width: 320px; margin: 0 auto; padding: 20px 16px; }
        .header { text-align: center; margin-bottom: 16px; border-bottom: 2px dashed #cbd5e1; padding-bottom: 16px; }
        .logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #0f172a; }
        .logo span { color: #10b981; }
        .subtitle { font-size: 11px; color: #64748b; margin-top: 4px; letter-spacing: 1px; text-transform: uppercase; }
        .check-id { font-size: 11px; color: #94a3b8; margin-top: 8px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        thead th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; padding: 4px 4px 8px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        thead th:nth-child(2), thead th:nth-child(3), thead th:nth-child(4) { text-align: center; }
        thead th:nth-child(4) { text-align: right; }
        .total-section { border-top: 2px dashed #cbd5e1; padding-top: 12px; margin-top: 4px; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
        .total-row span:first-child { font-size: 13px; color: #64748b; }
        .total-row span:last-child { font-size: 13px; font-weight: 700; color: #1e293b; }
        .grand-total span:first-child { font-size: 15px; font-weight: 900; color: #0f172a; }
        .grand-total span:last-child { font-size: 18px; font-weight: 900; color: #10b981; }
        .footer { text-align: center; margin-top: 20px; border-top: 2px dashed #cbd5e1; padding-top: 16px; }
        .footer p { font-size: 11px; color: #94a3b8; line-height: 1.6; }
        .method-badge { display: inline-block; background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-top: 4px; }
        @media print {
          body { background: white; }
          .receipt { width: 100%; max-width: 320px; }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">i<span>Nazorat</span></div>
          <div class="subtitle">Kassa terminali</div>
          <div class="check-id">Chek: POS-${checkId}</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${now}</div>
          <div style="font-size:11px; color:#64748b; margin-top:2px;">${cashierName}</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Mahsulot</th>
              <th style="text-align:center;">Miqdor</th>
              <th style="text-align:right;">Narx</th>
              <th style="text-align:right;">Jami</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-row">
            <span>Mahsulotlar soni:</span>
            <span>${items.reduce((a, c) => a + c.quantity, 0)} ta</span>
          </div>
          <div class="total-row" style="margin-top:4px;">
            <span>To'lov usuli:</span>
            <span class="method-badge">${method}</span>
          </div>
          <div class="total-row grand-total" style="margin-top:10px; padding-top:10px; border-top:1px dashed #e2e8f0;">
            <span>JAMI:</span>
            <span>${total.toLocaleString()} UZS</span>
          </div>
        </div>

        <div class="footer">
          <p>Xarid uchun rahmat!</p>
          <p>iNazorat ERP • www.inazorat.uz</p>
        </div>
      </div>
      <script>
        window.onload = () => { window.print(); }
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=400,height=600,toolbar=0,menubar=0,scrollbars=1');
  if (printWindow) {
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  }
}

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = val === null || val === undefined ? '' : String(val);
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? `"${str.replace(/"/g, '""')}"` : str;
      }).join(',')
    )
  ];
  const csvContent = '\uFEFF' + csvRows.join('\n'); // BOM for Excel UTF-8
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Smart Alerts helper — returns actionable alerts from real store data
export function getSystemAlerts(products: Product[], transactions: Transaction[]) {

  const alerts: { id: string; type: 'warning' | 'error' | 'info'; title: string; body: string; href: string }[] = [];

  // 1. Low/out of stock — individual minStock threshold ishlatiladi
  const outOfStock = products.filter(p => p.stock === 0);
  // Har mahsulot uchun o'z minStock chegarasidan foydalaniladi (yo'q bo'lsa global 50)
  const lowStock = products.filter(p => {
    if (p.stock === 0) return false;
    const threshold = p.minStock ?? 50;
    return p.stock <= threshold;
  });

  outOfStock.forEach(p => {
    alerts.push({
      id: `out-${p.id}`,
      type: 'error',
      title: 'Mahsulot tugadi!',
      body: `${p.name} — zaxirada 0 ${p.unit} qoldi`,
      href: '/warehouse/products',
    });
  });

  lowStock.slice(0, 5).forEach(p => {
    const threshold = p.minStock ?? 50;
    alerts.push({
      id: `low-${p.id}`,
      type: 'warning',
      title: 'Minimal chegara oshildi',
      body: `${p.name} — ${p.stock} ${p.unit} qoldi (min: ${threshold} ${p.unit})`,
      href: '/warehouse/products',
    });
  });

  // 2. Daily income summary (today's transactions)
  const today = new Date();
  const todayStrDot = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
  const todayStrSlash = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const todayTrx = transactions.filter(t => t.date.startsWith(todayStrDot) || t.date.startsWith(todayStrSlash));
  const todayIncome = todayTrx.filter(t => t.type === 'Kirim').reduce((a, t) => a + t.amount * t.rate, 0);
  const todayExpense = todayTrx.filter(t => t.type === 'Chiqim').reduce((a, t) => a + t.amount * t.rate, 0);

  if (todayIncome > 0 || todayExpense > 0) {
    alerts.push({
      id: 'today-summary',
      type: 'info',
      title: "Bugungi moliya",
      body: `Kirim: ${todayIncome.toLocaleString()} UZS • Chiqim: ${todayExpense.toLocaleString()} UZS`,
      href: '/finance/cashbox',
    });
  }

  return alerts;
}

interface PrintShiftReportOptions {
  shiftId: string;
  cashierName: string;
  openTime: string;
  openingCash: number;
  cashSales: number;
  cardSales: number;
}

export function printShiftReport({
  shiftId,
  cashierName,
  openTime,
  openingCash,
  cashSales,
  cardSales
}: PrintShiftReportOptions) {
  const now = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date());

  const openedStr = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(openTime));

  const totalSales = cashSales + cardSales;
  const expectedCashInBox = openingCash + cashSales;

  const reportHtml = `
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8" />
      <title>Smena hisoboti — ${shiftId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', Courier, monospace; background: #fff; color: #1e293b; }
        .receipt { width: 320px; margin: 0 auto; padding: 20px 16px; }
        .header { text-align: center; margin-bottom: 16px; border-bottom: 2px dashed #cbd5e1; padding-bottom: 16px; }
        .logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #0f172a; }
        .logo span { color: #10b981; }
        .subtitle { font-size: 11px; color: #64748b; margin-top: 4px; letter-spacing: 1px; text-transform: uppercase; }
        .check-id { font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 8px; }
        .row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed #e2e8f0; }
        .row span:first-child { font-size: 12px; color: #64748b; }
        .row span:last-child { font-size: 12px; font-weight: 750; color: #1e293b; text-align: right; }
        .total-section { border-top: 2px dashed #cbd5e1; padding-top: 12px; margin-top: 8px; }
        .grand-total span:first-child { font-size: 14px; font-weight: 900; color: #0f172a; }
        .grand-total span:last-child { font-size: 16px; font-weight: 900; color: #10b981; }
        .footer { text-align: center; margin-top: 20px; border-top: 2px dashed #cbd5e1; padding-top: 16px; }
        .footer p { font-size: 11px; color: #94a3b8; line-height: 1.6; }
        @media print {
          body { background: white; }
          .receipt { width: 100%; max-width: 320px; }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">i<span>Nazorat</span></div>
          <div class="subtitle">Smena Xisoboti</div>
          <div class="check-id">${shiftId}</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Bosilgan vaqt: ${now}</div>
        </div>

        <div class="row">
          <span>Kassir:</span>
          <span>${cashierName}</span>
        </div>
        <div class="row">
          <span>Ochilgan vaqt:</span>
          <span>${openedStr}</span>
        </div>
        <div class="row">
          <span>Boshlang'ich naqd pul:</span>
          <span>${openingCash.toLocaleString()} UZS</span>
        </div>
        <div class="row">
          <span>Naqd savdolar:</span>
          <span>${cashSales.toLocaleString()} UZS</span>
        </div>
        <div class="row">
          <span>Karta savdolari:</span>
          <span>${cardSales.toLocaleString()} UZS</span>
        </div>

        <div class="total-section">
          <div class="row" style="border-bottom: none;">
            <span>Jami Savdolar:</span>
            <span style="font-weight: 900; color: #0f172a;">${totalSales.toLocaleString()} UZS</span>
          </div>
          <div class="row grand-total" style="margin-top:6px; padding-top:6px; border-top:1px dashed #e2e8f0; border-bottom: none;">
            <span>Kassadagi kutilgan naqd:</span>
            <span>${expectedCashInBox.toLocaleString()} UZS</span>
          </div>
        </div>

        <div class="footer">
          <p>Smena muvaffaqiyatli yakunlandi.</p>
          <p>iNazorat ERP • www.inazorat.uz</p>
        </div>
      </div>
      <script>
        window.onload = () => { window.print(); }
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=400,height=600,toolbar=0,menubar=0,scrollbars=1');
  if (printWindow) {
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  }
}

