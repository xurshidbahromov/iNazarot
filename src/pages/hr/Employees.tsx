import { useState} from'react';
import { Plus, Search, Filter, Trash2, Edit, Users, UserCheck, Coffee, UserMinus} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useHRStore} from'../../store/useHRStore';

export default function Employees() {
  const { employees, addEmployee, deleteEmployee} = useHRStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name:'', position:'', department:'', phone:'', status:'Faol'});

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.position.toLowerCase().includes(search.toLowerCase()) ||
    e.phone.includes(search)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee(form);
    setForm({ name:'', position:'', department:'', phone:'', status:'Faol'});
    setIsModalOpen(false);};

  const stats = [
    { title:'Jami xodimlar', value: employees.length.toString(), icon: Users, color:'text-blue-500 dark:text-blue-400', bg:'bg-blue-50 dark:bg-blue-950/50'},
    { title:'Faol', value: employees.filter(e => e.status ==='Faol').length.toString(), icon: UserCheck, color:'text-emerald-500 dark:text-emerald-400', bg:'bg-emerald-50 dark:bg-emerald-950/50'},
    { title:"Ta'tilda", value: employees.filter(e => e.status ==="Ta'tilda").length.toString(), icon: Coffee, color:'text-amber-500 dark:text-amber-400', bg:'bg-amber-50 dark:bg-amber-950/50'},
    { title:"Bo'shatilgan", value: employees.filter(e => e.status ==="Ishdan bo'shatilgan").length.toString(), icon: UserMinus, color:'text-red-500 dark:text-red-400', bg:'bg-red-50 dark:bg-red-950/50'},
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#20c997]" />
            Xodimlar ro'yxati
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Kompaniyadagi barcha xodimlarni boshqarish, qo'shish va ularni tahrirlash.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-10 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95"
          >
            <Filter className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /> Filtrlash
          </Button>
          <Button 
            className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Xodim qo'shish
          </Button>
        </div>
      </div>
 
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">{stat.title}</p>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>
 
      {/* Search and Table Area */}
      <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-transparent bg-slate-50/50 dark:bg-white/5">
          <div className="max-w-md relative">
            <div className="z-10 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
            </div>
            <Input
              className="pl-10 rounded-xl bg-white dark:bg-white/[0.08] h-10 border-slate-200 dark:border-transparent"
              placeholder="Ism, lavozim yoki raqam bo'yicha qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
 
        <Table
          variant="nested"
          columns={[
            { key:'name', label:'F.I.SH.', sortable: true},
            { key:'position', label:'Lavozimi', sortable: true},
            { key:'department', label:"Bo'limi", sortable: true},
            { key:'phone', label:'Telefon raqam', sortable: true},
            { key:'status', label:'Holati', sortable: true},
            { key:'actions', label:''},
          ]}
          data={filtered}
          renderRow={(employee) => (
            <>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-semibold text-slate-900 dark:text-slate-100 sm:pl-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-xs">
                    {employee.name.substring(0, 2).toUpperCase()}
                  </div>
                  {employee.name}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600 dark:text-slate-400 font-medium">{employee.position}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 dark:text-slate-400">{employee.department}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 dark:text-slate-400 font-mono text-sm">{employee.phone}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                  employee.status ==='Faol' ?'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 
                  employee.status ==="Ta'tilda" ?'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' :'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    employee.status ==='Faol' ?'bg-emerald-500' : 
                    employee.status ==="Ta'tilda" ?'bg-amber-500' :'bg-red-500'}`} />
                  {employee.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">
                <div className="flex gap-2 justify-end">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:text-blue-400 transition-colors" title="Tahrirlash">
                    <Edit className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:bg-red-950/50 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:text-red-400 transition-colors"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                </div>
              </td>
            </>
          )}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi xodim qo'shish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <Input
            label="Xodim F.I.SH"
            placeholder="Masalan: Aziz Rahimov"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value})}
            className="rounded-xl"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Lavozim"
              placeholder="Masalan: Sotuvchi"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value})}
              className="rounded-xl"
              required
            />
            <Input
              label="Bo'lim"
              placeholder="Savdo bo'limi"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value})}
              className="rounded-xl"
              required
            />
          </div>
          <Input
            label="Telefon raqami"
            placeholder="+998 90 123 45 67"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value})}
            className="rounded-xl"
            required
          />
          <div>
            <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Holati</label>
            <select
              className="flex h-11 w-full rounded-xl border border-slate-300 dark:border-transparent bg-white dark:bg-white/[0.08] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value})}
            >
              <option value="Faol">Faol</option>
              <option value="Ta'tilda">Ta'tilda</option>
              <option value="Ishdan bo'shatilgan">Ishdan bo'shatilgan</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100 dark:border-transparent">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="rounded-xl px-6">
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
