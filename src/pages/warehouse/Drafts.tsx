import { useState} from'react';
import { FileText, Clock, AlertCircle, XCircle, Search, Plus, Trash2, Eye, Package, DollarSign, User, Calendar, FilePlus} from'lucide-react';
import { cn} from'../../utils/cn';

interface DraftItem {
  id: number;
  title: string;
  type:'kirim' |'chiqim' |'ko\'chirish';
  products: number;
  totalValue: number;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  status:'draft' |'review' |'rejected';
  notes?: string;}

const mockDrafts: DraftItem[] = [
  { id: 1, title:'Sabzavotlar kirim #DR-2024-001', type:'kirim', products: 12, totalValue: 4500000, createdBy:'Aziz Karimov', createdAt:'2024-01-15', lastModified:'2024-01-15', status:'draft', notes:'Yetkazib beruvchi hujjatlarini kutmoqda'},
  { id: 2, title:'Moliyaviy tovarlar chiqim #DR-2024-002', type:'chiqim', products: 5, totalValue: 1200000, createdBy:'Malika Yusupova', createdAt:'2024-01-14', lastModified:'2024-01-15', status:'review'},
  { id: 3, title:"Ko'chirish: Ombor A → B #DR-2024-003", type:"ko'chirish", products: 8, totalValue: 2300000, createdBy:'Jasur Toshmatov', createdAt:'2024-01-13', lastModified:'2024-01-14', status:'rejected', notes:'Inventar moslik muammosi'},
  { id: 4, title:'Elektronika kirim #DR-2024-004', type:'kirim', products: 20, totalValue: 15000000, createdBy:'Aziz Karimov', createdAt:'2024-01-12', lastModified:'2024-01-13', status:'draft'},
  { id: 5, title:'Oziq-ovqat chiqim #DR-2024-005', type:'chiqim', products: 3, totalValue: 870000, createdBy:'Malika Yusupova', createdAt:'2024-01-11', lastModified:'2024-01-12', status:'review'},
];

const typeConfig: Record<string, { label: string; color: string; bg: string}> = {
  kirim: { label:'Kirim', color:'text-emerald-700', bg:'bg-emerald-100'},
  chiqim: { label:'Chiqim', color:'text-red-700', bg:'bg-red-100'},"ko'chirish": { label:"Ko'chirish", color:'text-blue-700', bg:'bg-blue-100'},};

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  draft: { label: 'Qoralama', icon: FilePlus, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-white/5', border: 'border border-slate-200/60 dark:border-white/5' },
  review: { label: "Ko'rib chiqilmoqda", icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border border-amber-200/60 dark:border-amber-900/30' },
  rejected: { label: 'Rad etilgan', icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20', border: 'border border-red-200/60 dark:border-red-900/30' },
};

export default function WarehouseDrafts() {
  const [drafts, setDrafts] = useState<DraftItem[]>(mockDrafts);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = drafts.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.createdBy.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ==='all' || d.status === filterStatus;
    return matchSearch && matchStatus;});

  const counts = {
    all: drafts.length,
    draft: drafts.filter(d => d.status ==='draft').length,
    review: drafts.filter(d => d.status ==='review').length,
    rejected: drafts.filter(d => d.status ==='rejected').length,};

  const deleteDraft = (id: number) => {
    setDrafts(prev => prev.filter(d => d.id !== id));};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[#20c997]" strokeWidth={1.8} />
            </div>
            Qoralamalar
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Saqlangan va ko'rib chiqilayotgan hujjatlar</p>
        </div>
        <button className="group flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-orange-200 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]">
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" strokeWidth={1.6} />
          Yangi qoralama
        </button>
      </div>

      {/* Status filters */}
      <div className="flex gap-3">
        {[
          { key: 'all', label: 'Barchasi', count: counts.all },
          { key: 'draft', label: 'Qoralama', count: counts.draft },
          { key: 'review', label: "Ko'rib chiqilmoqda", count: counts.review },
          { key: 'rejected', label: 'Rad etilgan', count: counts.rejected },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border border-transparent',
              filterStatus === tab.key
                ? 'bg-slate-200 text-slate-800 dark:bg-white/15 dark:text-white shadow-sm'
                : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            )}
          >
            {tab.label}
            <span className={cn('text-xs px-1.5 py-0.5 rounded-md font-bold',
              filterStatus === tab.key 
                ? 'bg-slate-300 text-slate-900 dark:bg-white/20 dark:text-white' 
                : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
          <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
        </div>
        <input
          type="text"
          placeholder="Qoralama yoki muallif bo'yicha qidiring..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100 h-10 shadow-sm"
        />
      </div>

      {/* Drafts List */}
      <div className="space-y-3">
        {filtered.map(draft => {
          const type = typeConfig[draft.type];
          const status = statusConfig[draft.status];
          const StatusIcon = status.icon;

          return (
            <div key={draft.id} className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/60 dark:border-white/5 rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn('text-xs font-bold px-2.5 py-1 rounded-lg border', type.bg, type.color,
                      draft.type ==='kirim' ?'border-emerald-200' : draft.type ==='chiqim' ?'border-red-200' :'border-blue-200'
                    )}>
                      {type.label}
                    </span>
                    <span className={cn('flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg', status.bg, status.color, status.border)}>
                      <StatusIcon className="w-3 h-3" strokeWidth={1.6} />
                      {status.label}
                    </span>
                  </div>

                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 truncate text-[15px]">{draft.title}</h4>

                  {draft.notes && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 rounded-lg px-2.5 py-1.5 w-fit">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.6} />
                      {draft.notes}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-lg px-2.5 py-1">
                      <Package className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
                      {draft.products} mahsulot
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-lg px-2.5 py-1">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
                      {draft.totalValue.toLocaleString()} UZS
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-lg px-2.5 py-1">
                      <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
                      {draft.createdBy}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-lg px-2.5 py-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
                      {draft.lastModified}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button className="p-2 rounded-xl hover:bg-blue-50 dark:bg-blue-950/50 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:text-blue-400 transition-all hover:scale-110 duration-200" title="Ko'rish">
                    <Eye className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="p-2 rounded-xl hover:bg-red-50 dark:bg-red-950/50 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:text-red-400 transition-all hover:scale-110 duration-200"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                  {draft.status !=='rejected' && (
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-orange-200 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] ml-1">
                      {draft.status ==='draft' ?'Yuborish' :'Tasdiqlash'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );})}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[20px] border border-slate-200/60 dark:border-white/5 border-dashed">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/[0.06] rounded-[20px] flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-300" strokeWidth={1.6} />
            </div>
            <p className="font-semibold text-slate-500 dark:text-slate-400">Qoralamalar topilmadi</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Qidiruv yoki filtrni o'zgartiring</p>
          </div>
        )}
      </div>
    </div>
  );}
