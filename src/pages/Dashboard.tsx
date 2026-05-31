import {
  TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package,
  Activity, ArrowRight, LayoutDashboard, Download} from'lucide-react';
import { Link} from'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar} from'recharts';
import { useFinanceStore} from'../store/useFinanceStore';
import { useCRMStore} from'../store/useCRMStore';
import { useWarehouseStore} from'../store/useWarehouseStore';
import { useHRStore} from'../store/useHRStore';
import { exportToCSV } from'../utils/posUtils';

export default function Dashboard() {
  const { getBalance, transactions} = useFinanceStore();
  const { clients} = useCRMStore();
  const { products} = useWarehouseStore();
  const { employees} = useHRStore();

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
    const dayStr = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    const dayTrx = transactions.filter(t => t.date.startsWith(dayStr));
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
      bg:'bg-blue-50',
      iconColor:'text-blue-600',},
    {
      name:'Faol Mijozlar',
      value: activeClients.toString(),
      icon: Users,
      change: clientChangeText,
      changeType: clientChangeType,
      href:'/crm',
      bg:'bg-violet-50',
      iconColor:'text-violet-600',},
    {
      name:'Jami Tranzaksiyalar',
      value: transactions.length.toString(),
      icon: ShoppingCart,
      change: trxChangeText,
      changeType: trxChangeType === 'positive' ? 'positive' : 'negative',
      href:'/finance',
      bg:'bg-amber-50',
      iconColor:'text-amber-600',},
    {
      name:"Ombor Qoldig'i",
      value:`${totalStock.toLocaleString()} dona`,
      icon: Package,
      change:`${lowStock} ta kam`,
      changeType: lowStock > 0 ?'negative' :'positive',
      href:'/warehouse',
      bg:'bg-emerald-50',
      iconColor:'text-emerald-600',},
  ];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary-600" />
            Asosiy sahifa
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {new Intl.DateTimeFormat('uz-UZ', { weekday:'long', year:'numeric', month:'long', day:'numeric'}).format(new Date())}
          </p>
        </div>
        <button
          onClick={handleExportTransactions}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm transition-all duration-150 active:scale-95"
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
            className="group bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] hover:border-slate-200  :border-slate-700 transition-all duration-300"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 flex items-center justify-center ${stat.bg} rounded-xl transition-all duration-300 group-hover:scale-105`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} strokeWidth={1.6} />
                </div>
                <div className={`flex items-center text-[12px] font-semibold px-2 py-0.5 rounded-full border ${stat.changeType ==='positive' ?'text-emerald-700 bg-emerald-50 border-emerald-100' :'text-rose-700 bg-rose-50 border-rose-100'}`}>
                  {stat.changeType ==='positive'
                    ? <TrendingUp className="h-3 w-3 mr-1" strokeWidth={2} />
                    : <TrendingDown className="h-3 w-3 mr-1" strokeWidth={2} />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold text-slate-900 truncate">{stat.value}</p>
                <p className="mt-0.5 text-[13px] font-medium text-slate-500">{stat.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 transition-all hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900">Moliyaviy dinamika</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">Haftalik tushum va xarajatlar</p>
            </div>
            <div className="flex items-center gap-4 text-[12px] font-medium text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>Tushum</div>
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
                        <div className="backdrop-blur-md bg-white/75 border border-white/60 p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex flex-col gap-2 min-w-[160px] transition-all select-none">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                          <div className="space-y-1.5">
                            {payload.map((entry: any, index: number) => (
                              <div key={index} className="flex items-center justify-between gap-4 py-0.5">
                                <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color}} />
                                  {entry.name}
                                </span>
                                <span className="text-xs font-bold text-slate-900">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 transition-all hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900">Ommabop kategoriyalar</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">Sotuv hajmi bo'yicha mahsulotlar</p>
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
                        <div className="backdrop-blur-md bg-white/75 border border-white/60 p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex flex-col gap-2 min-w-[160px] transition-all select-none">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-4 py-0.5">
                              <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Sotuvlar
                              </span>
                              <span className="text-xs font-bold text-emerald-600">
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
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-[14px] font-semibold text-slate-900">So'nggi tranzaksiyalar</h3>
            </div>
            <Link 
              to="/finance" 
              className="text-[13px] font-semibold text-primary-600 hover:text-primary-700 :text-primary-300 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              Barchasi <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTransactions.map((trx) => (
              <div key={trx.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50  :bg-slate-800/50/80 :bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${trx.type ==='Kirim' ?'bg-emerald-50 border-emerald-100 text-emerald-600' :'bg-rose-50 border-rose-100 text-rose-600'}`}>
                    <DollarSign className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-900 mb-0.5">{trx.description}</p>
                    <p className="text-[12px] font-medium text-slate-500">{trx.date} • <span className="text-slate-400">{trx.method}</span></p>
                  </div>
                </div>
                <span className={`text-[14px] font-semibold ${trx.type ==='Kirim' ?'text-emerald-600' :'text-slate-700'}`}>
                  {trx.type ==='Kirim' ?'+' :'-'}{trx.amount.toLocaleString()} UZS
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-500" strokeWidth={2} />
                <h3 className="font-bold text-slate-900">Kam qoldiqlar</h3>
              </div>
              <Link to="/warehouse" className="text-[12px] font-semibold text-primary-600 hover:text-primary-700 :text-primary-300">Ko'rish</Link>
            </div>
            <div className="p-2">
              {products.filter(p => p.stock < 100).map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 hover:bg-slate-50  :bg-slate-800/50 :bg-slate-800/30 rounded-xl transition-colors">
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">{p.name}</p>
                    <p className="text-[11px] font-medium text-slate-400  mt-0.5">{p.category}</p>
                  </div>
                  <span className="text-[12px] bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-full border border-amber-200/60">
                    {p.stock} {p.unit}
                  </span>
                </div>
              ))}
              {products.filter(p => p.stock < 100).length === 0 && (
                <div className="p-6 text-center">
                  <Package className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-[13px] font-medium text-slate-400">Barcha mahsulotlar yetarli</p>
                </div>
              )}
            </div>
          </div>

          {/* HR Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" strokeWidth={2} />
                <h3 className="font-bold text-slate-900">Xodimlar holati</h3>
              </div>
              <Link to="/hr" className="text-[12px] font-semibold text-primary-600 hover:text-primary-700 :text-primary-300">Ko'rish</Link>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500">Jami xodimlar</span>
                <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg text-[13px]">{employees.length} ta</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500">Faol xodimlar</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-lg text-[13px]">{activeEmployees} ta</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500">Ta'tilda</span>
                <span className="font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-lg text-[13px]">
                  {employees.filter(e => e.status ==="Ta'tilda").length} ta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );}
