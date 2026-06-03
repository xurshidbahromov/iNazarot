import { reports } from '../../../data/reportsData';

export default function GenericReportTable({ reportId }: { reportId: number }) {
  const report = reports.find(r => r.id === reportId);
  if (!report) return null;

  // Generate some deterministic mock data based on report id so it looks realistic
  const generateMockData = () => {
    const data = [];
    const rowsCount = 5 + (reportId % 5);
    for (let i = 1; i <= rowsCount; i++) {
      const amount = (reportId * 100000) + (i * 50000) + (Math.random() * 10000);
      data.push({
        id: i,
        name: `${report.name} elementi #${i}`,
        date: `2026-06-0${(i % 9) + 1}`,
        value: amount,
        status: i % 2 === 0 ? 'Faol' : 'Bajarildi'
      });
    }
    return data;
  };

  const mockData = generateMockData();
  const totalValue = mockData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Jami ko'rsatkich</p>
          <h3 className={`text-2xl font-bold mt-1 ${report.color.split(' ')[0]}`}>
            {totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} UZS
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${report.bg}`}>
          <report.icon className={`w-6 h-6 ${report.color.split(' ')[0]}`} />
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">{report.name} bo'yicha batafsil ro'yxat</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10">
              <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">#</th>
              <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Nomlanishi</th>
              <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Sana</th>
              <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Holat</th>
              <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400 text-right">Qiymat</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, idx) => (
              <tr key={item.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400">{idx + 1}</td>
                <td className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</td>
                <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{item.date}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 text-[11px] font-bold rounded-full ${item.status === 'Faol' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 text-right">
                  {item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
