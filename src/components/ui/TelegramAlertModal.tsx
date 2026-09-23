import { useState, useEffect } from 'react';
import {
  X,
  Send,
  Smartphone,
  Settings,
  Zap,
  Sparkles,
  ExternalLink,
  Wifi,
  Battery,
  Bot,
  Copy,
  Info
} from 'lucide-react';
import { useTelegramStore } from '../../store/useTelegramStore';
import { useAIStore } from '../../store/useAIStore';
import { toast } from 'sonner';

export function TelegramAlertModal() {
  const {
    isModalOpen,
    closeAlertModal,
    modalData,
    settings,
    updateSettings,
    sendAlertToTelegram,
    autoDetectChatId,
    isSending
  } = useTelegramStore();

  const { resolveAnomaly } = useAIStore();
  const [activeTab, setActiveTab] = useState<'phone' | 'config'>('phone');
  const [botToken, setBotToken] = useState(settings.botToken);
  const [chatId, setChatId] = useState(settings.chatId);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setBotToken(settings.botToken);
    setChatId(settings.chatId);
  }, [settings]);

  const handleAutoDetect = async () => {
    const id = await autoDetectChatId();
    if (id) {
      setChatId(id);
    }
  };

  if (!isModalOpen) return null;

  const handleSaveConfig = () => {
    updateSettings({ botToken, chatId });
    toast.success("Telegram sozlamalari yangilandi!");
  };

  const handleFillDemo = () => {
    const demoToken = '7123456789:AAFDemoToken_INazoratAIBot_Demo';
    const demoChatId = '123456789';
    setBotToken(demoToken);
    setChatId(demoChatId);
    updateSettings({ botToken: demoToken, chatId: demoChatId });
    toast.info("Demo ma'lumotlari kiritildi.");
  };

  const handleCopyText = () => {
    const cleanText = modalData.htmlText.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(cleanText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success("Xabar nusxalandi!");
  };

  const handleSimulateAction = () => {
    if (modalData.onAction) {
      modalData.onAction();
    } else {
      resolveAnomaly('1');
      toast.success("AI Qarori ijro etildi: Kassa uzilishi xavfi bartaraf qilindi!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f1624] rounded-[24px] border-2 border-[#f1f2f4] dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Send className="w-5 h-5 -rotate-12" strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Telegram AI Alert Markazi
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500 text-white">
                  Executive Bot
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kassa xavflari va anomaliyalarni rahbar smartfoniga tezkor yetkazish
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Pills */}
            <div className="flex items-center bg-slate-100 dark:bg-white/10 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('phone')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'phone'
                    ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Simulyator</span>
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'config'
                    ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>API Sozlama</span>
              </button>
            </div>

            <button
              onClick={closeAlertModal}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {activeTab === 'phone' ? (
            /* Tab 1: Smartphone UI Mockup */
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              
              {/* Phone Device Frame */}
              <div className="w-[310px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700/60 relative flex-shrink-0">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20" />

                {/* Inner Screen */}
                <div className="w-full bg-[#17212b] text-white rounded-[28px] overflow-hidden flex flex-col h-[480px] text-xs font-sans">
                  
                  {/* Status Bar */}
                  <div className="pt-2 px-5 flex items-center justify-between text-[10px] text-slate-300 font-medium">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Telegram Top App Bar */}
                  <div className="p-3 bg-[#242f3d] flex items-center justify-between border-b border-black/20 mt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#20c997] to-teal-500 flex items-center justify-center font-bold text-white shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-[12px] text-white leading-tight">iNazorat AI Bot</p>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-[10px] text-slate-400">bot • rasmiy moliyaviy yordamchi</p>
                      </div>
                    </div>
                  </div>

                  {/* Push Notification Banner Simulation */}
                  <div className="p-2.5">
                    <div className="bg-[#242f3d]/90 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 shadow-lg animate-pulse">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-sky-400 flex items-center gap-1">
                          <Send className="w-2.5 h-2.5" /> Telegram Push
                        </span>
                        <span>Hozirgina</span>
                      </div>
                      <p className="text-[11px] font-bold text-white line-clamp-1">
                        ⚠️ iNazorat AI — KASSA UZILISHI OGOHLANTIRISHI!
                      </p>
                      <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                        28-sentabr kuni kassada -4,200,000 UZS defitsit kutilmoqda.
                      </p>
                    </div>
                  </div>

                  {/* Chat Area & Message Bubble */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 custom-scrollbar">
                    <div className="flex flex-col items-center">
                      <span className="bg-black/30 text-[9px] text-slate-400 px-2 py-0.5 rounded-full">
                        Bugun
                      </span>
                    </div>

                    {/* Incoming Bot Message */}
                    <div className="bg-[#182533] p-3 rounded-2xl rounded-tl-none border border-white/5 space-y-2 shadow-sm">
                      <div
                        className="text-[11px] text-slate-200 leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: modalData.htmlText }}
                      />
                      
                      {/* Simulated Inline Keyboard Buttons */}
                      <div className="pt-2 space-y-1.5">
                        <button
                          onClick={handleSimulateAction}
                          className="w-full py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 transition-all text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Zap className="w-3 h-3 text-amber-300" />
                          <span>AI Rejasini Qo'llash (+10.3M)</span>
                        </button>
                        <button
                          onClick={closeAlertModal}
                          className="w-full py-1.5 px-2.5 bg-white/10 hover:bg-white/15 transition-all text-slate-300 font-semibold rounded-xl text-[10px] flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>iNazorat'da Ko'rish</span>
                        </button>
                      </div>

                      <div className="text-right text-[9px] text-slate-500">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • yetkazildi
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Demo Actions & Controls */}
              <div className="space-y-4 max-w-xs text-left">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <Sparkles className="w-4 h-4 text-[#20c997]" />
                    <span>Hakamlar va Demo Uchun:</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Ushbu smartfon simulyatori taqdimot paytida real Telegram xabarnomasi qanday ko'rinishini va rahbar 1 tugma orqali kassani qanday qutqarishini jonli ko'rsatadi.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => sendAlertToTelegram()}
                    disabled={isSending}
                    className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-sm hover:shadow transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSending ? "Yuborilmoqda..." : "Haqiqiy Telegramga Yuborish"}</span>
                  </button>

                  <button
                    onClick={handleCopyText}
                    className="w-full py-2 px-4 bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent hover:border-slate-300 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isCopied ? "Nusxalandi!" : "Xabar matnini nusxalash"}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-start gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>Agar o'z botingizga haqiqiy xabar olmoqchi bo'lsangiz, "API Sozlama" tabiga o'ting.</span>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Bot API Configuration */
            <div className="space-y-5 text-left max-w-lg mx-auto">
              {/* Bot Info & Quick Connect */}
              <div className="p-4 rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/20 text-xs text-sky-900 dark:text-sky-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#229ED9]" />
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-slate-100">iNazorat AI Bot ulangan!</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">@inazorat_ai_test_bot</p>
                    </div>
                  </div>
                  <a
                    href="https://t.me/inazorat_ai_test_bot"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                  >
                    Botga o'tish ↗
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <a
                    href="https://t.me/inazorat_ai_test_bot"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent font-semibold text-xs text-slate-700 dark:text-slate-200 hover:border-slate-300 transition-all"
                  >
                    1. Botga kirib <b>/start</b> bosing
                  </a>
                  <button
                    type="button"
                    onClick={handleAutoDetect}
                    className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    2. Chat ID ni aniqlash
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Telegram Bot Token:
                  </label>
                  <input
                    type="text"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    placeholder="Masalan: 7123456789:AAFxxx...yyy"
                    className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#20c997]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Telegram Chat ID (Rahbar yoki Guruh ID):
                  </label>
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="Masalan: 2064830631"
                    className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#20c997]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleFillDemo}
                  className="text-xs font-bold text-[#20c997] hover:underline"
                >
                  Demo ma'lumotlarni to'ldirish
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveConfig}
                    className="px-4 py-2.5 bg-[#20c997] hover:bg-[#1bb386] text-white font-bold rounded-xl text-xs shadow-sm transition-all active:scale-95"
                  >
                    Saqlash & Ulash
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <span>iNazorat AI • WIUT Hackathon 2026 Executive Bot</span>
          <button
            onClick={closeAlertModal}
            className="px-4 py-2 rounded-xl bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 transition-all text-xs"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
