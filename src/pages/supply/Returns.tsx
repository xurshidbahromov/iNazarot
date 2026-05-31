import { useState} from'react';
import { Plus, Search, RotateCcw, Package} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';

interface ReturnItem {
  id: number;
  date: string;
  supplier: string;
  product: string;
  quantity: number;
  reason: string;
  amount: number;
  status:'kutilmoqda' |'qabul_qilindi' |'bekor_qilingan';}

const mockReturns: ReturnItem[] = [
  { id: 1, date:'2026-05-18', supplier:'Toshkent Savdo', product:'Sement M-400 (yaroqsiz)', quantity: 10, reason:'Muddati o\'tgan', amount: 450000, status:'qabul_qilindi'},
  { id: 2, date:'2026-05-22', supplier:'Mega Trade', product:'Armatura 12mm (egri)', quantity: 50, reason:'Sifatsiz mahsulot', amount: 325000, status:'kutilmoqda'},
];

const statusMap: Record<string, { label: string; cls: string}> = {
  kutilmoqda: { label:'Kutilmoqda', cls:'bg-amber-50 text-amber-700 border-amber-200'},
  qabul_qilindi: { label:'Qabul qilindi', cls:'bg-emerald-50 text-emerald-700 border-emerald-200'},
  bekor_qilingan: { label:'Bekor qilingan', cls:'bg-red-50 text-red-700 border-red-200'},};

export default function Returns() {
  const [returns, setReturns] = useState<ReturnItem[]>(mockReturns);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ supplier:'', product:'', quantity: 1, reason:'', amount: 0});

  const filtered = returns.filter(r =>
    r.supplier.toLowerCase().includes(search.toLowerCase()) ||
    r.product.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReturns(prev => [...prev, {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      ...form,
      status:'kutilmoqda'}]);
    setForm({ supplier:'', product:'', quantity: 1, reason:'', amount: 0});
    setIsModalOpen(false);};

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-primary-600" />
            Qaytarishlar
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">Yetkazib beruvchiga qaytarilgan tovarlarni qayd etish.</p>
        </div>
        <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Qaytarish yaratish
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-6 h-6 text-red-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Jami qaytarishlar</p>
            <h4 className="text-xl font-bold text-slate-900">{returns.length} <span className="text-xs font-medium text-slate-400">ta</span></h4>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-amber-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Kutilmoqda</p>
            <h4 className="text-xl font-bold text-amber-600">{returns.filter(r => r.status ==='kutilmoqda').length} <span className="text-xs font-medium text-slate-400">ta</span></h4>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-6 h-6 text-emerald-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Qaytarilgan summa</p>
            <h4 className="text-xl font-bold text-emerald-600">{(returns.reduce((a, r) => a + r.amount, 0) / 1000).toFixed(0)}K <span className="text-sm font-medium text-slate-500">UZS</span></h4>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white h-10" placeholder="Yetkazib beruvchi yoki mahsulot..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <Table variant="nested"
          columns={[
            { key:'date', label:'Sana'},
            { key:'supplier', label:'Yetkazib beruvchi'},
            { key:'product', label:'Mahsulot'},
            { key:'quantity', label:'Miqdor'},
            { key:'reason', label:'Sabab'},
            { key:'amount', label:'Summa'},
            { key:'status', label:'Holati'},
          ]}
          data={filtered}
          renderRow={(ret) => (
            <>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] text-slate-500 sm:pl-6">{ret.date}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-slate-900">{ret.supplier}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600">{ret.product}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-800">{ret.quantity}</td>
              <td className="px-3 py-4 text-[14px] text-slate-500 max-w-[150px] truncate">{ret.reason}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-700">{ret.amount.toLocaleString()} <span className="text-[12px] text-slate-400 font-medium">UZS</span></td>
              <td className="whitespace-nowrap px-3 py-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${statusMap[ret.status].cls}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />{statusMap[ret.status].label}
                </span>
              </td>
            </>
          )}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Qaytarish yaratish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <Input label="Yetkazib beruvchi *" placeholder="Masalan: Toshkent Savdo" value={form.supplier}
            onChange={(e) => setForm({ ...form, supplier: e.target.value})} className="rounded-xl" required />
          <Input label="Mahsulot nomi *" placeholder="Qaytarilayotgan mahsulot" value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value})} className="rounded-xl" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Miqdor *" type="number" min={1} value={form.quantity ||''}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value)})} className="rounded-xl" required />
            <Input label="Summa (UZS)" type="number" value={form.amount ||''}
              onChange={(e) => setForm({ ...form, amount: Number(e.target.value)})} className="rounded-xl" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Qaytarish sababi *</label>
            <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value})}
              placeholder="Sifatsiz, muddati o'tgan, noto'g'ri yetkazilgan..."
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none" rows={3} required />
          </div>
          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
