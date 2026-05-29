import {
  TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package,
  Activity, ArrowRight, LayoutDashboard} from'lucide-react';
import { Link} from'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar} from'recharts';
import { useFinanceStore} from'../store/useFinanceStore';
import { useCRMStore} from'../store/useCRMStore';
import { useWarehouseStore} from'../store/useWarehouseStore';
import { useHRStore} from'../store/useHRStore';

// Dummy data for charts
const salesData = [
  { name:'Dush', tushum: 4000000, xarajat: 2400000},
  { name:'Sesh', tushum: 3000000, xarajat: 1398000},
  { name:'Chor', tushum: 2000000, xarajat: 9800000},
  { name:'Pay', tushum: 2780000, xarajat: 3908000},
  { name:'Juma', tushum: 1890000, xarajat: 4800000},
  { name:'Shan', tushum: 2390000, xarajat: 3800000},
  { name:'Yak', tushum: 3490000, xarajat: 4300000},
];

const categoryData = [
  { name:'Qurilish m.', qiymat: 4000},
  { name:'Metal prokat', qiymat: 3000},
  { name:'Elektr jihoz', qiymat: 2000},
  { name:'Santexnika', qiymat: 2780},
  { name:'Boshqa', qiymat: 1890},
];

export default function Dashboard() {
  const { getBalance, transactions} = useFinanceStore();
  const { clients} = useCRMStore();
  const { products} = useWarehouseStore();
  const { employees} = useHRStore();

  const balance = getBalance();
  const totalStock = products.reduce((a, p) => a + p.stock, 0);
  const lowStock = products.filter(p => p.stock < 100).length;
  const activeEmployees = employees.filter(e => e.status ==='Faol').length;

  const stats = [
    {
      name:'Kassa Balansi',
      value:`${balance.toLocaleString()} UZS`,
      icon: DollarSign,
      change:'+20.1%',
      changeType:'positive',
      href:'/finance',
      bg:'bg-blue-50',
      iconColor:'text-blue-600',},
    {
      name:'Faol Mijozlar',
      value: clients.filter(c => c.status ==='Faol').length.toString(),
      icon: Users,
      change:'+15.5%',
      changeType:'positive',
      href:'/crm',
      bg:'bg-violet-50',
      iconColor:'text-violet-600',},
    {
      name:'Jami Tranzaksiyalar',
      value: transactions.length.toString(),
      icon: ShoppingCart,
      change:'-4.2%',
      changeType:'negative',
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
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary-600" />
          Asosiy sahifa
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {new Intl.DateTimeFormat('uz-UZ', { weekday:'long', year:'numeric', month:'long', day:'numeric'}).format(new Date())}
        </p>
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
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>Tushum</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>Xarajat</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0}}>
                <defs>
                  <linearGradient id="colorTushum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorXarajat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#64748b', fontSize: 13, fontWeight: 500}} dy={15} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill:'#64748b', fontSize: 13, fontWeight: 500}} 
                  dx={-10}
                  tickFormatter={(value) =>`${value / 1000000}M`}
                />
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  cursor={{stroke:'#94a3b8', strokeWidth: 1, strokeDasharray:'4 4'}}
                  content={({ active, payload, label}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="backdrop-blur-md bg-white/80 backdrop-blur-md/90 border-2 border-[#f1f2f4]/80 p-3 rounded-2xl shadow-xl flex flex-col gap-1.5 min-w-[170px] transition-all">
                          <p className="text-xs font-semibold text-slate-400  uppercase tracking-wider">{label}</p>
                          <div className="divide-y divide-slate-100">
                            {payload.map((entry: any, index: number) => (
                              <div key={index} className="flex items-center justify-between gap-4 py-1.5 first:pt-0 last:pb-0">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
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
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorTushum)" 
                  activeDot={{r: 6, strokeWidth: 0, fill:'#0ea5e9'}}
                />
                <Area 
                  type="monotone" 
                  name="Xarajat" 
                  dataKey="xarajat" 
                  stroke="#f43f5e" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorXarajat)" 
                  activeDot={{r: 6, strokeWidth: 0, fill:'#f43f5e'}}
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
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#64748b', fontSize: 13, fontWeight: 500}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:'#64748b', fontSize: 13, fontWeight: 500}} dx={-10} />
                <Tooltip 
                  cursor={{fill:'rgba(99, 102, 241, 0.05)'}}
                  content={({ active, payload, label}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="backdrop-blur-md bg-white/80 backdrop-blur-md/90 border-2 border-[#f1f2f4]/80 p-3 rounded-2xl shadow-xl flex flex-col gap-1.5 min-w-[140px] transition-all">
                          <p className="text-xs font-semibold text-slate-400  uppercase tracking-wider">{label}</p>
                          <div className="flex items-center justify-between gap-4 py-0.5">
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                              <span className="w-2 h-2 rounded-full bg-indigo-500" />
                              Sotuvlar
                            </span>
                            <span className="text-xs font-bold text-indigo-600">
                              {Number(payload[0].value).toLocaleString()} dona
                            </span>
                          </div>
                        </div>
                      );}
                    return null;}}
                />
                <Bar name="Sotuv hajmi" dataKey="qiymat" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={50} />
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
