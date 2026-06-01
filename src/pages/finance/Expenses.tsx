import { useState} from'react';
import { CreditCard, Plus, Search, Filter, ArrowUpRight, DollarSign, Calendar, Tag} from'lucide-react';
import { cn} from'../../utils/cn';
import { Table} from'../../components/ui/Table';

interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  paidBy: string;
  status:'completed' |'pending';}

const mockExpenses: Expense[] = [
  { id: 1, title:'Ofis ijara to\'lovi', category:'Ijara', amount: 15000000, date:'2024-01-05', paidBy:'Kassa 1', status:'completed'},
  { id: 2, title:'Yangi kompyuterlar xaridi', category:'Uskunalar', amount: 35000000, date:'2024-01-10', paidBy:'Kassa 2', status:'completed'},
  { id: 3, title:'Internet to\'lovi', category:'Aloqa', amount: 500000, date:'2024-01-12', paidBy:'Kassa 1', status:'pending'},
  { id: 4, title:'Kantselyariya mollari', category:'Ofis', amount: 1200000, date:'2024-01-15', paidBy:'Kassa 1', status:'completed'},
  { id: 5, title:'Xodimlar uchun tushlik', category:'Oziq-ovqat', amount: 2500000, date:'2024-01-18', paidBy:'Kassa 1', status:'completed'},
];

export default function Expenses() {
  const [search, setSearch] = useState('');
  const [expenses] = useState(mockExpenses);

  const filtered = expenses.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#20c997]" strokeWidth={1.8} />
            Xarajatlar
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kompaniyaning barcha chiqimlari tahlili</p>
        </div>
        <button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all flex items-center gap-2 text-white text-sm font-semibold">
          <Plus className="w-4 h-4" strokeWidth={2} />
          Xarajat qo'shish
        </button>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/30 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <ArrowUpRight className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200/60 dark:border-rose-900/30 px-2 py-0.5 rounded-full">Joriy oy</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">Jami xarajatlar</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalExpenses.toLocaleString()} UZS</p>
        </div>
        
        <div className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <DollarSign className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/30 px-2 py-0.5 rounded-full">Kassa</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">Kassadan to'langan</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{(totalExpenses * 0.85).toLocaleString()} UZS</p>
        </div>

        <div className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/30 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <DollarSign className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-900/30 px-2 py-0.5 rounded-full">Kutilayotgan</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">Kutilayotgan chiqimlar</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">500,000 UZS</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <div className="z-10 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
          </div>
          <input
            type="text"
            placeholder="Xarajat nomi yoki toifasini qidiring..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all h-10 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 h-10 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95">
          <Filter className="w-4 h-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
          Filtrlar
        </button>
      </div>

      {/* Transactions List */}
      <Table
        variant="standalone"
        columns={[
          { key:'title', label:'Xarajat nomi', sortable: true},
          { key:'category', label:'Toifa', sortable: true},
          { key:'amount', label:'Summa', sortable: true},
          { key:'date', label:'Sana', sortable: true},
          { key:'paidBy', label:'Manba', sortable: true},
          { key:'status', label:'Holat', sortable: true},
        ]}
        data={filtered}
        renderRow={(expense) => (
          <>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-semibold text-slate-900 dark:text-slate-100 sm:pl-6">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center",
                  expense.status ==='completed' ?'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400' :'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                )}>
                  <DollarSign className="w-4 h-4" />
                </div>
                {expense.title}
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600 dark:text-slate-400 font-medium">
              <span className="inline-flex items-center gap-1"><Tag className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {expense.category}</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-900 dark:text-slate-100">
              {expense.amount.toLocaleString()} UZS
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {expense.date}</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 dark:text-slate-400 font-semibold">{expense.paidBy}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border",
                expense.status ==='completed'
                  ?"bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30"
                  :"bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full",
                  expense.status ==='completed' ?"bg-emerald-500 dark:bg-emerald-400" :"bg-amber-500 dark:bg-amber-400"
                )} />
                {expense.status ==='completed' ?"Bajarildi" :"Kutilmoqda"}
              </span>
            </td>
          </>
        )}
      />
    </div>
  );}
