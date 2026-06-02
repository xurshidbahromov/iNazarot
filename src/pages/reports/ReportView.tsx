import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Download, Calendar, MapPin, Search } from 'lucide-react';
import { reports } from '../../data/reportsData';
import FinanceReport from './components/FinanceReport';
import CRMReport from './components/CRMReport';
import WarehouseReport from './components/WarehouseReport';

export default function ReportView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const report = reports.find(r => r.id === Number(id));
  
  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Hisobot topilmadi</h2>
        <button onClick={() => navigate('/reports')} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-semibold">
          Orqaga qaytish
        </button>
      </div>
    );
  }

  const Icon = report.icon;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/reports')}
            className="p-2.5 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${report.bg}`}>
                <Icon className={`w-5 h-5 ${report.color}`} />
              </div>
              {report.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Bu bo'lim orqali {report.name.toLowerCase()} ma'lumotlarini tahlil qilishingiz mumkin.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm transition-all duration-150 active:scale-95">
            <Download className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Eksport (Excel)</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border-2 border-[#f1f2f4] dark:border-transparent rounded-[20px] p-4 flex flex-col lg:flex-row gap-4 shadow-sm dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
        
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Date Picker */}
          <div className="relative flex-1 sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Davrni tanlang..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full transition-all"
            />
          </div>

          {/* Branch Picker */}
          <div className="relative flex-1 sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            <select className="pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full transition-all appearance-none text-slate-600 dark:text-slate-300">
              <option value="">Barcha filiallar</option>
              <option value="1">Asosiy filial</option>
              <option value="2">Chilonzor filiali</option>
            </select>
          </div>
          
          <div className="relative flex-1 sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Qidirish..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full transition-all"
            />
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm active:scale-95">
          <Filter className="w-4 h-4" />
          Tahlil qilish
        </button>

      </div>

      {/* Data Table */}
      <div className="mt-6">
        {[2].includes(Number(id)) && <FinanceReport reportId={Number(id)} />}
        {[1, 28].includes(Number(id)) && <CRMReport reportId={Number(id)} />}
        {[18].includes(Number(id)) && <WarehouseReport reportId={Number(id)} />}

        {![1, 2, 18, 28].includes(Number(id)) && (
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-sm border-2 border-[#f1f2f4] dark:border-transparent rounded-[20px] overflow-hidden shadow-sm dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-white/[0.02] border-b-2 border-[#f1f2f4] dark:border-white/5">
                  <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Ko'rsatkich</th>
                  <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Qiymat</th>
                  <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">O'zgarish</th>
                  <th className="px-5 py-4 text-[13px] font-semibold text-slate-500 dark:text-slate-400">Izoh</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-20 h-20 ${report.bg} rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-3`}>
                        <Icon className={`w-10 h-10 ${report.color}`} />
                      </div>
                      <h3 className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-2">Ma'lumotlar tayyorlanmoqda</h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-[15px]">
                        Bu hisobot ({report.name}) tez orada haqiqiy ma'lumotlar bilan to'ldiriladi.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
