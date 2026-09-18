import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sparkles, TrendingUp, ShieldAlert, Bot, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAIStore } from '../../store/useAIStore';

const tabs = [
  { name: 'Pul Oqimi Prognozi (Cash Flow)', href: '/ai/forecast', icon: TrendingUp },
  { name: 'Anomaliyalar & Xavflar Radari', href: '/ai/anomalies', icon: ShieldAlert },
  { name: 'AI Financial Copilot (Maslahatchi)', href: '/ai/copilot', icon: Bot },
];

export default function AILayout() {
  const location = useLocation();
  const { healthScore, isAnalyzing, refreshIntelligence } = useAIStore();

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner - Frosted Glass Cockpit */}
      <div className="relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-6 transition-all duration-300">
        {/* Subtle background ambient glow matching dashboard */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#20c997]/10 dark:bg-[#20c997]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-100 dark:border-transparent transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-[#20c997]" strokeWidth={1.8} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-transparent text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Predictive & Prescriptive AI Engine</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                AI Financial Intelligence
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                Moliya, savdo va qarzdorlik ma'lumotlaridan kelajakdagi pul oqimini prognoz qilish, xarajat anomaliyalarini aniqlash va kassa uzilishining oldini olish markazi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 dark:border-transparent self-start lg:self-auto shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-extrabold text-lg shadow-sm">
                {healthScore.overallScore}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#20c997] border-2 border-white dark:border-slate-900 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Moliyaviy Salomatlik</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{healthScore.status}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">• {healthScore.detectedRisks.length} ta xavf</span>
                </div>
              </div>
            </div>

            <div className="h-7 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

            <button
              onClick={refreshIntelligence}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/15 transition-all duration-150 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isAnalyzing && "animate-spin text-[#20c997]")} strokeWidth={2} />
              {isAnalyzing ? "Tahlil..." : "Qayta tahlil"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Glassy Segmented Bar) */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
        <nav className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href || location.pathname.startsWith(tab.href + '/');
            const Icon = tab.icon;
            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={cn(
                  'whitespace-nowrap py-2.5 px-4 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 flex items-center gap-2 flex-shrink-0',
                  isActive
                    ? 'bg-white dark:bg-white/10 text-[#20c997] shadow-sm border border-slate-200 dark:border-transparent'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5 border border-transparent'
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-[#20c997]" : "text-slate-400 dark:text-slate-500")} strokeWidth={1.8} />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Active Page View */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
