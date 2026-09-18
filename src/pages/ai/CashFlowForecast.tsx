import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  AlertOctagon,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAIStore } from '../../store/useAIStore';
import type { DailyCashProjection } from '../../utils/aiFinancialEngine';
import { Table } from '../../components/ui/Table';
import { toast } from 'sonner';

export default function CashFlowForecast() {
  const { forecastTimeline, forecastSummary } = useAIStore();
  const [selectedRange, setSelectedRange] = useState<'30' | '14' | '7'>('30');
  const [isFixApplied, setIsFixApplied] = useState(false);

  const displayedTimeline = selectedRange === '7' 
    ? forecastTimeline.slice(0, 7)
    : selectedRange === '14'
      ? forecastTimeline.slice(0, 14)
      : forecastTimeline;

  // If user applies fix in live demo, shift the lowest point upwards!
  const chartData = displayedTimeline.map(item => {
    let adjustedBalance = item.balance;
    if (isFixApplied) {
      adjustedBalance += 14500000; // Simulated debt collection fix!
    }
    return {
      ...item,
      chartBalance: Math.round(adjustedBalance / 1000000), // In Millions for clean axis
      chartInflow: Math.round(item.inflow / 1000000),
      chartOutflow: Math.round(item.outflow / 1000000)
    };
  });

  const handleApplyAIFix = () => {
    setIsFixApplied(true);
    toast.success("AI Qarori ijro etildi: 2 ta nasiyadorga eslatma yuborildi va 5M xarid kechiktirildi. 28-sentabrdagi kassa uzilishi to'liq bartaraf qilindi! (+14.5M)");
  };

  return (
    <div className="space-y-6">
      {/* 1. Cash Cliff / Gap Warning Banner */}
      {!isFixApplied && forecastSummary.gapDetected ? (
        <div className="bg-rose-50/70 dark:bg-rose-500/10 backdrop-blur-sm p-5 rounded-[20px] border-2 border-rose-100 dark:border-transparent shadow-[0_4px_20px_-4px_rgba(244,63,94,0.08)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertOctagon className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white">
                  Kritik Xavf Aniqlandi
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {forecastSummary.lowestCashDate}-sentabr uchun kassa prognozi
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                28-sentabr kuni kassada <span className="text-rose-600 dark:text-rose-400 font-extrabold">4,200,000 UZS defitsit</span> (Cash-Flow Gap) kutilmoqda!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed max-w-2xl">
                Sababi: 32.0M UZS majburiy oylik va ijara to'lovlari belgilangan, ammo 3 ta mijozdan kutilgan 14.2M UZS nasiya to'lovlari kechikmoqda.
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyAIFix}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs shadow-sm hover:shadow transition-all duration-150 active:scale-95 flex-shrink-0"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            AI Rejasini Qo'llash (Kassani qutqarish)
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50/70 dark:bg-emerald-500/10 backdrop-blur-sm p-4 sm:p-5 rounded-[20px] border-2 border-emerald-100 dark:border-transparent shadow-[0_4px_20px_-4px_rgba(16,185,129,0.08)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                Kassa uzilishi xavfi muvaffaqiyatli bartaraf etildi!
              </p>
              <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                Nasiyalarni jadallashtirish va xarajatlarni optimallashtirish hisobiga keyingi 30 kunda kassa balansi barqaror ijobiy bo'ladi.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-white/10 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 shadow-sm self-start sm:self-auto">
            Zaxira: +10.3M UZS
          </span>
        </div>
      )}

      {/* 2. Key Forecast Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Inflow */}
        <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 rounded-xl transition-all duration-300 group-hover:scale-105">
              <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
            </div>
            <div className="flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-transparent">
              +{Math.round(forecastSummary.totalExpectedInflow / 1000000)}M UZS
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
              +{Math.round(forecastSummary.totalExpectedInflow / 1000000).toLocaleString()}M <span className="text-xs font-semibold text-slate-400">UZS</span>
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">Kutilayotgan Tushum (30 kun)</p>
          </div>
        </div>

        {/* Card 2: Outflow */}
        <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-rose-50 dark:bg-rose-500/10 rounded-xl transition-all duration-300 group-hover:scale-105">
              <ArrowDownRight className="h-5 w-5 text-rose-600 dark:text-rose-400" strokeWidth={1.8} />
            </div>
            <div className="flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-transparent">
              -{Math.round(forecastSummary.totalExpectedOutflow / 1000000)}M UZS
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
              -{Math.round(forecastSummary.totalExpectedOutflow / 1000000).toLocaleString()}M <span className="text-xs font-semibold text-slate-400">UZS</span>
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">Kutilayotgan Chiqim (30 kun)</p>
          </div>
        </div>

        {/* Card 3: Net Cash Flow */}
        <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-xl transition-all duration-300 group-hover:scale-105">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" strokeWidth={1.8} />
            </div>
            <div className="flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-transparent">
              Sof o'sish
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
              +{Math.round((forecastSummary.totalExpectedInflow - forecastSummary.totalExpectedOutflow) / 1000000).toLocaleString()}M <span className="text-xs font-semibold text-slate-400">UZS</span>
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">Sof Pul Oqimi</p>
          </div>
        </div>

        {/* Card 4: Dip Point */}
        <div className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 flex items-center justify-center ${isFixApplied ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-amber-50 dark:bg-amber-500/10'} rounded-xl transition-all duration-300 group-hover:scale-105`}>
              <ShieldCheck className={`h-5 w-5 ${isFixApplied ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`} strokeWidth={1.8} />
            </div>
            <div className={`flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border ${isFixApplied ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-transparent' : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-transparent'}`}>
              {isFixApplied ? 'Xavfsiz' : 'Uzilish nuqtasi'}
            </div>
          </div>
          <div className="mt-4">
            <p className={`text-xl font-bold truncate ${isFixApplied ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isFixApplied ? '+10.3M' : '-4.2M'} <span className="text-xs font-semibold text-slate-400">UZS</span>
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
              {isFixApplied ? "Zaxira tiklandi" : `${forecastSummary.lowestCashDate}-sentabr kassa holati`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Predictive Cash Flow Chart */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6 space-y-4 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#20c997]" strokeWidth={1.8} />
              Kelgusi 30 Kunlik Pul Oqimi Dinamikasi (Cash Flow Trajectory)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Har kunlik kirim, chiqim va kassa balansining real-vaqtdagi hisoblangan trayektoriyasi.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-transparent p-1 rounded-xl self-start sm:self-auto">
            {(['7', '14', '30'] as const).map(range => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedRange === range
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/80 dark:border-transparent'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {range} kun
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20c997" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#20c997" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}M`} />
              <Tooltip
                wrapperStyle={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as DailyCashProjection & { chartBalance: number };
                    return (
                      <div className="backdrop-blur-md bg-white/85 dark:bg-slate-900/90 border border-white/60 dark:border-white/10 p-3.5 rounded-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex flex-col gap-1.5 min-w-[200px] select-none text-xs">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                        <p className="text-slate-900 dark:text-slate-100 font-bold flex justify-between">
                          <span>Kassa balansi:</span>
                          <span className="text-[#20c997] font-extrabold">{data.balance.toLocaleString()} UZS</span>
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 flex justify-between">
                          <span>Kutilgan kirim:</span>
                          <span className="text-emerald-600 font-semibold">+{data.inflow.toLocaleString()} UZS</span>
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 flex justify-between">
                          <span>Kutilgan chiqim:</span>
                          <span className="text-rose-500 font-semibold">-{data.outflow.toLocaleString()} UZS</span>
                        </p>
                        {data.notes && (
                          <p className="text-amber-600 dark:text-amber-400 text-[11px] font-medium pt-1.5 border-t border-slate-100 dark:border-white/5">
                            {data.notes}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Xavfsizlik buferi (5M)", fill: '#ef4444', fontSize: 10, position: 'insideBottomRight' }} />
              <Area
                type="monotone"
                dataKey="chartBalance"
                name="Kassa Balansi"
                stroke="#20c997"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#balanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 4. Day-by-Day Schedule Table */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6 transition-all duration-300">
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
          Kunlik Pul Oqimi Jadvali & Muhim Voqealar
        </h4>

        <div className="overflow-x-auto">
          <Table<DailyCashProjection>
            variant="nested"
            columns={[
              { key: 'date', label: 'Sana' },
              { key: 'inflow', label: 'Kutilayotgan Kirim' },
              { key: 'outflow', label: 'Kutilayotgan Chiqim' },
              { key: 'balance', label: 'Yakuniy Kassa' },
              { key: 'status', label: 'Holat' },
              { key: 'notes', label: 'Izoh & Eslatmalar' },
            ]}
            data={displayedTimeline}
            renderRow={(row: DailyCashProjection) => (
              <>
                <td className="px-6 py-3.5 whitespace-nowrap text-xs font-bold text-slate-800 dark:text-slate-200">
                  {row.date}
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +{row.inflow.toLocaleString()} UZS
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap text-xs font-semibold text-rose-600 dark:text-rose-400">
                  -{row.outflow.toLocaleString()} UZS
                </td>
                <td className={`px-6 py-3.5 whitespace-nowrap text-xs font-extrabold ${row.isDeficit ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>
                  {row.balance.toLocaleString()} UZS
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                    row.isDeficit 
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                  }`}>
                    {row.isDeficit ? 'Xavf / Uzilish' : 'Barqaror'}
                  </span>
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                  {row.notes || 'Oddiy savdo kuni'}
                </td>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
