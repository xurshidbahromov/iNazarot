import { useState} from'react';
import { Plus, Search, MapPin, User} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useWarehouseStore} from'../../store/useWarehouseStore';

export default function Locations() {
  const { locations, addLocation} = useWarehouseStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name:'', address:'', manager:'', status:'faol' as'faol' |'nofaol'});

  const filtered = locations.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.manager.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLocation(form);
    setForm({ name:'', address:'', manager:'', status:'faol'});
    setIsModalOpen(false);};

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-600" />
            Omborlar ro'yxati
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Kompaniyaning barcha omborlarini boshqarish va nazorat qilish.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button 
            className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Ombor yaratish
          </Button>
        </div>
      </div>

      {/* Search and Table Area */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input
              className="pl-10 rounded-xl bg-white h-10"
              placeholder="Ombor nomi yoki mas'ul shaxs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'name', label:'Ombor nomi'},
            { key:'address', label:'Manzil'},
            { key:'manager', label:"Mas'ul xodim"},
            { key:'status', label:'Holati'},
          ]}
          data={filtered}
          renderRow={(location) => (
            <>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-semibold text-slate-900 sm:pl-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <MapPin className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  {location.name}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 font-medium">
                {location.address}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {location.manager}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${
                  location.status ==='faol' 
                    ?'bg-emerald-50 text-emerald-700 border-emerald-200'
                    :'bg-slate-50 text-slate-700 border-slate-200'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    location.status ==='faol' ?'bg-emerald-500' :'bg-slate-500'}`} />
                  {location.status ==='faol' ?'Faol' :'Nofaol'}
                </span>
              </td>
            </>
          )}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi ombor yaratish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <Input
            label="Ombor nomi *"
            placeholder="Masalan: Asosiy ombor"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value})}
            className="rounded-xl"
            required
          />
          <Input
            label="Manzil"
            placeholder="Shahar/viloyat; tuman; ko'cha..."
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value})}
            className="rounded-xl"
          />
          <Input
            label="Mas'ul xodim *"
            placeholder="Xodim FISH"
            value={form.manager}
            onChange={(e) => setForm({ ...form, manager: e.target.value})}
            className="rounded-xl"
            required
          />
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Holati
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as'faol' |'nofaol'})}
              className="w-full h-10 px-3 py-2 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
            >
              <option value="faol">Faol</option>
              <option value="nofaol">Nofaol</option>
            </select>
          </div>
          
          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
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
