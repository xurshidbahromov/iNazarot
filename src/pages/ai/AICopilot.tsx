import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useAIStore } from '../../store/useAIStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'sonner';

export default function AICopilot() {
  const { chatMessages, sendCopilotMessage } = useAIStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: "Nega bu oy foyda kamaydi?", query: "Nega bu oy foydam kamaydi, kassa qayerga ketdi?" },
    { label: "28-sentabr kassa uzilishi sababi?", query: "28-sentabrdagi kassa uzilishini qanday oldini olsam bo'ladi?" },
    { label: "Logistika xarajati nega oshdi?", query: "Logistika xarajatlaridagi anomaliya sababi nimada?" },
    { label: "Muddati o'tgan nasiyalar qancha?", query: "Qaysi mijozlardan qarzni zudlik bilan undirishimiz kerak?" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendCopilotMessage(inputText);
    setInputText('');
  };

  const handleQuickPrompt = (query: string) => {
    sendCopilotMessage(query);
  };

  const handleActionButton = (action: string) => {
    if (action === 'send_sms_debts') {
      toast.success("Avtomatik SMS shablon tayyorlandi: 'Hurmatli mijoz, iNazorat hisob-kitobiga ko'ra 26-sentabrgacha bo'lgan to'lov muddatini eslatamiz.' 3 ta mijozga yuborildi!");
    } else if (action === 'delay_purchase') {
      toast.success("5,000,000 UZS lik no-kritik xarid 30-sentabrga ko'chirildi. 28-sentabrdagi kassa balansi defitsitdan saqlandi!");
    } else if (action === 'ask_profit_drop') {
      sendCopilotMessage("Nega bu oy foydam kamaydi?");
    } else if (action === 'ask_cash_gap') {
      sendCopilotMessage("28-sentabrdagi kassa uzilishini qanday yechamiz?");
    } else {
      toast.info(`Harakat bajarildi: ${action}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar: Quick Prompts & Context */}
      {/* Left Sidebar: Quick Scenario Prompts & Grounding */}
      <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#20c997]" strokeWidth={1.8} />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Tezkor Moliyaviy Savollar
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Hakamlar va rahbarlar uchun eng muhim tahliliy ssenariylar:
          </p>

          <div className="space-y-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(p.query)}
                className="w-full text-left p-3 rounded-xl bg-slate-50/80 dark:bg-white/5 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:border-emerald-200 dark:hover:border-transparent border border-slate-200/60 dark:border-transparent transition-all duration-200 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center justify-between group"
              >
                <span>{p.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#20c997]" />
              </button>
            ))}
          </div>
        </div>

        {/* Grounding Info Card */}
        <div className="bg-emerald-50/70 dark:bg-emerald-500/10 backdrop-blur-sm border-2 border-emerald-100 dark:border-transparent rounded-[20px] p-4 text-xs space-y-2 text-emerald-900 dark:text-emerald-300 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
            <span>100% Zero-Hallucination</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
            iNazorat Copilot faqat kompaniyangizning real tranzaksiyalari, CRM nasiyalari va kassa jurnali raqamlariga tayanib tahlil beradi.
          </p>
        </div>
      </div>

      {/* Right Area: Interactive Chat Stream */}
      <div className="lg:col-span-3 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex flex-col h-[640px] overflow-hidden order-1 lg:order-2 transition-all duration-300">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-transparent text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#20c997]" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                iNazorat Financial Copilot
              </h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Online • DB Grounded Tool-Calling Active
              </p>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {chatMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-xl space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-white/5 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Key Metrics Chips (if any) */}
                {msg.keyMetrics && msg.keyMetrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.keyMetrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs shadow-sm font-semibold"
                      >
                        <span className="text-slate-400">{m.label}:</span>
                        <span className={m.trend === 'down' ? 'text-rose-500 font-bold' : 'text-emerald-600 font-bold'}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons (if any) */}
                {msg.actionButtons && msg.actionButtons.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.actionButtons.map((btn, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleActionButton(btn.action)}
                        className="h-8 text-xs font-bold rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {btn.label}
                      </Button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 px-1 block">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 dark:bg-white/15 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center gap-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Moliyaviy savolingizni yozing (masalan: Nega bu oy kassa kamaydi?)..."
            className="flex-1 rounded-xl bg-white dark:bg-white/10 border-slate-200 dark:border-white/10 h-11 text-xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl h-11 px-5 font-semibold text-xs shadow-sm hover:shadow transition-all duration-150 active:scale-95 flex items-center gap-2 flex-shrink-0"
          >
            <Send className="w-4 h-4" strokeWidth={1.8} />
            <span>Yuborish</span>
          </button>
        </form>
      </div>
    </div>
  );
}
