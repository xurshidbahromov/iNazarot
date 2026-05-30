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
  { id: 1, name: 'Umumiy savdo', category: 'sales', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, name: 'Kirim-chiqim hisoboti', category: 'finance', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 3, name: 'Kassa aylanmasi hisoboti', category: 'finance', icon: PieChart, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 4, name: "Mahsulotlar bo'yicha savdo", category: 'sales', icon: Package, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 5, name: "Kategoriya bo'yicha savdo", category: 'sales', icon: LayoutGrid, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 6, name: "Xodim bo'yicha savdo", category: 'sales', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 7, name: "Mijoz bo'yicha savdo", category: 'crm', icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 8, name: 'Mijoz aylanmasi hisoboti', category: 'crm', icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { id: 9, name: 'Yetkazib beruvchi aylanmasi hisoboti', category: 'supply', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 10, name: 'Xodim aylanmasi hisoboti', category: 'hr', icon: Users, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 11, name: "To'lov turi bo'yicha savdo", category: 'sales', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
  { id: 12, name: 'Mahsulotlar savdosi', category: 'sales', icon: Package, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { id: 13, name: 'Mijozlar savdosi', category: 'crm', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { id: 14, name: "Sotuv mijozlar bo'yicha", category: 'crm', icon: PieChart, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
  { id: 15, name: 'Mijozlar faolligi', category: 'crm', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-600/10' },
  { id: 16, name: 'Cashback aylanmasi hisoboti', category: 'crm', icon: DollarSign, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { id: 17, name: 'Mijozlar ABC XYZ tahlili', category: 'crm', icon: LayoutGrid, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { id: 18, name: "Mahsulotlar qoldig'i tashkilotlar bo'yicha", category: 'warehouse', icon: Package, color: 'text-amber-600', bg: 'bg-amber-600/10' },
  { id: 19, name: "Ko'chirishlar hisoboti", category: 'warehouse', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-600/10' },
  { id: 20, name: "Mahsulot qoldig'ini vaqt oralig'ida ko'rish", category: 'warehouse', icon: LayoutGrid, color: 'text-yellow-600', bg: 'bg-yellow-600/10' },
  { id: 21, name: 'Tavsiya etilgan tovar miqdori', category: 'warehouse', icon: Package, color: 'text-lime-600', bg: 'bg-lime-600/10' },
  { id: 22, name: 'Tovarlar kirim-chiqimi', category: 'warehouse', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-600/10' },
  { id: 23, name: "Mahsulotlar qoldig'i ombor bo'yicha", category: 'warehouse', icon: LayoutGrid, color: 'text-emerald-700', bg: 'bg-emerald-700/10' },
  { id: 24, name: "Holatlar bo'yicha tovar qoldig'i", category: 'warehouse', icon: Package, color: 'text-teal-700', bg: 'bg-teal-700/10' },
  { id: 25, name: 'Mahsulotlar kirimi', category: 'warehouse', icon: ShoppingCart, color: 'text-cyan-700', bg: 'bg-cyan-700/10' },
  { id: 26, name: 'Hisobdan chiqarish hisoboti', category: 'warehouse', icon: TrendingUp, color: 'text-blue-700', bg: 'bg-blue-700/10' },
  { id: 27, name: 'Mahsulotlar tannarxi', category: 'finance', icon: DollarSign, color: 'text-indigo-700', bg: 'bg-indigo-700/10' },
  { id: 28, name: 'Mijoz balansi', category: 'finance', icon: Users, color: 'text-violet-700', bg: 'bg-violet-700/10' },
  { id: 29, name: 'Xodim balansi', category: 'finance', icon: Users, color: 'text-purple-700', bg: 'bg-purple-700/10' },
  { id: 30, name: 'Yetkazib beruvchi balansi', category: 'finance', icon: ShoppingCart, color: 'text-fuchsia-700', bg: 'bg-fuchsia-700/10' },
  { id: 31, name: '3-shaxs balansi', category: 'finance', icon: Users, color: 'text-pink-700', bg: 'bg-pink-700/10' },
  { id: 32, name: "Kategoriyalar bo'yicha tannarx", category: 'finance', icon: LayoutGrid, color: 'text-rose-700', bg: 'bg-rose-700/10' },
  { id: 33, name: 'Balans hisobot', category: 'finance', icon: DollarSign, color: 'text-red-700', bg: 'bg-red-700/10' },
  { id: 34, name: 'Pul oqimi', category: 'finance', icon: TrendingUp, color: 'text-orange-700', bg: 'bg-orange-700/10' },
  { id: 35, name: 'Kassa sessiyasi', category: 'finance', icon: PieChart, color: 'text-amber-700', bg: 'bg-amber-700/10' },
  { id: 36, name: 'Mahsulotlar ishlab chiqarilishi', category: 'production', icon: Package, color: 'text-stone-600', bg: 'bg-stone-600/10' },
  { id: 37, name: "Mas'ul shaxs bo'yicha ishlab chiqarish", category: 'production', icon: Users, color: 'text-zinc-600', bg: 'bg-zinc-600/10' },
  { id: 38, name: 'Tavsiya etilgan xomashyo miqdori', category: 'production', icon: Package, color: 'text-neutral-600', bg: 'bg-neutral-600/10' },
  { id: 39, name: "Mahsulot ishlab chiqarish xodimlar bo'yicha", category: 'production', icon: Users, color: 'text-gray-600', bg: 'bg-gray-600/10' },
  { id: 40, name: 'ABC analiz', category: 'sales', icon: LayoutGrid, color: 'text-slate-600', bg: 'bg-slate-600/10' },
  { id: 41, name: "Narx og'ishi hisoboti", category: 'finance', icon: TrendingUp, color: 'text-emerald-800', bg: 'bg-emerald-800/10' },
  { id: 42, name: 'Tashrif hisoboti', category: 'crm', icon: Users, color: 'text-blue-800', bg: 'bg-blue-800/10' },
  { id: 43, name: 'Sotilmayotgan mahsulotlar hisoboti', category: 'warehouse', icon: Package, color: 'text-rose-800', bg: 'bg-rose-800/10' },
  { id: 44, name: 'Vositachi hisoboti', category: 'distribution', icon: Users, color: 'text-orange-800', bg: 'bg-orange-800/10' },
  { id: 45, name: "Mijozlar to'lovlari", category: 'finance', icon: DollarSign, color: 'text-purple-800', bg: 'bg-purple-800/10' },
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <BarChart2 className="w-6 h-6" />
            </div>
            Hisobotlar
          </h1>
          <p className="text-slate-500 mt-2">Barcha biznes ko'rsatkichlari va tahliliy ma'lumotlar bitta joyda.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Hisobot izlash..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-sm active:scale-95">
            <Download className="w-4 h-4" />
            <span>Eksport</span>
          </button>
        </div>
      </div>

      {/* Tabs & View Toggles */}
      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <div className="flex items-center overflow-x-auto custom-scrollbar pb-1 xl:pb-0 gap-1 flex-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300",
                activeCategory === category.id
                  ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl shrink-0 self-end xl:self-auto">
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              viewMode === 'list' 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <List className="w-4 h-4" />
            JADVAL
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              viewMode === 'grid' 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            KATAK
          </button>
        </div>
      </div>

      {/* Reports Content */}
      {viewMode === 'list' ? (
        <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80">
                <th className="px-5 py-3 text-[12px] font-semibold text-slate-500 w-12">№</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-slate-500">Nomi</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-slate-500 text-right">Harakat</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, idx) => (
                <tr 
                  key={report.id} 
                  className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", report.bg)}>
                        <report.icon className={cn("w-4 h-4", report.color)} />
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {report.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
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
              className="group bg-white border border-slate-200/60 rounded-xl p-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md", report.bg, `shadow-${report.color.split('-')[1]}-500/20`)}>
                  <report.icon className={cn("w-5 h-5", report.color)} />
                </div>
                <button className="p-1.5 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 text-[15px] group-hover:text-blue-600 transition-colors flex-1 line-clamp-2 leading-tight">
                {report.name}
              </h3>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded border border-slate-200/50 tracking-wide uppercase">
                  {categories.find(c => c.id === report.category)?.label}
                </span>
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200/60">
              Hisobotlar topilmadi
            </div>
          )}
        </div>
      )}
    </div>
  );
}
