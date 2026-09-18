import { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Check,
  Send
} from 'lucide-react';
import { useAIStore } from '../../store/useAIStore';
import { useTelegramStore } from '../../store/useTelegramStore';
import {
  formatAnomalyTelegramMessage,
  formatDailyDigestTelegramMessage
} from '../../utils/telegramService';
import { toast } from 'sonner';

export default function AnomalyRadar() {
  const { anomalies, resolveAnomaly } = useAIStore();
  const { openAlertModal } = useTelegramStore();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filtered = anomalies.filter(a => {
    if (selectedSeverity === 'all') return true;
    return a.severity === selectedSeverity;
  });

  const handleResolve = (id: string | number, title: string) => {
    resolveAnomaly(id);
    toast.success(`"${title}" tekshirildi va tasdiqlandi.`);
  };

  return (
    <div className="space-y-6">
      {/* Methodological / Technical Complexity Explanation Banner */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Statistik Anomaliya Algoritmi
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Dynamic Z-Score & IQR Baseline</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              AI model har bir xarajat toifasining oxirgi 90 kunlik o'rtacha qiymatini (Mean $\mu$) va standart og'ishini ($\sigma$) hisoblab boradi. Belgilangan me'yordan $2.5\sigma$ yuqori bo'lgan tranzaksiyalar darhol shubhali spayk sifatida xavf radariga olinadi.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-transparent text-xs font-semibold text-emerald-700 dark:text-emerald-400 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#20c997] animate-ping" />
          Real-vaqt monitoringi faol
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-transparent p-1 rounded-xl overflow-x-auto custom-scrollbar">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'critical', label: 'Kritik (+200%)' },
            { id: 'warning', label: 'Ogohlantirish' },
            { id: 'notice', label: 'Eslatma' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedSeverity(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSeverity === f.id
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/80 dark:border-transparent'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openAlertModal({
              title: "Kunlik Moliyaviy Dayjest (Executive)",
              htmlText: formatDailyDigestTelegramMessage(72, "O'rtacha", anomalies.length, "31,850,000"),
              type: 'digest'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#0088cc] dark:text-[#229ED9] border border-[#229ED9]/30 text-xs font-semibold transition-all active:scale-95"
            title="Rahbarga kunlik xulosani Telegram orqali yuborish"
          >
            <Send className="w-3.5 h-3.5" />
            Kunlik Dayjest
          </button>
          <span className="text-xs font-bold text-slate-500">
            Aniqlangan: <span className="text-rose-600 font-extrabold">{anomalies.length} ta</span>
          </span>
        </div>
      </div>

      {/* Anomaly Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(anom => (
          <div
            key={anom.id}
            className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-5 space-y-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                    anom.severity === 'critical' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                    anom.severity === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    <ShieldAlert className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {anom.description}
                    </h4>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{anom.date} • {anom.category}</span>
                  </div>
                </div>

                <div className={`flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border ${
                  anom.severity === 'critical' ? 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-transparent' :
                  anom.severity === 'warning' ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-transparent' :
                  'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-transparent'
                }`}>
                  +{anom.spikePercentage}% Spayk
                </div>
              </div>

              {/* Amount Comparison Details */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/80 dark:bg-white/5 p-3.5 rounded-xl border border-slate-100 dark:border-transparent">
                <div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">To'langan summa:</p>
                  <p className="text-base font-extrabold text-rose-600 dark:text-rose-400">
                    {anom.amount.toLocaleString()} UZS
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Odatdagi o'rtacha:</p>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                    {anom.historicalAverage.toLocaleString()} UZS
                  </p>
                </div>
              </div>

              {/* AI Explanation & Recommendation */}
              <div className="space-y-1.5 text-xs">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Tahlil:</span> {anom.explanation}
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-100 dark:border-transparent text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold">AI Tavsiyasi:</span> {anom.recommendation}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={() => openAlertModal({
                  title: `Anomaliya Xabarnomasi: ${anom.description}`,
                  htmlText: formatAnomalyTelegramMessage(
                    anom.description,
                    anom.category,
                    anom.amount,
                    anom.historicalAverage,
                    anom.spikePercentage
                  ),
                  type: 'anomaly',
                  actionLabel: "Tekshirildi deb belgilash",
                  onAction: () => handleResolve(anom.id, anom.description)
                })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-transparent hover:border-sky-300 hover:shadow-sm dark:hover:bg-sky-500/20 text-xs font-semibold text-sky-700 dark:text-sky-300 transition-all duration-150 active:scale-95"
                title="Ushbu anomaliya haqida rahbarga Telegram alert yuborish"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" strokeWidth={2} />
                Telegram Alert
              </button>

              <button
                onClick={() => handleResolve(anom.id, anom.description)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all duration-150 active:scale-95"
              >
                <Check className="w-3.5 h-3.5 mr-0.5 text-emerald-600" strokeWidth={2} />
                Tekshirildi deb belgilash
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm p-12 text-center rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" strokeWidth={1.8} />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Barcha xarajatlar me'yorda!</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Hozircha tanlangan toifada statistik chegaradan chiqqan yangi xarajat anomaliyalari aniqlanmadi.
          </p>
        </div>
      )}
    </div>
  );
}
