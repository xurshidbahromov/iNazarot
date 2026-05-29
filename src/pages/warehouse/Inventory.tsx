import { useState} from'react';
import { Plus, Search, Clock, MapPin, ClipboardCheck} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useWarehouseStore} from'../../store/useWarehouseStore';

export default function Inventory() {
  const { inventories, addInventory, locations, products} = useWarehouseStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [form, setForm] = useState({ 
    locationId: locations[0]?.id || 0,
    items: [] as { productId: number; expected: number; actual: number}[]});

  const filtered = inventories.filter(i => {
    const loc = locations.find(l => l.id === i.locationId);
    return loc?.name.toLowerCase().includes(search.toLowerCase());});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.locationId) {
      addInventory({
        date: new Date().toISOString(),
        locationId: form.locationId,
        status:'yangi',
        items: products.map(p => ({
          productId: p.id,
          expected: p.stock,
          actual: p.stock}))});
      setIsModalOpen(false);}};

  const getStatusBadge = (status: string) => {
    switch (status) {
      case'yangi': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Yangi</span>;
      case'jarayonda': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Jarayonda</span>;
      case'yakunlangan': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Yakunlangan</span>;
      default: return null;}};

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-primary-600" />
            Inventarizatsiya
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Ombordagi tovarlar qoldig'ini tekshirish va sanash.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button 
            className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Yangi inventarizatsiya
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
              placeholder="Ombor nomi bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'id', label:'ID'},
            { key:'date', label:'Sana'},
            { key:'location', label:'Ombor'},
            { key:'items', label:'Tovarlar soni'},
            { key:'status', label:'Holati'},
          ]}
          data={filtered}
          renderRow={(inv) => {
            const loc = locations.find(l => l.id === inv.locationId);
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-medium text-slate-900 sm:pl-6">
                  INV-{inv.id.toString().slice(-4)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {new Date(inv.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {loc?.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500">
                  {inv.items.length} xil tovar
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {getStatusBadge(inv.status)}
                </td>
              </>
            );}}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi inventarizatsiya yaratish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Qaysi ombor bo'yicha? *
            </label>
            <select
              value={form.locationId}
              onChange={(e) => setForm({ ...form, locationId: Number(e.target.value)})}
              className="w-full h-10 px-3 py-2 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              required
            >
              <option value="">Omborni tanlang</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2">
              Ombordagi mavjud barcha tovarlar ro'yxati avtomatik ravishda inventarizatsiya varag'iga kiritiladi.
            </p>
          </div>
          
          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="rounded-xl px-6" disabled={!form.locationId}>
              Yaratish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
