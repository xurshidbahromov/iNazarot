import { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  Zap,
  Check,
  X,
  Layers,
  Sparkles,
  BarChart3,
  Cpu,
  Database
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { toast } from 'sonner';
import {
  amlSignalsList,
  amlTelemetryStats,
  modelMetricsData,
  featureImportancesData,
  behavioralComparisonsData,
  rocCurveData,
  channelDistributionData,
  type AMLSignal
} from '../../data/amlSignalsData';

export default function AMLMonitoring() {
  const [activeSubTab, setActiveSubTab] = useState<'triage' | 'eda' | 'models' | 'features'>('triage');
  const [signals, setSignals] = useState<AMLSignal[]>(amlSignalsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [minProbability, setMinProbability] = useState<number>(0);
  const [activeSignal, setActiveSignal] = useState<AMLSignal | null>(null);
  const [featureCategory, setFeatureCategory] = useState<string>('All');

  // Filtered signals for triage table
  const filteredSignals = useMemo(() => {
    return signals.filter(sig => {
      const matchesSearch = sig.signal_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sig.drivers.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSeverity = selectedSeverity === 'all' || sig.severity === selectedSeverity;
      const matchesProb = sig.probability >= minProbability;
      return matchesSearch && matchesSeverity && matchesProb;
    });
  }, [signals, searchQuery, selectedSeverity, minProbability]);

  // Categories for feature importances
  const categories = ['All', 'Cash Activity', 'Bank Transfers', 'Card Volume', 'Temporal & Velocity', 'Trigger Signatures', 'Amount Extremes'];
  const filteredFeatures = featureCategory === 'All' 
    ? featureImportancesData.slice(0, 15)
    : featureImportancesData.filter(f => f.category === featureCategory).slice(0, 15);

  // Handle action (Escalate or Dismiss)
  const handleAction = (id: string, action: 'escalate' | 'dismiss') => {
    setSignals(prev => prev.map(s => {
      if (s.signal_id === id) {
        return {
          ...s,
          status: action === 'escalate' ? 'escalated' : 'dismissed'
        };
      }
      return s;
    }));

    if (action === 'escalate') {
      toast.error(`Signal ${id} Markaziy Bank FinMonitoring bo'limiga eskalatsiya qilindi!`, {
        description: "Shubhali amaliyot bo'yicha tergov ishi ochildi va hisob monitoringga olindi."
      });
    } else {
      toast.success(`Signal ${id} asossiz deb topildi va yopildi.`, {
        description: "Mijozning odatiy tranzaksiyalar profili tasdiqlandi."
      });
    }

    if (activeSignal && activeSignal.signal_id === id) {
      setActiveSignal(null);
    }
  };

  const handleDownloadCsv = () => {
    toast.success("Rasmiy submission fayli yuklab olindi: team_98F12CFB.csv", {
      description: "6,000 ta test signallari bashoratlari ROC-AUC 0.62461 modeli bilan shakllantirilgan."
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Methodological & Technical Complexity Cockpit Header */}
      <div className="relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6 transition-all duration-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#20c997]/10 dark:bg-[#20c997]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center flex-shrink-0 border border-rose-100 dark:border-transparent">
              <ShieldAlert className="w-6 h-6 text-rose-500" strokeWidth={1.8} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-transparent text-rose-600 dark:text-rose-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Zap className="w-2.5 h-2.5" />
                <span>WIUT Hackathon 2026 · FinTech / AI in Finance</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                AML Alert Prioritization Cockpit
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Avtomatik tranzaksiya signallarini qayta ishlash, shubhali naqdlashtirish, smurfing va tranzit (mule) hisoblarni aniqlash hamda soxta signallarni filtrlash tizimi.
              </p>
            </div>
          </div>

          {/* Model Status Card */}
          <div className="flex items-center gap-3 bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 dark:border-transparent self-start lg:self-auto shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-12 h-11 rounded-xl bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm sm:text-base font-mono shadow-sm">
                0.6246
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#20c997] border-2 border-white dark:border-slate-900 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Model ROC-AUC</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">XGB + CAT + LGB</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">+0.0219 Lift</span>
                </div>
              </div>
            </div>

            <div className="h-7 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/80 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-transparent rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>team_98F12CFB.csv</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Jami Test Signallari</p>
            <div className="mt-1.5 text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {amlTelemetryStats.totalSignals.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">100% tahlil qilindi</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Layers className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">Kritik Xavf (≥ 70%)</p>
            <div className="mt-1.5 text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
              {amlTelemetryStats.highRiskCount.toLocaleString()}
            </div>
            <p className="text-[11px] text-rose-500/80 mt-0.5">Zudlik bilan eskalatsiya</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">O'rta Xavf (35-70%)</p>
            <div className="mt-1.5 text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {amlTelemetryStats.medRiskCount.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-500/80 mt-0.5">Qo'shimcha tekshiruv</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">Past Xavf (Tozalangan)</p>
            <div className="mt-1.5 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {amlTelemetryStats.lowRiskCount.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-500/80 mt-0.5">Soxta signal (False Alert)</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs Bar (Glassy Segmented Bar) */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
        <nav className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {[
            { id: 'triage', label: 'Prioritetli Signallar & Tergov', icon: ShieldAlert },
            { id: 'eda', label: 'Tranzaksiya Xulqi & EDA', icon: Database },
            { id: 'models', label: 'Model Benchmarking & ROC-AUC', icon: Cpu },
            { id: 'features', label: 'Top 25 AML Xususiyatlari', icon: BarChart3 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`whitespace-nowrap py-2 px-4 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-white/10 text-[#20c997] shadow-sm border border-slate-200 dark:border-transparent'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#20c997]' : 'text-slate-400'}`} strokeWidth={1.8} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ---------------- SUB-TAB 1: TRIAGE ---------------- */}
      {activeSubTab === 'triage' && (
        <div className="space-y-6">
          {/* Filter & Search Controls */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-4 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Signal ID yoki xavf omili bo'yicha qidirish (masalan, SG_007656, Naqd, Smurfing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20c997]/30 transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
              {[
                { id: 'all', label: 'Barchasi' },
                { id: 'critical', label: 'Kritik Xavf' },
                { id: 'warning', label: "O'rta Xavf" },
                { id: 'low', label: 'Past Xavf' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSeverity(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedSeverity === tab.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'bg-slate-100/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Min Xavf:</span>
              <input
                type="range"
                min={0}
                max={90}
                step={5}
                value={minProbability}
                onChange={(e) => setMinProbability(Number(e.target.value))}
                className="w-20 accent-[#20c997] cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 min-w-[32px]">
                {minProbability}%
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Prioritetli AML Signallari</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {filteredSignals.length} ta natija
                </span>
              </div>
              <span className="text-[11px] text-slate-400">ML ehtimolligi bo'yicha tartiblangan</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Signal ID</th>
                    <th className="py-3.5 px-4">Sana</th>
                    <th className="py-3.5 px-4">Eskalatsiya Ehtimolligi</th>
                    <th className="py-3.5 px-4">Aniqlangan Xavf Omili</th>
                    <th className="py-3.5 px-4">24h / Jami Tranzaksiyalar</th>
                    <th className="py-3.5 px-4">Holat</th>
                    <th className="py-3.5 px-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredSignals.slice(0, 30).map((sig) => {
                    const isEscalated = sig.status === 'escalated';
                    const isDismissed = sig.status === 'dismissed';

                    return (
                      <tr
                        key={sig.signal_id}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              sig.severity === 'critical' ? 'bg-rose-500 animate-pulse' :
                              sig.severity === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                            <span>{sig.signal_id}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono">
                          {sig.signal_date}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  sig.probability >= 70 ? 'bg-rose-500' :
                                  sig.probability >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${sig.probability}%` }}
                              />
                            </div>
                            <span className={`font-mono font-bold text-xs ${
                              sig.probability >= 70 ? 'text-rose-600 dark:text-rose-400' :
                              sig.probability >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                            }`}>
                              {sig.probability}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {sig.drivers.map((drv, i) => (
                              <span
                                key={i}
                                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                                  drv.includes('Naqd') ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                                  drv.includes('Smurfing') ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400' :
                                  drv.includes('Chiqim') ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400' :
                                  drv.includes('Tranzit') ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' :
                                  'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                {drv}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                          <span className="font-bold text-slate-900 dark:text-white">{sig.tx_24h}</span> / {sig.tx_count}
                        </td>
                        <td className="py-3.5 px-4">
                          {isEscalated ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md">
                              <Check className="w-3 h-3" /> Eskalatsiya qilingan
                            </span>
                          ) : isDismissed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                              <X className="w-3 h-3" /> Yopilgan (Dismissed)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md">
                              Kutilmoqda
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setActiveSignal(sig)}
                              className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
                              title="Tergov faylini ko'rish"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction(sig.signal_id, 'escalate')}
                              className="px-2.5 py-1 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20 rounded-lg text-[11px] font-bold transition-all active:scale-95"
                            >
                              Eskalatsiya
                            </button>
                            <button
                              onClick={() => handleAction(sig.signal_id, 'dismiss')}
                              className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg text-[11px] font-medium transition-all"
                            >
                              Yopish
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 2: EDA & BEHAVIOR ---------------- */}
      {activeSubTab === 'eda' && (
        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Eskalatsiya Qilingan (1) va Rad Etilgan (0) Signallar Farqi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              14,000 ta signal bo'yicha shubhali va oddiy hisoblar o'rtasidagi asosiy farqlar statistikasi:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">AML Indikatori</th>
                    <th className="py-3 px-4 text-blue-500">Rad Etilgan (0)</th>
                    <th className="py-3 px-4 text-rose-500">Eskalatsiya (1)</th>
                    <th className="py-3 px-4">Farq (Ratio)</th>
                    <th className="py-3 px-4">Tahlil Mazmuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
                  {behavioralComparisonsData.slice(0, 10).map(item => (
                    <tr key={item.key} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-sans font-medium text-slate-800 dark:text-slate-200">{item.label}</td>
                      <td className="py-3 px-4 text-blue-600 dark:text-blue-400">{item.dismissed}</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-bold">{item.escalated}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                          item.ratio > 1.2 ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                          'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                        }`}>
                          {item.ratio > 1 ? `+${item.ratio}x` : `${item.ratio}x`}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-sans text-xs text-slate-500 dark:text-slate-400">
                        {item.key === 'amount_min' && 'Hisob muzlatilishidan oldingi salbiy pul yechish spayki'}
                        {item.key === 'naqd_sum' && 'Yuqori jismoniy naqd pul chiqarish hajmi'}
                        {item.key === 'burst_ratio_15m' && 'Limitlardan qochish uchun 15 daqiqalik bo‘lib o‘tkazishlar'}
                        {item.key === 'last1_is_chiqim' && '75.1% hollarda oxirgi amaliyot chiqim bo‘lgan'}
                        {!['amount_min', 'naqd_sum', 'burst_ratio_15m', 'last1_is_chiqim'].includes(item.key) && 'Statistik xulq-atvor og‘ishi'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Oxirgi 24 Soatlik Tranzaksiyalar Klasteri
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                O'rtacha 500 ta tranzaksiyadan 40 tasi aynan signal hosil bo'lishidan oldingi oxirgi 24 soatga to'g'ri keladi:
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { window: '180d - 30d', normal: 380, alert: 0 },
                      { window: '30d - 7d', normal: 60, alert: 0 },
                      { window: '7d - 3d', normal: 15, alert: 0 },
                      { window: 'Oxirgi 24 soat', normal: 0, alert: 41 },
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                    <XAxis dataKey="window" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="normal" fill="#3b82f6" name="Tarixiy fon" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="alert" fill="#ef4444" name="Tetiklovchi 24h spayk" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                To'lov Kanallari bo'yicha AML Xavf Profili
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Karta, Bank o'tkazmasi, Naqd va Xalqaro operatsiyalarning ulushi:
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelDistributionData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={11} unit="%" />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="percentage" fill="#20c997" radius={[4, 4, 0, 0]} name="Ulush %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 3: MODELS & ROC-AUC ---------------- */}
      {activeSubTab === 'models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    5-Fold Cross-Validation ROC Egri Chiziqlari
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    True Positive Rate vs False Positive Rate tahlili:
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-transparent">
                  Ensemble AUC: {modelMetricsData.ensembleAUC.toFixed(5)}
                </span>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rocCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                    <XAxis dataKey="fpr" stroke="#64748b" fontSize={11} domain={[0, 1]} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 1]} />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeDasharray="4 4" name="Tasodifiy (0.500)" dot={false} />
                    <Line type="monotone" dataKey="tpr_lgb" stroke="#10b981" name={`LightGBM (${modelMetricsData.lightgbmAUC.toFixed(4)})`} dot={false} strokeWidth={1.5} />
                    <Line type="monotone" dataKey="tpr_cat" stroke="#f59e0b" name={`CatBoost (${modelMetricsData.catboostAUC.toFixed(4)})`} dot={false} strokeWidth={1.5} />
                    <Line type="monotone" dataKey="tpr_xgb" stroke="#8b5cf6" name={`XGBoost (${modelMetricsData.xgboostAUC.toFixed(4)})`} dot={false} strokeWidth={1.8} />
                    <Line type="monotone" dataKey="tpr_ensemble" stroke="#ef4444" name={`★ gitcore Ensemble (${modelMetricsData.ensembleAUC.toFixed(4)})`} dot={false} strokeWidth={2.8} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Model Architecture Leaderboard */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Arxitektura Natijalari
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">5-Fold Stratified OOF ko'rsatkichlari:</p>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-between border border-slate-200/80 dark:border-transparent">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Baseline Model</span>
                      <p className="text-[10px] text-slate-400">47 ta boshlang'ich feature</p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-500">0.60268</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-between border border-slate-200/80 dark:border-transparent">
                    <div>
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">LightGBM</span>
                      <p className="text-[10px] text-slate-400">Leaf-wise GBDT</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{modelMetricsData.lightgbmAUC.toFixed(5)}</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-between border border-slate-200/80 dark:border-transparent">
                    <div>
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">CatBoost</span>
                      <p className="text-[10px] text-slate-400">Oblivious trees</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">{modelMetricsData.catboostAUC.toFixed(5)}</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-between border border-slate-200/80 dark:border-transparent">
                    <div>
                      <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">XGBoost (Hist)</span>
                      <p className="text-[10px] text-slate-400">Exact depth reg</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">{modelMetricsData.xgboostAUC.toFixed(5)}</span>
                  </div>

                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#20c997]" />
                        Weighted Rank Ensemble
                      </span>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400">65% XGB + 32% CAT + 3% LGB</p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      {modelMetricsData.ensembleAUC.toFixed(5)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 text-xs text-slate-400 flex items-center justify-between">
                <span>O'qitish vaqti:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{modelMetricsData.executionTimeSec} soniya</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 4: FEATURES ---------------- */}
      {activeSubTab === 'features' && (
        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Eng Muhim 25 ta AML Xususiyati (Feature Importance)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Modelning qaror qabul qilishida eng yuqori ta'sirga ega bo'lgan omillar:
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFeatureCategory(cat)}
                    className={`text-xs px-3 py-1 rounded-xl transition-all ${
                      featureCategory === cat
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={filteredFeatures}
                  margin={{ top: 10, right: 30, left: 140, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={11} unit="%" />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={135} />
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Ahamiyati']}
                    contentStyle={{ borderRadius: '12px' }}
                  />
                  <Bar dataKey="importance" fill="#20c997" radius={[0, 4, 4, 0]}>
                    {filteredFeatures.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.category === 'Cash Activity' ? '#f59e0b' :
                          entry.category === 'Bank Transfers' ? '#8b5cf6' :
                          entry.category === 'Temporal & Velocity' ? '#ef4444' :
                          entry.category === 'Trigger Signatures' ? '#ec4899' :
                          '#20c997'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 5. Deep Investigation Dossier Modal */}
      {activeSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#111827] border-2 border-slate-200 dark:border-white/10 rounded-[24px] max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setActiveSignal(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                activeSignal.severity === 'critical' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600' :
                activeSignal.severity === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600' :
                'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {activeSignal.signal_id}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    activeSignal.severity === 'critical' ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' :
                    activeSignal.severity === 'warning' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                    'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {activeSignal.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Signal sanasi: {activeSignal.signal_date}</p>
              </div>
            </div>

            {/* Probability Gauge Bar */}
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Model Bashorati Ehtimolligi:</span>
                <span className="font-mono font-extrabold text-base text-rose-600 dark:text-rose-400">
                  {activeSignal.probability}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    activeSignal.probability >= 70 ? 'bg-rose-500' :
                    activeSignal.probability >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${activeSignal.probability}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Tavsiya etilgan amal: <strong className="text-slate-800 dark:text-slate-200">{activeSignal.recommended_action}</strong>
              </p>
            </div>

            {/* AI Explanation Text */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-[#20c997]" />
                <span>Sun'iy Intellekt Tahlili va Xulosa:</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 p-3.5 rounded-xl">
                {activeSignal.explanation}
              </p>
            </div>

            {/* Granular AML Indicators Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/80 dark:border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">24h Operatsiyalar</span>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-1 block">
                  {activeSignal.tx_24h} ta
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/80 dark:border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Max Chiqim</span>
                <span className="text-sm font-mono font-bold text-rose-600 dark:text-rose-400 mt-1 block">
                  {activeSignal.min_amount}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/80 dark:border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Smurfing Bursts</span>
                <span className="text-sm font-mono font-bold text-amber-600 dark:text-amber-400 mt-1 block">
                  {activeSignal.burst_15m_count} ta
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/80 dark:border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pass-through</span>
                <span className="text-sm font-mono font-bold text-purple-600 dark:text-purple-400 mt-1 block">
                  {activeSignal.pass_through_ratio}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => handleAction(activeSignal.signal_id, 'dismiss')}
                className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
              >
                Asossiz deb Yopish
              </button>
              <button
                onClick={() => handleAction(activeSignal.signal_id, 'escalate')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20 active:scale-95 flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Markaziy Bankka Eskalatsiya Qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
