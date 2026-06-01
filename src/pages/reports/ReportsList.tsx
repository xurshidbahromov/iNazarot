import { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart,
  LayoutGrid,
  List,
  ExternalLink,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { exportToCSV } from '../../utils/posUtils';

const categories = [
  { id: 'all', label: 'BARCHASI' },
  { id: 'sales', label: 'SAVDO' },
  { id: 'distribution', label: 'DISTRIBUTSIYA' },
  { id: 'production', label: 'ISHLAB CHIQARISH' },
  { id: 'crm', label: 'CRM' },
  { id: 'supply', label: "TA'MINOT" },
  { id: 'warehouse', label: 'OMBOR' },
  { id: 'finance', label: 'MOLIYA' },
  { id: 'hr', label: 'HR' },
];

const reports = [
  { id: 1, name: 'Umumiy savdo', category: 'sales', icon: TrendingUp, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { id: 2, name: 'Kirim-chiqim hisoboti', category: 'finance', icon: DollarSign, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 3, name: 'Kassa aylanmasi hisoboti', category: 'finance', icon: PieChart, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  { id: 4, name: "Mahsulotlar bo'yicha savdo", category: 'sales', icon: Package, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { id: 5, name: "Kategoriya bo'yicha savdo", category: 'sales', icon: LayoutGrid, color: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { id: 6, name: "Xodim bo'yicha savdo", category: 'sales', icon: Users, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { id: 7, name: "Mijoz bo'yicha savdo", category: 'crm', icon: Users, color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { id: 8, name: 'Mijoz aylanmasi hisoboti', category: 'crm', icon: TrendingUp, color: 'text-teal-500 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  { id: 9, name: 'Yetkazib beruvchi aylanmasi hisoboti', category: 'supply', icon: ShoppingCart, color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { id: 10, name: 'Xodim aylanmasi hisoboti', category: 'hr', icon: Users, color: 'text-rose-500 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { id: 11, name: "To'lov turi bo'yicha savdo", category: 'sales', icon: DollarSign, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 12, name: 'Mahsulotlar savdosi', category: 'sales', icon: Package, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { id: 13, name: 'Mijozlar savdosi', category: 'crm', icon: TrendingUp, color: 'text-violet-500 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { id: 14, name: "Sotuv mijozlar bo'yicha", category: 'crm', icon: PieChart, color: 'text-fuchsia-500 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
  { id: 15, name: 'Mijozlar faolligi', category: 'crm', icon: Users, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { id: 16, name: 'Cashback aylanmasi hisoboti', category: 'crm', icon: DollarSign, color: 'text-rose-400 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { id: 17, name: 'Mijozlar ABC XYZ tahlili', category: 'crm', icon: LayoutGrid, color: 'text-indigo-400 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { id: 18, name: "Mahsulotlar qoldig'i tashkilotlar bo'yicha", category: 'warehouse', icon: Package, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { id: 19, name: "Ko'chirishlar hisoboti", category: 'warehouse', icon: TrendingUp, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { id: 20, name: "Mahsulot qoldig'ini vaqt oralig'ida ko'rish", category: 'warehouse', icon: LayoutGrid, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
  { id: 21, name: 'Tavsiya etilgan tovar miqdori', category: 'warehouse', icon: Package, color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-950/30' },
  { id: 22, name: 'Tovarlar kirim-chiqimi', category: 'warehouse', icon: TrendingUp, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30' },
  { id: 23, name: "Mahsulotlar qoldig'i ombor bo'yicha", category: 'warehouse', icon: LayoutGrid, color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 24, name: "Holatlar bo'yicha tovar qoldig'i", category: 'warehouse', icon: Package, color: 'text-teal-700 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  { id: 25, name: 'Mahsulotlar kirimi', category: 'warehouse', icon: ShoppingCart, color: 'text-cyan-700 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { id: 26, name: 'Hisobdan chiqarish hisoboti', category: 'warehouse', icon: TrendingUp, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { id: 27, name: 'Mahsulotlar tannarxi', category: 'finance', icon: DollarSign, color: 'text-indigo-700 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { id: 28, name: 'Mijoz balansi', category: 'finance', icon: Users, color: 'text-violet-700 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { id: 29, name: 'Xodim balansi', category: 'finance', icon: Users, color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  { id: 30, name: 'Yetkazib beruvchi balansi', category: 'finance', icon: ShoppingCart, color: 'text-fuchsia-700 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
  { id: 31, name: '3-shaxs balansi', category: 'finance', icon: Users, color: 'text-pink-700 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { id: 32, name: "Kategoriyalar bo'yicha tannarx", category: 'finance', icon: LayoutGrid, color: 'text-rose-700 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { id: 33, name: 'Balans hisobot', category: 'finance', icon: DollarSign, color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30' },
  { id: 34, name: 'Pul oqimi', category: 'finance', icon: TrendingUp, color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { id: 35, name: 'Kassa sessiyasi', category: 'finance', icon: PieChart, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { id: 36, name: 'Mahsulotlar ishlab chiqarilishi', category: 'production', icon: Package, color: 'text-stone-600 dark:text-stone-400', bg: 'bg-stone-50 dark:bg-stone-950/30' },
  { id: 37, name: "Mas'ul shaxs bo'yicha ishlab chiqarish", category: 'production', icon: Users, color: 'text-zinc-600 dark:text-zinc-400', bg: 'bg-zinc-50 dark:bg-zinc-950/30' },
  { id: 38, name: 'Tavsiya etilgan xomashyo miqdori', category: 'production', icon: Package, color: 'text-neutral-600 dark:text-neutral-400', bg: 'bg-neutral-50 dark:bg-neutral-950/30' },
  { id: 39, name: "Mahsulot ishlab chiqarish xodimlar bo'yicha", category: 'production', icon: Users, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-950/30' },
  { id: 40, name: 'ABC analiz', category: 'sales', icon: LayoutGrid, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-950/30' },
  { id: 41, name: "Narx og'ishi hisoboti", category: 'finance', icon: TrendingUp, color: 'text-emerald-800 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 42, name: 'Tashrif hisoboti', category: 'crm', icon: Users, color: 'text-blue-800 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { id: 43, name: 'Sotilmayotgan mahsulotlar hisoboti', category: 'warehouse', icon: Package, color: 'text-rose-800 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { id: 44, name: 'Vositachi hisoboti', category: 'distribution', icon: Users, color: 'text-orange-800 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { id: 45, name: "Mijozlar to'lovlari", category: 'finance', icon: DollarSign, color: 'text-purple-800 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30' },
];

export default function ReportsList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter(report => {
    const matchesCategory = activeCategory === 'all' || report.category === activeCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-[#20c997] rounded-xl">
              <BarChart2 className="w-6 h-6" />
            </div>
            Hisobotlar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Barcha biznes ko'rsatkichlari va tahliliy ma'lumotlar bitta joyda.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="z-10 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Hisobot izlash..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-white/5 transition-colors shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
          <button 
            onClick={() => exportToCSV(filteredReports.map(r => ({ ID: r.id, Nomi: r.name, Kategoriya: r.category })), 'hisobotlar')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
            <span>Eksport</span>
          </button>
        </div>
      </div>

      {/* Tabs & View Toggles */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-2 border-[#f1f2f4] dark:border-transparent rounded-[20px] p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
        <div className="flex items-center overflow-x-auto custom-scrollbar pb-1 xl:pb-0 gap-1 flex-1 bg-slate-100/80 dark:bg-white/5 p-1 rounded-xl">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-[13px] font-bold tracking-wide whitespace-nowrap transition-all duration-300",
                activeCategory === category.id
                  ? "bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/30 dark:hover:bg-white/5"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-white/5 p-1 rounded-xl shrink-0 self-end xl:self-auto">
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200",
              viewMode === 'list' 
                ? "bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <List className="w-4 h-4" />
            JADVAL
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200",
              viewMode === 'grid' 
                ? "bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            KATAK
          </button>
        </div>
      </div>

      {/* Reports Content */}
      {viewMode === 'list' ? (
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border-2 border-[#f1f2f4] dark:border-transparent rounded-[20px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-white/[0.02] border-b-2 border-[#f1f2f4] dark:border-white/5">
                <th className="px-5 py-3 text-[12px] font-semibold text-slate-500 dark:text-slate-400 w-12">№</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-slate-500 dark:text-slate-400">Nomi</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-slate-500 dark:text-slate-400 text-right">Harakat</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, idx) => (
                <tr 
                  key={report.id} 
                  className="group border-b border-slate-100 dark:border-transparent last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:text-slate-400 transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", report.bg)}>
                        <report.icon className={cn("w-4 h-4", report.color)} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {report.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Hisobotlar topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              className="group bg-white/80 dark:bg-white/5 backdrop-blur-sm border-2 border-[#f1f2f4] dark:border-transparent rounded-[20px] p-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1", report.bg)}>
                  <report.icon className={cn("w-5 h-5", report.color)} />
                </div>
                <button className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-[15px] group-hover:text-slate-950 dark:group-hover:text-white transition-colors flex-1 line-clamp-2 leading-tight">
                {report.name}
              </h3>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-transparent">
                <span className="text-[10px] font-semibold px-2 py-1 bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 rounded border border-slate-200/50 tracking-wide uppercase">
                  {categories.find(c => c.id === report.category)?.label}
                </span>
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-white/[0.08] rounded-[20px] border border-slate-200/60">
              Hisobotlar topilmadi
            </div>
          )}
        </div>
      )}
    </div>
  );
}
