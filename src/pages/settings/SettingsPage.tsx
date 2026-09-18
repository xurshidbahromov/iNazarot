import { useState, useEffect } from 'react';
import {
  Globe, Shield, Wallet, Bell, Smartphone, Box, Package, Save,
  Building, Mail, Phone, MapPin, Settings, Send, Bot, Eye, EyeOff,
  Sparkles, CheckCircle2, AlertTriangle, RefreshCw
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTelegramStore } from '../../store/useTelegramStore';
import { formatDailyDigestTelegramMessage } from '../../utils/telegramService';
import { toast } from 'sonner';

const categories = [
  { id:'general', name:'Umumiy', icon: Globe, description:"Tashkilot ma'lumotlari, valyuta"},
  { id:'payment', name:"To'lov usuli", icon: Wallet, description:'Kassa va terminal sozlamalari'},
  { id:'check', name:'Chek sozlamalari', icon: Box, description:"Chek ko'rinishi va logotipi"},
  { id:'device', name:'Qurilmalar', icon: Smartphone, description:'Faol qurilmalar va ruxsatlar'},
  { id:'sales', name:'Savdo', icon: Package, description:'Keshbek, soliq va chegirmalar'},
  { id:'notifications', name:'Xabarnomalar', icon: Bell, description:'Telegram bot va AI ogohlantirishlari'},
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const { settings, updateSettings, openAlertModal, sendAlertToTelegram, isSending } = useTelegramStore();
  
  const [botToken, setBotToken] = useState(settings.botToken);
  const [chatId, setChatId] = useState(settings.chatId);
  const [isEnabled, setIsEnabled] = useState(settings.isEnabled);
  const [alertOnCashGap, setAlertOnCashGap] = useState(settings.alertOnCashGap);
  const [alertOnAnomaly, setAlertOnAnomaly] = useState(settings.alertOnAnomaly);
  const [alertOnDailyDigest, setAlertOnDailyDigest] = useState(settings.alertOnDailyDigest);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    setBotToken(settings.botToken);
    setChatId(settings.chatId);
    setIsEnabled(settings.isEnabled);
    setAlertOnCashGap(settings.alertOnCashGap);
    setAlertOnAnomaly(settings.alertOnAnomaly);
    setAlertOnDailyDigest(settings.alertOnDailyDigest);
  }, [settings]);

  const handleSaveTelegram = () => {
    updateSettings({
      botToken,
      chatId,
      isEnabled,
      alertOnCashGap,
      alertOnAnomaly,
      alertOnDailyDigest,
    });
  };

  const handleFillDemo = () => {
    const demoToken = '7123456789:AAFDemoToken_INazoratAIBot_Demo';
    const demoChatId = '123456789';
    setBotToken(demoToken);
    setChatId(demoChatId);
    updateSettings({
      botToken: demoToken,
      chatId: demoChatId,
    });
  };

  const handleTestSend = async () => {
    if (!botToken || !chatId) {
      toast.info("Smartfon simulyatorida ko'rsatilmoqda. Jonli Telegram API uchun haqiqiy token kiriting.");
      openAlertModal({
        title: "Kunlik Moliyaviy Dayjest (Executive)",
        htmlText: formatDailyDigestTelegramMessage(),
        type: 'digest'
      });
      return;
    }
    await sendAlertToTelegram(formatDailyDigestTelegramMessage());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#20c997]" />
            Tizim sozlamalari
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Tizimning barcha asosiy parametrlarini va tashkilot ma'lumotlarini boshqarish.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-1.5">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn('w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] text-left transition-all border duration-200',
                  isActive 
                    ?'bg-white dark:bg-white/[0.08] border-slate-250 dark:border-white/10 text-primary-600 dark:text-primary-400 shadow-sm' 
                    :'bg-transparent border-transparent hover:bg-white dark:hover:bg-white/[0.08] hover:border-slate-200 dark:hover:border-transparent text-slate-600 dark:text-slate-400'
                )}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                  isActive ?'bg-primary-50 dark:bg-primary-950/30 text-primary-600' :'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-450'
                )}>
                  <Icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <p className={cn('text-[14px] font-bold', isActive ?'text-primary-750 dark:text-primary-400' :'text-slate-700 dark:text-slate-300')}>
                    {category.name}
                  </p>
                  <p className="text-[12px] text-slate-450 dark:text-slate-400 font-medium mt-0.5 line-clamp-1">{category.description}</p>
                </div>
              </button>
            );})}
        </div>
 
        {/* Content Area */}
        <div className="flex-1 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/60 dark:border-white/5 rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          {activeTab ==='general' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-transparent pb-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Umumiy sozlamalar</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kompaniya profilini tahrirlash</p>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Building className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Kompaniya nomi
                  </label>
                  <input type="text" defaultValue="iNazorat LLC" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Globe className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Asosiy valyuta
                  </label>
                  <select className="w-full h-11 px-4 bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm">
                    <option value="UZS">O'zbek so'mi (UZS)</option>
                    <option value="USD">AQSh dollari (USD)</option>
                    <option value="EUR">Yevro (EUR)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Phone className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Telefon raqam
                  </label>
                  <input type="text" defaultValue="+998 90 123 45 67" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Mail className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Elektron pochta
                  </label>
                  <input type="email" defaultValue="info@inazorat.uz" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Manzil
                  </label>
                  <input type="text" defaultValue="Toshkent sh., Chilonzor tumani, 1-mavze" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
              </div>
 
              <div className="pt-4 flex justify-end">
                <button className="flex items-center gap-2 h-10 px-5 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all text-white text-sm font-semibold rounded-xl">
                  <Save className="w-4 h-4" strokeWidth={2} />
                  Saqlash
                </button>
              </div>
            </div>
          )}
 
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Telegram AI Executive Bot</h4>
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                      botToken && chatId
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-transparent"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-transparent"
                    )}>
                      {botToken && chatId ? "● Ulangan" : "○ Sozlanmagan (Demo)"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Kassa uzilishi xavflari va anomal xarajatlarni to'g'ridan-to'g'ri rahbar smartfoniga uzatish.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    Demo Botni To'ldirish
                  </button>

                  <button
                    type="button"
                    onClick={() => openAlertModal({
                      title: "Telegram Smartfon Simulyatori",
                      htmlText: formatDailyDigestTelegramMessage(),
                      type: 'digest'
                    })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#0088cc] dark:text-[#229ED9] border border-[#229ED9]/30 text-xs font-semibold transition-all active:scale-95"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Smartfonda ko'rish
                  </button>
                </div>
              </div>

              {/* Bot Credentials Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Bot Token */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#229ED9]" strokeWidth={1.8} />
                      Telegram Bot Token
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs flex items-center gap-1"
                    >
                      {showToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showToken ? "Yashirish" : "Ko'rsatish"}
                    </button>
                  </label>
                  <input
                    type={showToken ? "text" : "password"}
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    placeholder="7123456789:AAFxxx_your_bot_token"
                    className="w-full h-11 px-4 font-mono bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm"
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Telegramda <b>@BotFather</b> orqali olingan bot tokeni.
                  </p>
                </div>

                {/* Chat ID */}
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#229ED9]" strokeWidth={1.8} />
                    Telegram Chat ID / Guruh ID
                  </label>
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="Masalan: 123456789 yoki -10012345678"
                    className="w-full h-11 px-4 font-mono bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm"
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    O'z ID raqamingizni <b>@userinfobot</b> orqali olishingiz mumkin.
                  </p>
                </div>
              </div>

              {/* Notification Triggers */}
              <div className="space-y-3 pt-2">
                <h5 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Avtomatik AI Ogohlantirish Turlari
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Trigger 1: Cash Gap */}
                  <div
                    onClick={() => setAlertOnCashGap(!alertOnCashGap)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3",
                      alertOnCashGap
                        ? "bg-rose-50/40 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30"
                        : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-transparent opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center text-white text-xs",
                        alertOnCashGap ? "bg-rose-600" : "bg-slate-300 dark:bg-slate-700"
                      )}>
                        {alertOnCashGap ? "✓" : ""}
                      </div>
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-900 dark:text-slate-100">Kassa Uzilishi Xavfi</h6>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        30 kunlik prognozda defitsit paydo bo'lganda 3-7 kun avval ogohlantiradi.
                      </p>
                    </div>
                  </div>

                  {/* Trigger 2: Anomalies */}
                  <div
                    onClick={() => setAlertOnAnomaly(!alertOnAnomaly)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3",
                      alertOnAnomaly
                        ? "bg-amber-50/40 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
                        : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-transparent opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center text-white text-xs",
                        alertOnAnomaly ? "bg-amber-600" : "bg-slate-300 dark:bg-slate-700"
                      )}>
                        {alertOnAnomaly ? "✓" : ""}
                      </div>
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-900 dark:text-slate-100">Xarajat Anomaliyalari</h6>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        Statistik chegaradan chiqqan logistika va to'lov spayklari (Z-Score &gt; 2.5σ).
                      </p>
                    </div>
                  </div>

                  {/* Trigger 3: Daily Digest */}
                  <div
                    onClick={() => setAlertOnDailyDigest(!alertOnDailyDigest)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3",
                      alertOnDailyDigest
                        ? "bg-emerald-50/40 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                        : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-transparent opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center text-white text-xs",
                        alertOnDailyDigest ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
                      )}>
                        {alertOnDailyDigest ? "✓" : ""}
                      </div>
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-900 dark:text-slate-100">Kunlik Moliyaviy Dayjest</h6>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        Kompaniyaning moliyaviy salomatlik indeksi va kassa umumiy balansi qisqacha xulosasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleTestSend}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                  {isSending ? "Yuborilmoqda..." : "Test Xabar Yuborish"}
                </button>

                <button
                  type="button"
                  onClick={handleSaveTelegram}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-6 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all text-white text-xs font-bold rounded-xl active:scale-95"
                >
                  <Save className="w-4 h-4" strokeWidth={2} />
                  Sozlamalarni Saqlash
                </button>
              </div>
            </div>
          )}

          {activeTab !=='general' && activeTab !== 'notifications' && (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400">
              <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-[20px] flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-transparent">
                <Shield className="w-8 h-8 text-slate-350" strokeWidth={1.6} />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Tez kunda</h4>
              <p className="text-sm mt-1.5 font-medium text-slate-500 dark:text-slate-400">Bu bo'lim ustida ishlanmoqda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );}
