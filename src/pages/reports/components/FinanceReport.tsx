import { useFinanceStore } from '../../../store/useFinanceStore';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function FinanceReport({ reportId }: { reportId: number }) {
  const { transactions } = useFinanceStore();

  if (reportId === 2) { // Kirim-chiqim hisoboti
    const totalKirim = transactions.filter(t => t.type === 'Kirim').reduce((acc, curr) => acc + (curr.amount * curr.rate), 0);
    const totalChiqim = transactions.filter(t => t.type === 'Chiqim').reduce((acc, curr) => acc + (curr.amount * curr.rate), 0);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami Kirim</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalKirim.toLocaleString()} UZS</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami Chiqim</p>
              <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{totalChiqim.toLocaleString()} UZS</h3>
            </div>
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-rose-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Sana</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Turi</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Miqdor</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Izoh</th>
                <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">To'lov usuli</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-700 dark:text-slate-300">{t.date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${t.type === 'Kirim' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                    {t.amount.toLocaleString()} {t.currency}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{t.description}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{t.method}</td>
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
