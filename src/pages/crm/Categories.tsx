import { useState} from'react';
import { Plus, Search, Percent, Trophy, Users, Trash2} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useCRMStore} from'../../store/useCRMStore';

export default function Categories() {
  const { categories, addCategory, deleteCategory, clients} = useCRMStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name:'',
    description:'',
    discount: 0,
    minPurchase: 0,
    color:'bg-blue-100 text-blue-700 border-blue-200'});

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({
      name: form.name,
      description: form.description,
      discount: Number(form.discount),
      minPurchase: Number(form.minPurchase),
      color: form.color});
    setForm({
      name:'',
      description:'',
      discount: 0,
      minPurchase: 0,
      color:'bg-blue-100 text-blue-700 border-blue-200'});
    setIsModalOpen(false);};

  const getClientCountByCategory = (categoryName: string) => {
    // Mocking customer categorization logic based on status or name (for visual representation)
    if (categoryName.toLowerCase().includes('vip')) {
      return clients.filter(c => c.balance === 0 && c.status ==='Faol').length;} else if (categoryName.toLowerCase().includes('doimiy')) {
      return clients.filter(c => c.balance < 0 && c.status ==='Faol').length;} else {
      return clients.filter(c => c.status !=='Faol').length;}};

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#20c997]" />
            Mijoz toifalari (kategoriyalari)
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Mijozlarni xarid hajmiga qarab toifalash, chegirmalar va bonuslar tizimini sozlash.</p>
        </div>
        <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Toifa qo'shish
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Eng yuqori toifa chegirmasi */}
        <div className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 mb-3">
              <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Eng yuqori toifa chegirmasi</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {Math.max(...categories.map(c => c.discount), 0)}% chegirma
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">VIP mijozlarimiz uchun maxsus takliflar va imtiyozlar.</p>
        </div>

        {/* Faol toifalar */}
        <div className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 mb-3">
              <Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Faol toifalar</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {categories.length} ta toifa
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Mijozlarni rag'batlantirish uchun turli darajadagi chegirma tizimi.</p>
        </div>

        {/* Saralangan mijozlar */}
        <div className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 mb-3">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Saralangan mijozlar</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {clients.length} ta umumiy mijoz
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Barcha mijozlar avtomatik ravishda toifalarga ajratiladi.</p>
        </div>
      </div>

      {/* Table & Filter */}
      <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-transparent bg-slate-50/50 dark:bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md relative flex-1">
            <div className="z-10 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white dark:bg-white/[0.08] h-10 border-slate-200 dark:border-transparent" placeholder="Kategoriya nomi yoki tavsifini yozing..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'name', label:'Toifa nomi'},
            { key:'description', label:'Tavsif / Izoh'},
            { key:'discount', label:'Chegirma foizi'},
            { key:'minPurchase', label:'Kirish ostonasi (Min. Xarid)'},
            { key:'clientsCount', label:'Mijozlar soni'},
            { key:'actions', label:'Amallar', className:'text-right'},
          ]}
          data={filtered}
          renderRow={(category) => {
            const count = getClientCountByCategory(category.name);
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-bold text-slate-900 dark:text-slate-100 sm:pl-6">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold border ${category.color}`}>
                    {category.name}
                  </span>
                </td>
                <td className="px-3 py-4 text-[13px] text-slate-500 dark:text-slate-400 max-w-[250px] truncate">{category.description}</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-extrabold text-slate-900 dark:text-slate-100">
                  <span className="text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center w-max gap-1">
                    <Percent className="w-3 h-3" /> {category.discount}%
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-700 dark:text-slate-300">
                  {category.minPurchase > 0 ?`${category.minPurchase.toLocaleString()} UZS` :'Cheklovsiz'}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-slate-600 dark:text-slate-400">
                  <span className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-xs">{count} ta mijoz</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right text-[13px] font-medium">
                  <Button variant="outline" size="sm" className="h-8 px-2 rounded-lg text-rose-500 border-slate-200 dark:border-transparent hover:bg-rose-50 dark:bg-rose-950/50 hover:border-rose-300"
                    onClick={() => {
                      if (confirm(`${category.name} toifasini o'chirishni xohlaysizmi?`)) {
                        deleteCategory(category.id);}}}>
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> O'chirish
                  </Button>
                </td>
              </>
            );}}
        />
      </div>

      {/* Add Kategoriya Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi toifa qo'shish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <Input label="Toifa nomi *" placeholder="Masalan: VIP xaridorlar" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value})} className="rounded-xl" required />
          
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tavsif / Izoh *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value})}
              placeholder="Qanday mijozlar ushbu toifaga kirishi haqida qisqacha izoh..."
              className="w-full px-3 py-2 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md border border-slate-300 dark:border-transparent rounded-xl text-[14px] focus:outline-none resize-none" rows={3} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Chegirma foizi (%)" type="number" min={0} max={100} value={form.discount ||''}
              onChange={(e) => setForm({ ...form, discount: Number(e.target.value)})} className="rounded-xl font-bold" />
            <Input label="Minimal xarid summasi (UZS)" type="number" min={0} value={form.minPurchase ||''}
              onChange={(e) => setForm({ ...form, minPurchase: Number(e.target.value)})} className="rounded-xl font-bold" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 mb-2">Vizual ko'rinishi (Badge rangi)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name:'Indigo / Binafsha', val:'bg-indigo-100 text-indigo-700 border-indigo-200'},
                { name:'Yashil / Emerald', val:'bg-emerald-100 text-emerald-700 border-emerald-200'},
                { name:'Ko\'k / Blue', val:'bg-blue-100 text-blue-700 border-blue-200'},
                { name:'Sariq / Amber', val:'bg-amber-100 text-amber-700 border-amber-200'},
              ].map((c) => (
                <button key={c.val} type="button" onClick={() => setForm({ ...form, color: c.val})}
                  className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition-colors ${
                    form.color === c.val ?'border-primary-500 ring-2 ring-primary-500/10' :'border-slate-200 dark:border-transparent bg-white dark:bg-white/[0.08] hover:bg-slate-50 dark:bg-white/5  :bg-slate-800/50'}`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${c.val.split('')[0]}`} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100 dark:border-transparent">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6">Kategoriyani saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
