import { useCRMStore } from '../../../store/useCRMStore';
import { ShoppingBag, Users, Banknote } from 'lucide-react';

export default function CRMReport({ reportId }: { reportId: number }) {
  const { orders, clients } = useCRMStore();

  if (reportId === 1) { // Umumiy savdo
    const totalSales = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalPaid = orders.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const totalDebt = totalSales - totalPaid;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami Savdo</p>
              <h3 className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalSales.toLocaleString()} UZS</h3>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">To'langan (Kirim)</p>
              <h3 className="text-xl lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalPaid.toLocaleString()} UZS</h3>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center">
              <Banknote className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Nasiya (Qarz)</p>
              <h3 className="text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">{totalDebt.toLocaleString()} UZS</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Buyurtma</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Sana</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Mijoz</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Jami Summa</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">To'langan</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Holat</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-slate-900 dark:text-white">{o.orderNumber}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{o.date}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{o.clientName}</td>
                  <td className="px-5 py-3 text-sm font-bold text-slate-800 dark:text-slate-200">{o.totalAmount.toLocaleString()} UZS</td>
                  <td className="px-5 py-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium">{o.paidAmount.toLocaleString()} UZS</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-[11px] font-bold rounded-full ${o.status === 'yakunlandi' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'} uppercase tracking-wide`}>
                      {o.status.replace('_', ' ')}
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

  if (reportId === 28) { // Mijoz balansi
    const totalDebt = clients.reduce((acc, curr) => acc + (curr.balance < 0 ? curr.balance : 0), 0);
    const totalAdvance = clients.reduce((acc, curr) => acc + (curr.balance > 0 ? curr.balance : 0), 0);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Bizning qarzdorlik (Mijozlar avansi)</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalAdvance.toLocaleString()} UZS</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Mijozlar qarzi (Nasiya)</p>
              <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{Math.abs(totalDebt).toLocaleString()} UZS</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Mijoz</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Telefon</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Oxirgi xarid</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400 text-right">Balans</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{c.name}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{c.phone}</td>
                  <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-500">{c.lastPurchase || '-'}</td>
                  <td className={`px-5 py-3 text-sm font-bold text-right ${c.balance > 0 ? 'text-emerald-600 dark:text-emerald-400' : c.balance < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {c.balance.toLocaleString()} UZS
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
