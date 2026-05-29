import { useState} from'react';
import { ArrowDownLeft, ArrowUpRight, Download, Wallet, DollarSign, Coins, Search} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useFinanceStore} from'../../store/useFinanceStore';
import type { Transaction} from'../../store/useFinanceStore';
import { exportToExcel} from'../../utils/exportToExcel';

export default function Cashbox() {
  const { transactions, addTransaction, getBalance} = useFinanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'Kirim' |'Chiqim'>('Kirim');
  const [search, setSearch] = useState('');
  
  // Form State
  const [form, setForm] = useState({
    amount: 0,
    currency:'UZS',
    rate: 1,
    description:'',
    method:'Naqd'});

  const balanceUzs = getBalance();

  const getCurrencyBalance = (currency: string) => {
    return transactions
      .filter(t => t.currency === currency)
      .reduce((acc, t) => t.type ==='Kirim' ? acc + t.amount : acc - t.amount, 0);};

  const uzsBalance = getCurrencyBalance('UZS');
  const usdBalance = getCurrencyBalance('USD');
  const rubBalance = getCurrencyBalance('RUB');

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.currency.toLowerCase().includes(search.toLowerCase()) ||
    t.method.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (type:'Kirim' |'Chiqim') => {
    setModalType(type);
    setForm({
      amount: 0,
      currency:'UZS',
      rate: 1,
      description:'',
      method:'Naqd'});
    setIsModalOpen(true);};

  const handleCurrencyChange = (currency: string) => {
    let rate = 1;
    if (currency ==='USD') rate = 12850;
    else if (currency ==='RUB') rate = 142;
    else if (currency ==='EUR') rate = 13950;
    
    setForm(prev => ({ ...prev, currency, rate}));};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      amount: Number(form.amount),
      currency: form.currency,
      rate: Number(form.rate),
      description: form.description,
      method: form.method,
      type: modalType});
    setIsModalOpen(false);};

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary-600" />
            Kassa amaliyotlari (Multi-valyuta)
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Kompaniyaning barcha kirim-chiqim operatsiyalari, valyutalar bo'yicha kassa balanslari.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="outline"
            className="rounded-xl h-10 px-4 bg-white border-slate-200 hover:bg-slate-50  :bg-slate-800/50 text-slate-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all"
            onClick={() => exportToExcel(transactions,'Kassa_tranzaksiyalari')}
          >
            <Download className="w-4 h-4 mr-2 text-slate-400" strokeWidth={1.6} /> Excel yuklash
          </Button>
          <Button
            className="rounded-xl h-10 px-4 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all font-semibold text-xs"
            onClick={() => openModal('Chiqim')}
          >
            <ArrowUpRight className="w-4 h-4 mr-2 text-rose-500" strokeWidth={2} /> Chiqim qilish
          </Button>
          <Button 
            className="rounded-xl h-10 px-4 bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all font-semibold text-xs text-white border-transparent" 
            onClick={() => openModal('Kirim')}
          >
            <ArrowDownLeft className="w-4 h-4 mr-2" strokeWidth={2} /> Kirim qilish
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 text-white hover:bg-slate-900 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-6 h-6 text-primary-400" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-400 mb-0.5">Umumiy balans (UZS ekv.)</p>
            <h4 className="text-xl font-bold tracking-tight">
              {balanceUzs.toLocaleString()} <span className="text-[11px] text-slate-400 font-semibold">UZS</span>
            </h4>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Coins className="w-6 h-6 text-blue-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-500 mb-0.5">UZS qoldig'i</p>
            <h4 className="text-lg font-extrabold text-slate-900">
              {uzsBalance.toLocaleString()} <span className="text-xs text-slate-400 font-medium">UZS</span>
            </h4>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-emerald-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-500 mb-0.5">USD qoldig'i</p>
            <h4 className="text-lg font-extrabold text-slate-900">
              {usdBalance.toLocaleString()} <span className="text-xs text-slate-400 font-medium">USD</span>
            </h4>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Coins className="w-6 h-6 text-amber-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-500 mb-0.5">RUB qoldig'i</p>
            <h4 className="text-lg font-extrabold text-slate-900">
              {rubBalance.toLocaleString()} <span className="text-xs text-slate-400 font-medium">RUB</span>
            </h4>
          </div>
        </div>
      </div>

      {/* Table & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white h-10 border-slate-200" placeholder="Izoh, valyuta yoki to'lov usuli bo'yicha qidirish..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'date', label:'Sana'},
            { key:'description', label:'Izoh / Sabab'},
            { key:'method', label:'To\'lov usuli'},
            { key:'amount', label:'Summa'},
          ]}
          data={filtered}
          renderRow={(trx: Transaction) => {
            const amountInUzs = trx.amount * trx.rate;
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[13px] text-slate-500 sm:pl-6">{trx.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-slate-900">{trx.description}</td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border-2 border-[#f1f2f4]">
                    {trx.method}
                  </span>
                </td>
                <td className={`whitespace-nowrap px-3 py-4 text-[14px] font-extrabold ${trx.type ==='Kirim' ?'text-emerald-600' :'text-rose-600'}`}>
                  <div>
                    <span>{trx.type ==='Kirim' ?'+' :'-'}{trx.amount.toLocaleString()} {trx.currency}</span>
                    {trx.currency !=='UZS' && (
                      <span className="text-[11px] text-slate-400 block font-normal mt-0.5">
                        ~ {amountInUzs.toLocaleString()} UZS (kurs: {trx.rate})
                      </span>
                    )}
                  </div>
                </td>
              </>
            );}}
        />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalType ==='Kirim' ?"Kirim operatsiyasi yaratish" :"Chiqim operatsiyasi yaratish"}>
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Valyuta *</label>
              <select value={form.currency} onChange={(e) => handleCurrencyChange(e.target.value)}
                className="w-full h-11 px-3 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" required>
                <option value="UZS">UZS (So'm)</option>
                <option value="USD">USD (Dollar)</option>
                <option value="RUB">RUB (Rubl)</option>
                <option value="EUR">EUR (Yevro)</option>
              </select>
            </div>
            <Input label="Valyuta kursi (UZS da) *" type="number" min={0.01} step="any" value={form.rate ||''}
              onChange={(e) => setForm({ ...form, rate: Number(e.target.value)})} className="rounded-xl font-bold" required disabled={form.currency ==='UZS'} />
          </div>

          <Input label="Summa *" type="number" min={0.01} step="any" placeholder="Summani yozing..." value={form.amount ||''}
            onChange={(e) => setForm({ ...form, amount: Number(e.target.value)})} className="rounded-xl font-extrabold" required />

          <Input label="Izoh / Sabab *" placeholder="Operatsiya maqsadini yozing..." value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value})} className="rounded-xl" required />

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">To'lov usuli</label>
            <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value})}
              className="w-full h-11 px-3 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] focus:outline-none">
              <option value="Naqd">Naqd pul</option>
              <option value="Karta">Plastik karta</option>
              <option value="Pul o'tkazma">Pul o'tkazma (Hisob raqam)</option>
            </select>
          </div>

          {form.currency !=='UZS' && form.amount > 0 && (
            <div className="bg-slate-50 p-3 rounded-xl border-2 border-[#f1f2f4] text-xs font-semibold text-slate-500 flex justify-between">
              <span>Ekvivalenti (UZS):</span>
              <span className="text-slate-800">{(form.amount * form.rate).toLocaleString()} UZS</span>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className={`rounded-xl px-6 ${
              modalType ==='Chiqim' 
                ?'bg-rose-600 hover:bg-rose-700 text-white border-transparent' 
                :'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'}`}>
              Tasdiqlash
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
