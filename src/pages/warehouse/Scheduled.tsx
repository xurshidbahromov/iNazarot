import { useState} from'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Plus, Search, ChevronRight, Bell, Play, Pause, Package, DollarSign, User, Hash, RefreshCw, CalendarClock} from'lucide-react';
import { cn} from'../../utils/cn';

interface ScheduledItem {
  id: number;
  title: string;
  type:'kirim' |'chiqim' |"ko'chirish";
  frequency:'bir marta' |'haftalik' |'oylik';
  nextDate: string;
  lastRun?: string;
  products: number;
  totalValue: number;
  assignedTo: string;
  status:'active' |'paused' |'completed';
  completedCount: number;}

const mockScheduled: ScheduledItem[] = [
  { id: 1, title:'Haftalik oziq-ovqat kirim', type:'kirim', frequency:'haftalik', nextDate:'2024-01-22', lastRun:'2024-01-15', products: 30, totalValue: 8500000, assignedTo:'Aziz Karimov', status:'active', completedCount: 12},
  { id: 2, title:'Oylik inventar tekshirish', type:"ko'chirish", frequency:'oylik', nextDate:'2024-02-01', lastRun:'2024-01-01', products: 50, totalValue: 0, assignedTo:'Malika Yusupova', status:'active', completedCount: 6},
  { id: 3, title:'Eskirgan mahsulotlar chiqim', type:'chiqim', frequency:'haftalik', nextDate:'2024-01-25', lastRun:'2024-01-18', products: 5, totalValue: 450000, assignedTo:'Jasur Toshmatov', status:'paused', completedCount: 8},
  { id: 4, title:'Elektronika maxsus yetkazma', type:'kirim', frequency:'bir marta', nextDate:'2024-01-30', products: 20, totalValue: 25000000, assignedTo:'Aziz Karimov', status:'active', completedCount: 0},
  { id: 5, title:'Yillik ombor inventarizatsiya', type:"ko'chirish", frequency:'bir marta', nextDate:'2024-12-31', products: 200, totalValue: 0, assignedTo:'Malika Yusupova', status:'paused', completedCount: 3},
  { id: 6, title:'Oylik chiqim hisobot', type:'chiqim', frequency:'oylik', nextDate:'2024-02-01', lastRun:'2024-01-01', products: 15, totalValue: 3200000, assignedTo:'Jasur Toshmatov', status:'completed', completedCount: 12},
];

const typeConfig: Record<string, { label: string; color: string; bg: string; border: string}> = {
  kirim: { label:'Kirim', color:'text-emerald-700', bg:'bg-emerald-50', border:'border-emerald-200'},
  chiqim: { label:'Chiqim', color:'text-red-700', bg:'bg-red-50', border:'border-red-200'},"ko'chirish": { label:"Ko'chirish", color:'text-blue-700', bg:'bg-blue-50', border:'border-blue-200'},};

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; dot: string}> = {
  active: { label:'Faol', color:'text-emerald-700', bg:'bg-emerald-50', border:'border-emerald-200', dot:'bg-emerald-500'},
  paused: { label:"To'xtatilgan", color:'text-amber-700', bg:'bg-amber-50', border:'border-amber-200', dot:'bg-amber-500'},
  completed: { label:'Tugallangan', color:'text-slate-600', bg:'bg-slate-50', border:'border-slate-200', dot:'bg-slate-400'},};

const freqConfig: Record<string, { label: string; Icon: React.ElementType}> = {'bir marta': { label:'Bir marta', Icon: Hash},
  haftalik: { label:'Haftalik', Icon: RefreshCw},
  oylik: { label:'Oylik', Icon: CalendarClock},};

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;}

