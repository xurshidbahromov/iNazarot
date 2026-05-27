import { useState } from 'react';
import { ShoppingBag, Plus, Search, Truck, Clock, CheckCircle, XCircle, Eye, DollarSign, Calendar, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useSupplyStore } from '../../store/useSupplyStore';

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType; border: string }> = {
  "To'langan": { label: "To'langan", color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle },
  "Qisman to'langan": { label: "Qisman to'langan", color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
  "To'lanmagan": { label: "To'lanmagan", color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
  pending: { label: 'Kutilmoqda', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', icon: Clock },
  received: { label: 'Qabul qilindi', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle },
};

export default function Purchases() {
  const { purchases, addPurchase, suppliers } = useSupplyStore();
  const [search, setSearch] = useState('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);

  // Form State
  const [form, setForm] = useState({
    supplier: '',
    itemsCount: 1,
    total: 0,
    additionalExpense: 0,
    status: "To'langan"
  });

  const filtered = purchases.filter(p =>
    p.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = purchases.reduce((a, p) => a + p.total, 0);
  const totalAdditionalExpense = purchases.reduce((a, p) => a + (p.additionalExpense || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.supplier) return;

    addPurchase({
      supplier: form.supplier,
      items: Number(form.itemsCount),
      total: Number(form.total),
      additionalExpense: Number(form.additionalExpense),
      status: form.status
    });

    setForm({
      supplier: '',
      itemsCount: 1,
      total: 0,
      additionalExpense: 0,
      status: "To'langan"
    });
    setIsAddModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDetails = (purchase: any) => {
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary-600" />
            Xaridlar tarixi
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Yetkazib beruvchilardan qilingan barcha xaridlar, to'lovlar va qo'shimcha transport xarajatlari.
          </p>
        </div>
        <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-sm" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Yangi xarid
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-6 h-6 text-slate-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Jami xaridlar soni</p>
            <h4 className="text-xl font-bold text-slate-900">
              {purchases.length} ta
            </h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-emerald-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Jami tovarlar qiymati</p>
            <h4 className="text-xl font-bold text-emerald-600">
              {totalValue.toLocaleString()} UZS
            </h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-indigo-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Jami transport/qo'shimcha</p>
            <h4 className="text-xl font-bold text-indigo-600">
              {totalAdditionalExpense.toLocaleString()} UZS
            </h4>
          </div>
        </div>
      </div>

      {/* Search and Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white h-10 border-slate-200" placeholder="Yetkazib beruvchi nomi bo'yicha qidiring..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key: 'date', label: 'Sana' },
            { key: 'supplier', label: 'Yetkazib beruvchi' },
            { key: 'items', label: 'Mahsulotlar' },
            { key: 'total', label: 'Tovar summasi' },
            { key: 'additionalExpense', label: 'Qo\'shimcha xarajat' },
            { key: 'status', label: 'To\'lov holati' },
            { key: 'actions', label: 'Amallar', className: 'text-right' },
          ]}
          data={filtered}
          renderRow={(purchase) => {
            const status = statusConfig[purchase.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[13px] text-slate-500 sm:pl-6">{purchase.date}</td>
                <td className="whitespace-nowrap px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-[12px] text-indigo-600">
                      {purchase.supplier.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[14px] font-semibold text-slate-900">{purchase.supplier}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-medium text-slate-600">{purchase.items} xil tovar</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-800">
                  {purchase.total.toLocaleString()} <span className="text-[11px] text-slate-400 font-normal">UZS</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-indigo-600">
                  {(purchase.additionalExpense || 0) > 0 ? (
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-indigo-400" />
                      {(purchase.additionalExpense ?? 0).toLocaleString()} UZS
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${status.bg} ${status.color} ${status.border}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right text-[13px] font-medium">
                  <Button variant="outline" size="sm" className="h-8 px-2 rounded-lg text-slate-600 border-slate-200 hover:bg-slate-50" onClick={() => handleViewDetails(purchase)}>
                    <Eye className="w-3.5 h-3.5 mr-1" /> Tafsilot
                  </Button>
                </td>
              </>
            );
          }}
        />
      </div>

      {/* Add Purchase Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Yangi xarid rasmiylashtirish">
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Yetkazib beruvchi *</label>
            <select value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              className="w-full h-11 px-3 bg-white border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" required>
              <option value="">Yetkazib beruvchini tanlang...</option>
              {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Tovarlar xillari soni" type="number" min={1} value={form.itemsCount || ''}
              onChange={(e) => setForm({ ...form, itemsCount: Number(e.target.value) })} className="rounded-xl font-bold" required />
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">To'lov holati</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full h-11 px-3 bg-white border border-slate-300 rounded-xl text-[14px] focus:outline-none">
                <option value="To'langan">To'langan</option>
                <option value="Qisman to'langan">Qisman to'langan</option>
                <option value="To'lanmagan">To'lanmagan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Tovar summasi (UZS) *" type="number" min={1} value={form.total || ''}
              onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} className="rounded-xl font-extrabold" required />
            <Input label="Qo'shimcha xarajatlar (UZS)" type="number" min={0} value={form.additionalExpense || ''}
              onChange={(e) => setForm({ ...form, additionalExpense: Number(e.target.value) })} className="rounded-xl font-extrabold" />
          </div>
          <p className="text-[11px] text-slate-400">Qo'shimcha xarajatlar (masalan: yo'l haqi, transport, yuklash) tovar tannarxini hisoblashda inobatga olinadi.</p>

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsAddModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6">Xaridni saqlash</Button>
          </div>
        </form>
      </Modal>

      {/* Details View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Xarid tafsilotlari">
        {selectedPurchase && (
          <div className="space-y-5 p-1">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-black text-slate-900">Xarid tranzaksiyasi</h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedPurchase.date}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border ${
                statusConfig[selectedPurchase.status]?.bg || 'bg-slate-100'
              } ${statusConfig[selectedPurchase.status]?.color || 'text-slate-600'} ${statusConfig[selectedPurchase.status]?.border || 'border-slate-200'}`}>
                {selectedPurchase.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Yetkazib beruvchi</h5>
                <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                    {selectedPurchase.supplier.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-900">{selectedPurchase.supplier}</h6>
                    <p className="text-xs text-slate-400 mt-0.5">Xarid qilingan tovarlar soni: {selectedPurchase.items} xil</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Moliyaviy hisobot</h5>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Tovar umumiy summasi:</span>
                    <span className="text-slate-800">{selectedPurchase.total.toLocaleString()} UZS</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Qo'shimcha / Transport xarajati:</span>
                    <span className="text-indigo-600">+{(selectedPurchase.additionalExpense || 0).toLocaleString()} UZS</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Jami Xarid Summasi:</span>
                    <span>{(selectedPurchase.total + (selectedPurchase.additionalExpense || 0)).toLocaleString()} UZS</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
                <h6 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Eslatma:
                </h6>
                <p className="text-xs text-amber-700 leading-relaxed font-medium">Qo'shimcha xarajatlar tovarning haqiqiy tannarxiga (landed cost) qo'shib hisoblanishi lozim.</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button type="button" className="rounded-xl px-6" onClick={() => setIsViewModalOpen(false)}>Yopish</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
