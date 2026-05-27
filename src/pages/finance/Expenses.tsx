import { useState } from 'react';
import { CreditCard, Plus, Search, Filter, ArrowUpRight, DollarSign, Calendar, Tag, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  paidBy: string;
  status: 'completed' | 'pending';
}

const mockExpenses: Expense[] = [
  { id: 1, title: 'Ofis ijara to\'lovi', category: 'Ijara', amount: 15000000, date: '2024-01-05', paidBy: 'Kassa 1', status: 'completed' },
  { id: 2, title: 'Yangi kompyuterlar xaridi', category: 'Uskunalar', amount: 35000000, date: '2024-01-10', paidBy: 'Kassa 2', status: 'completed' },
  { id: 3, title: 'Internet to\'lovi', category: 'Aloqa', amount: 500000, date: '2024-01-12', paidBy: 'Kassa 1', status: 'pending' },
  { id: 4, title: 'Kanselyariya mollari', category: 'Ofis xarajatlari', amount: 1200000, date: '2024-01-15', paidBy: 'Kassa 2', status: 'completed' },
  { id: 5, title: 'Xodimlar uchun tushlik', category: 'Oziq-ovqat', amount: 2500000, date: '2024-01-18', paidBy: 'Kassa 1', status: 'completed' },
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
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-red-600" />
            Xarajatlar
          </h3>
          <p className="text-sm text-slate-500 mt-1">Kompaniyaning barcha chiqimlari tahlili</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Xarajat qo'shish
        </button>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-red-50 border border-red-200 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-md">Joriy oy</span>
          </div>
          <p className="text-sm text-red-600 font-medium mb-1">Jami xarajatlar</p>
          <h4 className="text-3xl font-bold text-slate-900">{totalExpenses.toLocaleString()} <span className="text-lg text-slate-500 font-medium">UZS</span></h4>
        </div>
        
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
           <div>
             <p className="text-sm text-slate-500 mb-1">Eng katta toifa</p>
             <h4 className="text-lg font-bold text-slate-900">Uskunalar</h4>
           </div>
           <div className="flex items-center gap-2 mt-4 text-sm font-medium">
             <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md">35,000,000 UZS</span>
           </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
           <div>
             <p className="text-sm text-slate-500 mb-1">Kutilayotgan to'lovlar</p>
             <h4 className="text-lg font-bold text-slate-900">1 ta hujjat</h4>
           </div>
           <div className="flex items-center gap-2 mt-4 text-sm font-medium">
             <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">500,000 UZS</span>
           </div>
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
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Filter className="w-4 h-4 text-slate-400" />
          Filtrlar
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h4 className="font-semibold text-slate-900">Oxirgi tranzaksiyalar</h4>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map(expense => (
            <div key={expense.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
                  expense.status === 'completed' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                )}>
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-0.5">{expense.title}</h5>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3 text-slate-400" /> {expense.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {expense.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-5">
                <div>
                  <p className="font-bold text-slate-900 text-base">{expense.amount.toLocaleString()} UZS</p>
                  <p className="text-xs text-slate-400 font-medium">Manba: {expense.paidBy}</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <DollarSign className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p>Xarajatlar topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
