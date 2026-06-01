import { useState } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package,
  Activity, ArrowRight, LayoutDashboard, Download, Sparkles, Brain,
  CheckCircle2, AlertTriangle, Info, RefreshCw, ChevronRight, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar } from 'recharts';
import { useFinanceStore } from '../store/useFinanceStore';
import { useCRMStore } from '../store/useCRMStore';
import { useWarehouseStore } from '../store/useWarehouseStore';
import { useHRStore } from '../store/useHRStore';
import { useActivityStore } from '../store/useActivityStore';
import { exportToCSV } from '../utils/posUtils';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { uz } from 'date-fns/locale/uz';
import { generateAIRecommendations, type BusinessGoal } from '../utils/aiUtils';

export default function Dashboard() {
  const { getBalance, transactions } = useFinanceStore();
  const { clients, orders } = useCRMStore();
  const { products } = useWarehouseStore();
  const { employees } = useHRStore();
  const { logs } = useActivityStore();

  const [selectedGoal, setSelectedGoal] = useState<BusinessGoal>('general');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const handleRefreshAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 800);
  };

  const aiRecommendations = generateAIRecommendations(products, transactions, clients, orders || [], selectedGoal);

  const balance = getBalance();
  const totalStock = products.reduce((a, p) => a + p.stock, 0);
  const lowStock = products.filter(p => p.stock < 100).length;
  const activeEmployees = employees.filter(e => e.status ==='Faol').length;

  // Real KPI calculations
  const activeClients = clients.filter(c => c.status === 'Faol').length;
  const inactiveClients = clients.filter(c => c.status !== 'Faol').length;
  const clientChangeType = activeClients >= inactiveClients ? 'positive' : 'negative';
  const clientChangeText = activeClients > 0
    ? `${Math.round((activeClients / Math.max(clients.length, 1)) * 100)}% faol`
    : "Mijoz yo'q";

  const incomeTotal = transactions.filter(t => t.type === 'Kirim').reduce((a, t) => a + t.amount * t.rate, 0);
  const expenseTotal = transactions.filter(t => t.type === 'Chiqim').reduce((a, t) => a + t.amount * t.rate, 0);
  const profitRate = incomeTotal > 0 ? Math.round(((incomeTotal - expenseTotal) / incomeTotal) * 100) : 0;
  const balanceChangeType = balance >= 0 ? 'positive' : 'negative';
  const balanceChangeText = `${profitRate >= 0 ? '+' : ''}${profitRate}% rentabellik`;

  const posTransactions = transactions.filter(t => t.description.includes('POS'));
  const trxChangeType = posTransactions.length > 0 ? 'positive' : 'neutral';
  const trxChangeText = `${posTransactions.length} ta POS savdo`;

  // Build real weekly chart data from actual transactions
  const dayNames = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Juma', 'Shan'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const salesData = last7Days.map(d => {
    const dayStrDot = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    const dayStrSlash = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    const dayTrx = transactions.filter(t => t.date.startsWith(dayStrDot) || t.date.startsWith(dayStrSlash));
    return {
      name: dayNames[d.getDay()],
      tushum: dayTrx.filter(t => t.type === 'Kirim').reduce((a, t) => a + t.amount * t.rate, 0),
      xarajat: dayTrx.filter(t => t.type === 'Chiqim').reduce((a, t) => a + t.amount * t.rate, 0),
    };
  });

  // Categories from real products
  const categoryMap: Record<string, number> = {};
  products.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + p.stock;
  });
  const categoryData = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, qiymat]) => ({ name: name.length > 12 ? name.slice(0, 12) + '…' : name, qiymat }));

  const handleExportTransactions = () => {
    exportToCSV(
      transactions.map(t => ({
        'Sana': t.date,
        'Tur': t.type,
        'Summa': t.amount,
        'Valyuta': t.currency,
        'Kurs': t.rate,
        "Jami (UZS)": t.amount * t.rate,
        'Izoh': t.description,
        "To'lov usuli": t.method,
      })),
      'tranzaksiyalar'
    );
  };

  const stats = [
    {
      name:'Kassa Balansi',
      value:`${balance.toLocaleString()} UZS`,
      icon: DollarSign,
      change: balanceChangeText,
      changeType: balanceChangeType,
      href:'/finance',
      bg:'bg-blue-50 dark:bg-blue-500/10',
      iconColor:'text-blue-600 dark:text-blue-400',},
    {
      name:'Faol Mijozlar',
      value: activeClients.toString(),
      icon: Users,
      change: clientChangeText,
      changeType: clientChangeType,
      href:'/crm',
      bg:'bg-violet-50 dark:bg-violet-500/10',
      iconColor:'text-violet-600 dark:text-violet-400',},
    {
      name:'Jami Tranzaksiyalar',
      value: transactions.length.toString(),
      icon: ShoppingCart,
      change: trxChangeText,
      changeType: trxChangeType === 'positive' ? 'positive' : 'negative',
      href:'/finance',
      bg:'bg-amber-50 dark:bg-amber-500/10',
      iconColor:'text-amber-600 dark:text-amber-400',},
    {
      name:"Ombor Qoldig'i",
      value:`${totalStock.toLocaleString()} dona`,
      icon: Package,
      change:`${lowStock} ta kam`,
      changeType: lowStock > 0 ?'negative' :'positive',
      href:'/warehouse',
      bg:'bg-emerald-50 dark:bg-emerald-500/10',
      iconColor:'text-emerald-600 dark:text-emerald-400',},
  ];

  const recentTransactions = transactions.slice(0, 5);
  const recentActivities = logs.slice(0, 5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return <ShoppingCart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'income': return <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'expense': return <DollarSign className="w-4 h-4 text-rose-600" />;
      case 'product': return <Package className="w-4 h-4 text-indigo-600" />;
      case 'client': return <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default: return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-transparent';
      case 'income': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-transparent';
      case 'expense': return 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-transparent';
      case 'product': return 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-transparent';
      case 'client': return 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-transparent';
      default: return 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-transparent';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#20c997]" />
            Asosiy sahifa
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {new Intl.DateTimeFormat('uz-UZ', { weekday:'long', year:'numeric', month:'long', day:'numeric'}).format(new Date())}
          </p>
        </div>
        <button
          onClick={handleExportTransactions}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
        >
          <Download className="w-4 h-4" strokeWidth={2} />
          CSV Eksport
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 flex items-center justify-center ${stat.bg} rounded-xl transition-all duration-300 group-hover:scale-105`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} strokeWidth={1.6} />
                </div>
                <div className={`flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border ${stat.changeType ==='positive' ?'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-transparent' :'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-transparent'}`}>
                  {stat.changeType ==='positive'
                    ? <TrendingUp className="h-3 w-3 mr-1" strokeWidth={2} />
                    : <TrendingDown className="h-3 w-3 mr-1" strokeWidth={2} />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">{stat.value}</p>
                <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🧠 iNazorat Intelligence */}
      <div className={`relative overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-[20px] border transition-all duration-500 ${isAIOpen ? 'border-slate-200 dark:border-transparent shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]' : 'border-white/80 dark:border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer group'}`}>
        
        {/* Toggle / Header Area */}
        <div 
          onClick={() => !isAIOpen && setIsAIOpen(true)}
          className={`relative z-10 flex items-center justify-between ${isAIOpen ? 'p-6 border-b border-slate-100/80' : 'p-5'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`relative flex items-center justify-center transition-transform duration-500 ${isAIOpen ? 'scale-110' : 'group-hover:scale-110'}`}>
              <div className="absolute inset-0 bg-[#20c997] rounded-full blur-[20px] opacity-25 pointer-events-none" />
              <Brain className={`relative z-10 text-[#20c997] transition-all duration-500 ${isAIOpen ? 'w-8 h-8' : 'w-6 h-6'}`} strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-all ${isAIOpen ? 'text-lg' : 'text-base'}`}>
                  iNazorat Intelligence
                </h3>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-100 dark:border-transparent">
                  <Sparkles className="w-2.5 h-2.5" /> PRO
                </span>
              </div>
              {!isAIOpen && (
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Biznesingiz uchun <span className="text-slate-800 dark:text-[#20c997] font-bold">{aiRecommendations.length} ta</span> strategik tavsiya
                </p>
              )}
              {isAIOpen && (
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">Tizim ma'lumotlari asosida shakllantirilgan analitika</p>
              )}
            </div>
          </div>
          
          {/* Controls (Only visible when Open) */}
          {isAIOpen ? (
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-1 bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-transparent p-1 rounded-[20px]">
                 {[
                   { id: 'general', label: 'Umumiy' },
                   { id: 'growth', label: 'Kengayish' },
                   { id: 'efficiency', label: 'Samaradorlik' },
                   { id: 'debt_reduction', label: 'Nasiyalar' }
                 ].map(g => (
                   <button
                     key={g.id}
                     onClick={(e) => { e.stopPropagation(); setSelectedGoal(g.id as BusinessGoal); }}
                     className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-300 ${selectedGoal === g.id ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-transparent' : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 hover:bg-slate-100/50 dark:hover:bg-white/5 border border-transparent'}`}
                   >
                     {g.label}
                   </button>
                 ))}
               </div>
               <div className="h-8 w-px bg-slate-200/60 mx-1" />
               <button
                 onClick={(e) => { e.stopPropagation(); handleRefreshAnalysis(); }}
                 disabled={isAnalyzing}
                 className="p-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-100 hover:border-slate-300 shadow-sm hover:shadow dark:hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50"
                 title="Qayta tahlil"
               >
                 <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin text-slate-400 dark:text-slate-500' : ''}`} strokeWidth={2} />
               </button>
               <button
                 onClick={(e) => { e.stopPropagation(); setIsAIOpen(false); }}
                 className="p-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-slate-400 dark:text-slate-200 hover:text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all"
                 title="Yopish"
               >
                 <X className="w-4 h-4" strokeWidth={2.5} />
               </button>
             </div>
          ) : (
            <div className="flex items-center gap-3 pr-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 border-2 border-white dark:border-transparent flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 border-2 border-white dark:border-transparent flex items-center justify-center shadow-sm">
                  <Activity className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 shadow-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-transparent transition-all group-hover:bg-slate-900 dark:group-hover:bg-white/10 group-hover:text-white group-hover:border-slate-800">
                Ochish <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        <div className={`relative z-10 grid transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isAIOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="p-6 bg-slate-50/30 dark:bg-transparent">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white/50 backdrop-blur-sm rounded-[20px] border border-slate-100 shadow-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-200 rounded-full animate-ping opacity-20" />
                  <div className="w-14 h-14 bg-slate-900 rounded-[20px] flex items-center justify-center shadow-xl shadow-slate-900/10 mb-4 animate-pulse">
                    <Brain className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Ma'lumotlar qayta ishlanmoqda</h4>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Iltimos, kutib turing...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {aiRecommendations.map((rec, idx) => {
                  const theme = {
                    success: { border: 'border-l-emerald-500', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-transparent' },
                    warning: { border: 'border-l-amber-500', icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, badge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-transparent' },
                    info: { border: 'border-l-blue-500', icon: <Info className="w-5 h-5 text-blue-500" />, badge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-100/50 dark:border-transparent' }
                  }[rec.severity];

                  return (
                    <div 
                      key={rec.id} 
                      className="group flex flex-col bg-white dark:bg-white/5 rounded-[20px] border border-slate-200 dark:border-transparent shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] overflow-hidden"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {/* Left border accent */}
                      <div className="flex flex-col h-full relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.border}`} />
                        
                        <div className="p-5 pl-6 flex-1">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-50 dark:bg-white/5 rounded-xl">
                                {theme.icon}
                              </div>
                              <h4 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">{rec.title}</h4>
                            </div>
                          </div>
                          <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium pl-11">{rec.description}</p>
                        </div>
                        
                        <div className="px-5 py-3.5 pl-6 border-t border-slate-100 dark:border-transparent bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${theme.badge}`}>
                            {rec.severity === 'success' ? 'Yaxshi' : rec.severity === 'warning' ? 'Diqqat' : 'Ma\'lumot'}
                          </span>
                          <Link
                            to={rec.actionLink}
                            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white dark:text-slate-100 transition-all duration-300"
                          >
                            {rec.actionText} <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {aiRecommendations.length === 0 && (
                  <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm rounded-[20px] border border-slate-100 border-dashed">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 mb-1">Hammasi joyida!</h4>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium max-w-md">
                      Ushbu yo'nalish bo'yicha tizimda hech qanday xavf yoki muammo aniqlanmadi. Barchasi me'yorda ishlamoqda.
                    </p>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-5 transition-all hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">Moliyaviy dinamika</h3>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">Haftalik tushum va xarajatlar</p>
            </div>
            <div className="flex items-center gap-4 text-[12px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500/100"></div>Tushum</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>Xarajat</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 15}}>
                <defs>
                  <linearGradient id="colorTushum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorXarajat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill:'#94a3b8', fontSize: 12, fontWeight: 500}} 
                  dx={-10}
                  tickFormatter={(value) =>`${value / 1000000}M`}
                />
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <Tooltip 
                  wrapperStyle={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                  cursor={{stroke:'#cbd5e1', strokeWidth: 1, strokeDasharray:'4 4'}}
                  content={({ active, payload, label}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="backdrop-blur-md bg-white/75 border border-white/60 p-3.5 rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex flex-col gap-2 min-w-[160px] transition-all select-none">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                          <div className="space-y-1.5">
                            {payload.map((entry: any, index: number) => (
                              <div key={index} className="flex items-center justify-between gap-4 py-0.5">
                                <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color}} />
                                  {entry.name}
                                </span>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                  {Number(entry.value).toLocaleString()} UZS
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );}
                    return null;}}
                />
                <Area 
                  type="monotone" 
                  name="Tushum" 
                  dataKey="tushum" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorTushum)" 
                  activeDot={{r: 5, strokeWidth: 0, fill:'#10b981'}}
                />
                <Area 
                  type="monotone" 
                  name="Xarajat" 
                  dataKey="xarajat" 
                  stroke="#f43f5e" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorXarajat)" 
                  activeDot={{r: 5, strokeWidth: 0, fill:'#f43f5e'}}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] p-5 transition-all hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">Ommabop kategoriyalar</h3>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">Sotuv hajmi bo'yicha mahsulotlar</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 15}}>
                <defs>
                  <linearGradient id="colorQiymat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.85}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.85}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize: 12, fontWeight: 500}} dx={-10} />
                <Tooltip 
                  wrapperStyle={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                  cursor={{fill:'rgba(16, 185, 129, 0.03)'}}
                  content={({ active, payload, label}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="backdrop-blur-md bg-white/75 border border-white/60 p-3.5 rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex flex-col gap-2 min-w-[160px] transition-all select-none">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-4 py-0.5">
                              <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-emerald-50 dark:bg-emerald-500/100" />
                                Sotuvlar
                              </span>
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                {Number(payload[0].value).toLocaleString()} dona
                              </span>
                            </div>
                          </div>
                        </div>
                      );}
                    return null;}}
                />
                <Bar name="Sotuv hajmi" dataKey="qiymat" fill="url(#colorQiymat)" radius={[5, 5, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-transparent flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
              </div>
              <h3 className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">So'nggi tranzaksiyalar</h3>
            </div>
            <Link 
              to="/finance" 
              className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              Barchasi <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentTransactions.map((trx) => (
              <div key={trx.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${trx.type ==='Kirim' ?'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-transparent text-emerald-600 dark:text-emerald-400' :'bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-transparent text-rose-600 dark:text-rose-400'}`}>
                    <DollarSign className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-900 dark:text-slate-100 mb-0.5">{trx.description}</p>
                    <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{trx.date} • <span className="text-slate-400 dark:text-slate-500">{trx.method}</span></p>
                  </div>
                </div>
                <span className={`text-[14px] font-semibold ${trx.type ==='Kirim' ?'text-emerald-600 dark:text-emerald-400' :'text-slate-700 dark:text-slate-300'}`}>
                  {trx.type ==='Kirim' ?'+' :'-'}{trx.amount.toLocaleString()} UZS
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-transparent flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-500" strokeWidth={2} />
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Kam qoldiqlar</h3>
              </div>
              <Link to="/warehouse" className="text-[12px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">Ko'rish</Link>
            </div>
            <div className="p-2">
              {products.filter(p => p.stock < 100).map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl transition-colors">
                  <div>
                    <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100">{p.name}</p>
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mt-0.5">{p.category}</p>
                  </div>
                  <span className="text-[12px] bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold px-2.5 py-1 rounded-full border border-amber-200/60">
                    {p.stock} {p.unit}
                  </span>
                </div>
              ))}
              {products.filter(p => p.stock < 100).length === 0 && (
                <div className="p-6 text-center">
                  <Package className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500">Barcha mahsulotlar yetarli</p>
                </div>
              )}
            </div>
          </div>

          {/* HR Summary */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-transparent flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" strokeWidth={2} />
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Xodimlar holati</h3>
              </div>
              <Link to="/hr" className="text-[12px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">Ko'rish</Link>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Jami xodimlar</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 rounded-lg text-[13px]">{employees.length} ta</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Faol xodimlar</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-transparent px-2.5 py-0.5 rounded-lg text-[13px]">{activeEmployees} ta</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Ta'tilda</span>
                <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-transparent px-2.5 py-0.5 rounded-lg text-[13px]">
                  {employees.filter(e => e.status ==="Ta'tilda").length} ta
                </span>
              </div>
            </div>
          </div>
          
          {/* Activity Log */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-transparent flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" strokeWidth={2} />
                <h3 className="font-bold text-slate-900 dark:text-slate-100">So'nggi faoliyat</h3>
              </div>
            </div>
            <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
              {recentActivities.map((log) => (
                <div key={log.id} className="flex gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${getActivityColor(log.type)}`}>
                    {getActivityIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-tight">{log.title}</p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{log.description}</p>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-400 mt-1">
                      {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: uz })}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivities.length === 0 && (
                <div className="p-6 text-center text-slate-400 dark:text-slate-500">
                  Faoliyat tarixi bo'sh
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );}
