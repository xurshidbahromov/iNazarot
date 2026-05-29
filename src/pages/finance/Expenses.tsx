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
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-red-600" strokeWidth={1.8} />
            Xarajatlar
          </h3>
          <p className="text-sm text-slate-500 mt-1">Kompaniyaning barcha chiqimlari tahlili</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <Plus className="w-4 h-4" />
          Xarajat qo'shish
        </button>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-red-50 border border-red-200 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-md">Joriy oy</span>
          </div>
          <p className="text-sm text-red-600 font-medium mb-1">Jami xarajatlar</p>
          <p className="text-2xl font-bold text-red-700">{totalExpenses.toLocaleString()} UZS</p>
        </div>
        
        <div className="bg-slate-50 border-2 border-[#f1f2f4] p-5 rounded-2xl">
           <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <DollarSign className="w-5 h-5 text-slate-500" />
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Kassa</span>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Kassadan to'langan</p>
          <p className="text-2xl font-bold text-slate-800">{(totalExpenses * 0.85).toLocaleString()} UZS</p>
        </div>

        <div className="bg-slate-50 border-2 border-[#f1f2f4] p-5 rounded-2xl">
           <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <DollarSign className="w-5 h-5 text-slate-500" />
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Tasdiqlanishda</span>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Kutilayotgan chiqimlar</p>
          <p className="text-2xl font-bold text-slate-800">500,000 UZS</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Xarajat nomi yoki toifasini qidiring..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-md border-2 border-[#f1f2f4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-md border-2 border-[#f1f2f4] text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50  :bg-slate-800/50 transition-colors shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <Filter className="w-4 h-4 text-slate-400" />
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
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-semibold text-slate-900 sm:pl-6">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]",
                  expense.status ==='completed' ?'bg-red-50 text-red-600' :'bg-amber-50 text-amber-600'
                )}>
                  <DollarSign className="w-4 h-4" />
                </div>
                {expense.title}
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1"><Tag className="w-3 h-3 text-slate-400" /> {expense.category}</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-900">
              {expense.amount.toLocaleString()} UZS
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {expense.date}</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 font-semibold">{expense.paidBy}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border",
                expense.status ==='completed'
                  ?"bg-emerald-50 text-emerald-700 border-emerald-200"
                  :"bg-amber-50 text-amber-700 border-amber-200"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full",
                  expense.status ==='completed' ?"bg-emerald-500" :"bg-amber-500"
                )} />
                {expense.status ==='completed' ?"Bajarildi" :"Kutilmoqda"}
              </span>
            </td>
          </>
        )}
      />
    </div>
  );}
