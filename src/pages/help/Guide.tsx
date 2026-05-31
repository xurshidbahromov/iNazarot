import { useState } from 'react';
import { Search, Book, PlayCircle, MessageSquare, ExternalLink, ChevronRight, HelpCircle, FileText, Shield, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

const categories = [
  { id: 'basics', title: 'Asosiy tushunchalar', icon: Book, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'sales', title: 'Savdo va POS', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'warehouse', title: 'Ombor boshqaruvi', icon: FileText, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'settings', title: 'Sozlamalar va xavfsizlik', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const articles = [
  { title: "Yangi mijoz qo'shish qoidalari", category: "basics", readTime: "3 daqiqa" },
  { title: "Kassada savdoni amalga oshirish", category: "sales", readTime: "5 daqiqa" },
  { title: "Omborga yangi tovar kirim qilish", category: "warehouse", readTime: "4 daqiqa" },
  { title: "Xodimlarga ruxsatlarni sozlash", category: "settings", readTime: "6 daqiqa" },
];

export default function Guide() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl p-7 md:p-10 border border-slate-700/50">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-100 tracking-wider uppercase">iNazorat Qo'llanma Markazi</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-tight">
            Qanday yordam <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">bera olamiz?</span>
          </h1>
          <p className="text-slate-300 text-[15px] mb-7 max-w-xl leading-relaxed">
            Tizimdan samarali foydalanish, sozlamalarni to'g'ri amalga oshirish va kundalik ishlaringizni avtomatlashtirish bo'yicha to'liq qo'llanma.
          </p>

          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <div className="relative flex items-center bg-white/10 border border-white/20 rounded-xl p-1.5 backdrop-blur-xl transition-all focus-within:bg-white/15 focus-within:border-white/30">
              <div className="pl-4 pr-3">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Maqolalar, bo'limlar yoki savollarni qidiring..."
                className="flex-1 bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 text-sm h-10 w-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                Qidirish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className="group relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[20px] p-5 text-left hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-300/80 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none" />
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", cat.bg)}>
              <cat.icon className={cn("w-5 h-5", cat.color)} />
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-1 group-hover:text-slate-900">{cat.title}</h3>
            <p className="text-sm text-slate-500 font-medium">12 ta maqola</p>
            <div className="absolute bottom-5 right-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Popular Articles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Ommabop maqolalar</h2>
            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Barchasini ko'rish <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            {articles.map((article, idx) => (
              <a 
                href="#" 
                key={idx}
                className={cn(
                  "group flex items-center justify-between p-4 transition-colors hover:bg-slate-50/80",
                  idx !== articles.length - 1 && "border-b border-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{article.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        {categories.find(c => c.id === article.category)?.title}
                      </span>
                      <span className="text-xs text-slate-400">• {article.readTime} o'qiladi</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Support & Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 mb-5">Yordam kerakmi?</h2>
          
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[20px] p-5 text-white shadow-[0_8px_30px_rgba(16,185,129,0.2)] relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
                <PlayCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[17px] font-bold mb-1.5">Video darsliklar</h3>
              <p className="text-emerald-50 text-sm mb-4">Tizimdan foydalanish bo'yicha to'liq video qo'llanmalar to'plami.</p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg backdrop-blur-md">
                Tomosha qilish <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[20px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] group hover:border-slate-300/80 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
              <MessageSquare className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            </div>
            <h3 className="text-[16px] font-bold text-slate-800 mb-1.5 group-hover:text-blue-600 transition-colors">Jonli yordam</h3>
            <p className="text-slate-500 text-sm mb-3">Mutaxassislarimiz bilan bog'laning. Biz har doim yordamga tayyormiz.</p>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
              Chatni boshlash <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
