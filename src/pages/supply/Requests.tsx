import { useState} from'react';
import { Plus, Search, FileText} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useWarehouseStore} from'../../store/useWarehouseStore';

interface Request {
  id: number;
  date: string;
  product: string;
  quantity: number;
  unit: string;
  reason: string;
  status:'yangi' |'korib_chiqilmoqda' |'tasdiqlangan' |'bekor_qilingan';}

const mockRequests: Request[] = [
  { id: 1, date:'2026-05-20', product:'Sement M-400', quantity: 50, unit:'qop', reason:'Qurilish uchun', status:'tasdiqlangan'},
  { id: 2, date:'2026-05-23', product:'Armatura 12mm', quantity: 200, unit:'metr', reason:'Loyiha A uchun', status:'korib_chiqilmoqda'},
  { id: 3, date:'2026-05-25', product:'Gipskarton', quantity: 30, unit:'dona', reason:'Devor qoplash', status:'yangi'},
];

const statusMap: Record<string, { label: string; cls: string}> = {
  yangi: { label:'Yangi', cls:'bg-blue-50 text-blue-700 border-blue-200'},
  korib_chiqilmoqda: { label:"Ko'rib chiqilmoqda", cls:'bg-amber-50 text-amber-700 border-amber-200'},
  tasdiqlangan: { label:'Tasdiqlangan', cls:'bg-emerald-50 text-emerald-700 border-emerald-200'},
  bekor_qilingan: { label:'Bekor qilingan', cls:'bg-red-50 text-red-700 border-red-200'},};

export default function Requests() {
  const { products} = useWarehouseStore();
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ product:'', quantity: 1, unit:'dona', reason:''});

  const filtered = requests.filter(r =>
    r.product.toLowerCase().includes(search.toLowerCase()) ||
    r.reason.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests(prev => [...prev, {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      ...form,
      status:'yangi'}]);
    setForm({ product:'', quantity: 1, unit:'dona', reason:''});
    setIsModalOpen(false);};

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" />
            Sotib olish so'rovlari
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">Xodimlardan kelgan xarid so'rovnomalarini boshqarish.</p>
        </div>
        <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> So'rov yaratish
        </Button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white h-10" placeholder="Mahsulot nomi yoki sabab..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'date', label:'Sana'},
            { key:'product', label:'Mahsulot'},
            { key:'quantity', label:'Miqdor'},
            { key:'reason', label:'Sabab'},
            { key:'status', label:'Holati'},
          ]}
          data={filtered}
          renderRow={(req) => (
            <>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] text-slate-500 sm:pl-6">{req.date}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-slate-900">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  {req.product}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-800">
                {req.quantity} <span className="text-[12px] text-slate-400 font-normal">{req.unit}</span>
              </td>
              <td className="px-3 py-4 text-[14px] text-slate-500 max-w-[200px] truncate">{req.reason}</td>
              <td className="whitespace-nowrap px-3 py-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${statusMap[req.status].cls}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {statusMap[req.status].label}
                </span>
              </td>
            </>
          )}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi so'rovnoma yaratish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Mahsulot nomi *</label>
            <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value})}
              className="w-full h-10 px-3 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" required>
              <option value="">Tanlang yoki qidiring...</option>
              {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Miqdor *" type="number" min={1} value={form.quantity ||''}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value)})} className="rounded-xl" required />
            <Input label="O'lchov birligi *" placeholder="dona, kg, qop..." value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value})} className="rounded-xl" required />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Sabab / Izoh</label>
            <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value})}
              placeholder="Nima uchun kerak ekanligi haqida qisqacha yozing..."
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
              rows={3} />
          </div>
          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6">Yuborish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