export default function WarehouseScheduled() {
  const [items, setItems] = useState<ScheduledItem[]>(mockScheduled);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ==='all' || item.status === filterStatus;
    return matchSearch && matchStatus;});

  const toggleStatus = (id: number) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, status: item.status ==='active' ?'paused' :'active'}
        : item
    ));};

  const counts = {
    all: items.length,
    active: items.filter(i => i.status ==='active').length,
    paused: items.filter(i => i.status ==='paused').length,
    completed: items.filter(i => i.status ==='completed').length,};

  const upcomingToday = items.filter(i => {
    const days = getDaysUntil(i.nextDate);
    return days >= 0 && days <= 3 && i.status ==='active';});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
            </div>
            Rejalashtirilgan operatsiyalar
          </h3>
          <p className="text-sm text-slate-500 mt-1">Muntazam va bir martalik ombor operatsiyalarini boshqaring</p>
        </div>
        <button className="group flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-emerald-200 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]">
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" strokeWidth={1.6} />
          Yangi rejalashtirish
        </button>
      </div>

      {/* Upcoming Alert */}
      {upcomingToday.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-[20px] p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-amber-600" strokeWidth={1.6} />
          </div>
          <div>
            <p className="font-semibold text-amber-800 text-sm">Yaqin 3 kunda {upcomingToday.length} ta operatsiya rejalashtirilgan</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {upcomingToday.map(item => (
                <span key={item.id} className="text-xs bg-amber-100 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-lg font-medium">
                  {item.title} — {getDaysUntil(item.nextDate) === 0 ?'Bugun' :`${getDaysUntil(item.nextDate)} kun`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Faol rejalar', value: counts.active, color:'text-emerald-600', bg:'bg-emerald-50', border:'border-emerald-200'},
          { label:"To'xtatilgan", value: counts.paused, color:'text-amber-600', bg:'bg-amber-50', border:'border-amber-200'},
          { label:'Tugallangan', value: counts.completed, color:'text-slate-600', bg:'bg-slate-50', border:'border-slate-200'},
        ].map(stat => (
          <div key={stat.label} className={cn('rounded-[20px] border p-4 text-center', stat.bg, stat.border)}>
            <p className={cn('text-3xl font-bold', stat.color)}>{stat.value}</p>
            <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {[
          { key:'all', label:'Barchasi', count: counts.all},
          { key:'active', label:'Faol', count: counts.active},
          { key:'paused', label:"To'xtatilgan", count: counts.paused},
          { key:'completed', label:'Tugallangan', count: counts.completed},
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border',
              filterStatus === tab.key
                ?'bg-white border-slate-300 text-slate-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
                :'bg-transparent border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            {tab.label}
            <span className={cn('text-xs px-1.5 py-0.5 rounded-md font-bold',
              filterStatus === tab.key ?'bg-emerald-100 text-emerald-700' :'bg-slate-100 text-slate-500'
            )}>
              {tab.count}
            </span>
          </button>
        ))}

        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.6} />
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/80 backdrop-blur-md border-2 border-[#f1f2f4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-300 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Scheduled Items */}
      <div className="space-y-3">
        {filtered.map(item => {
          const type = typeConfig[item.type];
          const status = statusConfig[item.status];
          const freq = freqConfig[item.frequency];
          const daysUntil = getDaysUntil(item.nextDate);
          const isUrgent = daysUntil <= 3 && daysUntil >= 0 && item.status ==='active';

          return (
            <div
              key={item.id}
              className={cn('group bg-white border rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200',
                isUrgent ?'border-amber-300 hover:border-amber-400' :'border-slate-200'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={cn('text-xs font-bold px-2.5 py-1 rounded-lg border', type.bg, type.color, type.border)}>
                      {type.label}
                    </span>
                    <span className={cn('flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border', status.bg, status.color, status.border)}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
                      {status.label}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-50 border-2 border-[#f1f2f4] px-2.5 py-1 rounded-lg">
                      <freq.Icon className="w-3 h-3" strokeWidth={1.6} />
                      {freq.label}
                    </span>
                    {isUrgent && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" strokeWidth={1.6} />
                        {daysUntil === 0 ?'Bugun!' :`${daysUntil} kunda`}
                      </span>
                    )}
                  </div>

                  <h4 className="font-semibold text-slate-900 text-[15px]">{item.title}</h4>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border-2 border-[#f1f2f4] rounded-lg px-2.5 py-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.6} />
                      Keyingi: <strong className="text-slate-700 ml-0.5">{item.nextDate}</strong>
                    </span>
                    {item.lastRun && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" strokeWidth={1.6} />
                        Oxirgi: {item.lastRun}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border-2 border-[#f1f2f4] rounded-lg px-2.5 py-1">
                      <Package className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.6} />
                      {item.products} mahsulot
                    </span>
                    {item.totalValue > 0 && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border-2 border-[#f1f2f4] rounded-lg px-2.5 py-1">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.6} />
                        {item.totalValue.toLocaleString()} UZS
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border-2 border-[#f1f2f4] rounded-lg px-2.5 py-1">
                      <User className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.6} />
                      {item.assignedTo}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.6} />
                      {item.completedCount} marta bajarilgan
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {item.status !=='completed' && (
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={cn('p-2 rounded-xl transition-all hover:scale-110 duration-200',
                        item.status ==='active'
                          ?'hover:bg-amber-50 text-amber-500'
                          :'hover:bg-emerald-50 text-emerald-500'
                      )}
                      title={item.status ==='active' ?"To'xtatish" :'Davom ettirish'}
                    >
                      {item.status ==='active'
                        ? <Pause className="w-4 h-4" strokeWidth={1.6} />
                        : <Play className="w-4 h-4" strokeWidth={1.6} />}
                    </button>
                  )}
                  <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all hover:scale-110 duration-200">
                    <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div>
          );})}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] border-dashed">
            <div className="w-16 h-16 bg-slate-100 rounded-[20px] flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-300" strokeWidth={1.6} />
            </div>
            <p className="font-semibold text-slate-500">Rejalashtirilgan operatsiyalar topilmadi</p>
            <p className="text-sm text-slate-400 mt-1">Qidiruv yoki filtrni o'zgartiring</p>
          </div>
        )}
      </div>
    </div>
  );}
