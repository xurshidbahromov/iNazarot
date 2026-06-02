import { useWarehouseStore } from '../../../store/useWarehouseStore';
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

  return null;
}
