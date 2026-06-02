import { useState } from 'react';
import { 
  BarChart2, 
  LayoutGrid,
  List,
  ExternalLink,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { exportToCSV } from '../../utils/posUtils';
import { useNavigate } from 'react-router-dom';
import { categories, reports } from '../../data/reportsData';

export default function ReportsList() {
  const navigate = useNavigate();
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
                  onClick={() => navigate(`/reports/${report.id}`)}
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
              onClick={() => navigate(`/reports/${report.id}`)}
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
