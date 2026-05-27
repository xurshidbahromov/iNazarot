import { useState } from 'react';
import { Plus, Search, ArrowRightLeft, MapPin, Package } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useWarehouseStore } from '../../store/useWarehouseStore';

export default function Transfers() {
  const { transfers, addTransfer, locations, products } = useWarehouseStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    fromLocationId: locations[0]?.id || 0,
    toLocationId: locations[1]?.id || 0,
    productId: products[0]?.id || 0,
    quantity: 1,
  });

  const filtered = transfers.filter(t => {
    const from = locations.find(l => l.id === t.fromLocationId);
    const to = locations.find(l => l.id === t.toLocationId);
    const prod = products.find(p => p.id === t.productId);
    return (
      from?.name.toLowerCase().includes(search.toLowerCase()) ||
      to?.name.toLowerCase().includes(search.toLowerCase()) ||
      prod?.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.fromLocationId === form.toLocationId) {
      alert("Qayerdan va qayerga bir xil bo'lmasin!");
      return;
    }
    addTransfer({ ...form, date: new Date().toISOString(), status: 'kutilmoqda' });
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'kutilmoqda': return (
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border bg-amber-50 text-amber-700 border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Kutilmoqda
        </span>
      );
      case 'tasdiqlangan': return (
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Tasdiqlangan
        </span>
      );
      case 'bekor_qilingan': return (
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border bg-red-50 text-red-700 border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Bekor qilingan
        </span>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Ichki ko'chirishlar</h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Tovarlarni omborlar o'rtasida ko'chirish va qayd etish.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button
            className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-sm transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Ko'chirish yaratish
          </Button>
        </div>
      </div>

      {/* Search and Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input
              className="pl-10 rounded-xl bg-white h-10"
              placeholder="Ombor nomi yoki mahsulot..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key: 'date', label: 'Sana' },
            { key: 'product', label: 'Mahsulot' },
            { key: 'route', label: "Yo'nalish" },
            { key: 'quantity', label: 'Miqdor' },
            { key: 'status', label: 'Holati' },
          ]}
          data={filtered}
          renderRow={(transfer) => {
            const from = locations.find(l => l.id === transfer.fromLocationId);
            const to = locations.find(l => l.id === transfer.toLocationId);
            const prod = products.find(p => p.id === transfer.productId);
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] text-slate-500 sm:pl-6">
                  {new Date(transfer.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Package className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    {prod?.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{from?.name}</span>
                    <ArrowRightLeft className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-slate-700 font-medium">{to?.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-800">
                  {transfer.quantity} <span className="text-[12px] text-slate-400 font-normal">{prod?.unit}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  {getStatusBadge(transfer.status)}
                </td>
              </>
            );
          }}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi ko'chirish yaratish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Mahsulot *</label>
            <select
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: Number(e.target.value) })}
              className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              required
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} (qoldiq: {p.stock} {p.unit})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Qayerdan *</span>
              </label>
              <select
                value={form.fromLocationId}
                onChange={(e) => setForm({ ...form, fromLocationId: Number(e.target.value) })}
                className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                required
              >
                {locations.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary-500" /> Qayerga *</span>
              </label>
              <select
                value={form.toLocationId}
                onChange={(e) => setForm({ ...form, toLocationId: Number(e.target.value) })}
                className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                required
              >
                {locations.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>
          <Input
            label="Miqdor *"
            type="number"
            placeholder="100"
            min={1}
            value={form.quantity || ''}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            className="rounded-xl"
            required
          />
          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="rounded-xl px-6">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
