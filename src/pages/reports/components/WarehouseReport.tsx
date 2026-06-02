import { useWarehouseStore } from '../../../store/useWarehouseStore';
import { useCRMStore } from '../../../store/useCRMStore';
import { Package, AlertTriangle } from 'lucide-react';

export default function WarehouseReport({ reportId }: { reportId: number }) {
  const { products } = useWarehouseStore();

  if (reportId === 18) { // Mahsulotlar qoldig'i
    const totalItems = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockItems = products.filter(p => p.stock <= (p.minStock || 0)).length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami Ombor Qoldig'i</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalItems.toLocaleString()} (Birlik)</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Kam qolgan mahsulotlar</p>
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">{lowStockItems} ta tur</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">SKU</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Mahsulot</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Kategoriya</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400 text-right">Qoldiq</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400 text-right">Holat</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400">{p.sku}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{p.name}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{p.category}</td>
                  <td className="px-5 py-3 text-sm font-bold text-slate-900 dark:text-white text-right">
                    {p.stock} <span className="text-slate-500 font-normal text-xs">{p.unit}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {p.stock <= (p.minStock || 0) ? (
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400">Kam qolgan</span>
                    ) : (
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">Yetarli</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (reportId === 22) { // Tovarlar kirim-chiqimi
    const { transfers, locations } = useWarehouseStore();
    const { orders } = useCRMStore();

    // Map transfers to a common movement interface
    const transferMovements = transfers.map(t => {
      const product = products.find(p => p.id === t.productId);
      const fromLoc = locations.find(l => l.id === t.fromLocationId)?.name || 'Noma\'lum';
      const toLoc = locations.find(l => l.id === t.toLocationId)?.name || 'Noma\'lum';
      return {
        id: `trf-${t.id}`,
        date: t.date,
        productName: product?.name || 'Noma\'lum mahsulot',
        sku: product?.sku || '-',
        type: 'Ko\'chirish',
        quantity: t.quantity,
        unit: product?.unit || 'dona',
        details: `${fromLoc} ➔ ${toLoc}`,
        status: t.status === 'tasdiqlangan' ? 'tasdiqlandi' : t.status
      };
    });

    // Map order products to movements representing "Chiqim" (output/sales)
    const salesMovements: any[] = [];
    orders.forEach(order => {
      order.products.forEach((op, idx) => {
        const product = products.find(p => p.id === op.productId);
        salesMovements.push({
          id: `sale-${order.id}-${idx}`,
          date: order.date,
          productName: op.name,
          sku: product?.sku || '-',
          type: 'Chiqim',
          quantity: op.quantity,
          unit: product?.unit || 'dona',
          details: `Savdo (POS/CRM): ${order.clientName}`,
          status: 'tasdiqlandi'
        });
      });
    });

    // Simulated "Kirim" (imports/supplies)
    const supplyMovements = [
      { id: 'sup-1', date: '2026-05-20', productName: 'Oliy navli bug\'doy uni 2kg', sku: 'SKU-0001', type: 'Kirim', quantity: 500, unit: 'dona', details: 'Ta\'minotchi "Oziq-ovqat Baza LLC"', status: 'tasdiqlandi' },
      { id: 'sup-2', date: '2026-05-21', productName: 'Kungaboqar yog\'i "Oila" 1L', sku: 'SKU-0002', type: 'Kirim', quantity: 300, unit: 'dona', details: 'Ta\'minotchi "Oila Brand"', status: 'tasdiqlandi' },
      { id: 'sup-3', date: '2026-05-25', productName: 'Sut "Musaffo" 3.2% 1L', sku: 'SKU-0005', type: 'Kirim', quantity: 200, unit: 'dona', details: 'Ta\'minotchi "Musaffo Dairy"', status: 'tasdiqlandi' },
    ];

    // Combine and sort by date descending
    const allMovements = [...transferMovements, ...salesMovements, ...supplyMovements].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami Kirim Harakati</p>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {allMovements.filter(m => m.type === 'Kirim').reduce((acc, m) => acc + m.quantity, 0).toLocaleString()} dona
            </h3>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami Chiqim Harakati</p>
            <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
              {allMovements.filter(m => m.type === 'Chiqim').reduce((acc, m) => acc + m.quantity, 0).toLocaleString()} dona
            </h3>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Ichki Ko'chirishlar</p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {allMovements.filter(m => m.type === 'Ko\'chirish').reduce((acc, m) => acc + m.quantity, 0).toLocaleString()} dona
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Tovarlar kirim-chiqimi va harakatlari jurnali</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Sana</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Mahsulot</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Harakat turi</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400 text-right">Miqdori</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Batafsil / Manba</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400 text-right">Holat</th>
              </tr>
            </thead>
            <tbody>
              {allMovements.map(m => (
                <tr key={m.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400">{m.date}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{m.productName}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">SKU: {m.sku}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
                      m.type === 'Kirim' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 
                      m.type === 'Chiqim' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                    }`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 text-right">
                    {m.quantity} <span className="text-slate-400 font-normal text-xs">{m.unit}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{m.details}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                      m.status === 'tasdiqlandi' ? 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
                    } uppercase`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
}
