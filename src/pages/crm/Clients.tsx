import { useState} from'react';
import { Plus, Search, MessageSquare, Download, Users, TrendingUp, AlertCircle, Wallet} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useCRMStore } from '../../store/useCRMStore';
import { useActivityStore } from '../../store/useActivityStore';
import { exportToExcel } from '../../utils/exportToExcel';

export default function Clients() {
  const { clients, addClient } = useCRMStore();
  const { addActivity } = useActivityStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', status:'Faol', lastPurchase:'-', balance: 0});

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleExport = () => {
    const data = filtered.map(c => ({
      "Mijoz nomi": c.name,
      "Telefon raqami": c.phone,
      "Oxirgi savdo": c.lastPurchase,
      "Balans": c.balance,
      "Holati": c.status
    }));
    exportToExcel(data, 'Mijozlar_Hisoboti');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(form);

    addActivity({
      type: 'client',
      title: "Yangi mijoz qo'shildi",
      description: `${form.name} — ${form.phone}`,
      href: '/crm/clients',
    });

    setForm({ name:'', phone:'', status:'Faol', lastPurchase:'-', balance: 0});
    setIsModalOpen(false);};

  const formatBalance = (balance: number) => {
    if (balance === 0) return'0 UZS';
    const sign = balance > 0 ?'+' :'';
    return`${sign}${balance.toLocaleString()} UZS`;};

  const stats = [
    { title:'Jami Mijozlar', value: clients.length.toString(), icon: Users, color:'text-blue-500 dark:text-blue-400', bg:'bg-blue-50 dark:bg-blue-950/30'},
    { title:'Faol Mijozlar', value: clients.filter(c => c.status ==='Faol').length.toString(), icon: TrendingUp, color:'text-emerald-500 dark:text-emerald-400', bg:'bg-emerald-50 dark:bg-emerald-950/30'},
    { title:"Qora Ro'yxat", value: clients.filter(c => c.status !=='Faol').length.toString(), icon: AlertCircle, color:'text-red-500 dark:text-red-400', bg:'bg-red-50 dark:bg-red-950/30'},
    { title:'Umumiy Qarz', value: formatBalance(clients.filter(c => c.balance < 0).reduce((a, b) => a + b.balance, 0)), icon: Wallet, color:'text-amber-500 dark:text-amber-400', bg:'bg-amber-50 dark:bg-amber-950/30'},
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#20c997]" />
            Mijozlar bazasi
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Barcha mijozlar, ularning qarzdorligi va xaridlar tarixini boshqarish.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="outline"
            className="rounded-xl h-10 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /> Excel yuklash
          </Button>
          <Button 
            variant="outline" 
            className="rounded-xl h-10 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-[#20c997] dark:text-[#20c997]" strokeWidth={1.6} /> SMS xabarnoma
          </Button>
          <Button 
            className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Mijoz qo'shish
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm p-5 rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
          >
            <div className={`w-10 h-10 flex items-center justify-center ${stat.bg} rounded-xl transition-all duration-300 group-hover:scale-105`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.6} />
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">{stat.value}</h4>
              <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
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
              className="pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-full transition-all h-10"
              placeholder="Ism, nom yoki raqam bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'name', label:'Mijoz nomi', sortable: true},
            { key:'phone', label:'Telefon raqam', sortable: true},
            { key:'lastPurchase', label:'Oxirgi savdo', sortable: true},
            { key:'balance', label:'Joriy balans', sortable: true},
            { key:'status', label:'Holati', sortable: true},
          ]}
          data={filtered}
          renderRow={(client) => (
            <>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-semibold text-slate-900 dark:text-slate-100 sm:pl-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-500 dark:text-slate-400 font-medium text-xs">
                    {client.name.substring(0, 2).toUpperCase()}
                  </div>
                  {client.name}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 dark:text-slate-400 font-medium">{client.phone}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 dark:text-slate-400">{client.lastPurchase}</td>
              <td className={`whitespace-nowrap px-3 py-4 text-[14px] font-bold ${
                client.balance < 0 ?'text-red-500 dark:text-red-400' :'text-slate-700 dark:text-slate-300'}`}>
                {formatBalance(client.balance)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${
                  client.status ==='Faol' 
                    ?'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/30' 
                    :'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200/60 dark:border-red-900/30'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${client.status ==='Faol' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {client.status}
                </span>
              </td>
            </>
          )}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi mijoz qo'shish">
        <form onSubmit={handleSubmit} className="space-y-5 p-1">
          <Input
            label="Mijoz ismi yoki Tashkilot nomi"
            placeholder="Masalan: Tohir Murodov"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value})}
            className="rounded-xl"
            required
          />
          <Input
            label="Telefon raqami"
            placeholder="+998 90 123 45 67"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value})}
            className="rounded-xl"
            required
          />
          <div>
            <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mijoz holati</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as 'Faol' | 'Qora ro\'yxat' })}
              className="appearance-none flex h-11 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0f19] pl-4 pr-10 py-2.5 text-[14px] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-sm transition-all bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[position:right_12px_center] bg-no-repeat"
            >
              <option value="Faol" className="bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100">Faol (Yaxshi)</option>
              <option value="Qora ro'yxat" className="bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100">Qora ro'yxat (Qarzdor/Muammoli)</option>
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
