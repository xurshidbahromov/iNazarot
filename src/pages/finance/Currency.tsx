import { useState} from'react';
import { Plus, Search, DollarSign, ArrowLeftRight, TrendingUp, TrendingDown, Clock, Calendar, CheckCircle2, AlertCircle, Edit3} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';

interface CurrencyRate {
  id: number;
  code: string;
  name: string;
  symbol: string;
  rate: number;
  previousRate: number;
  updatedAt: string;
  isActive: boolean;}

const mockCurrencies: CurrencyRate[] = [
  { id: 1, code:'USD', name:'AQSH Dollari', symbol:'$', rate: 12850, previousRate: 12820, updatedAt:'2026-05-27 10:00', isActive: true},
  { id: 2, code:'EUR', name:'Yevro', symbol:'€', rate: 13950, previousRate: 14000, updatedAt:'2026-05-27 10:00', isActive: true},
  { id: 3, code:'RUB', name:'Rossiya Rubli', symbol:'₽', rate: 142, previousRate: 140, updatedAt:'2026-05-27 10:00', isActive: true},
  { id: 4, code:'KZT', name:'Qozog\'iston Tengesi', symbol:'₸', rate: 28.5, previousRate: 28.8, updatedAt:'2026-05-27 10:00', isActive: true},
];

export default function Currency() {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(mockCurrencies);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRate | null>(null);

  // Form states
  const [form, setForm] = useState({
    code:'',
    name:'',
    symbol:'',
    rate: 0,
    isActive: true,});

  // Converter states
  const [convAmount, setConvAmount] = useState<number>(100);
  const [convFrom, setConvFrom] = useState<string>('USD');
  const [convTo, setConvTo] = useState<string>('UZS');
  const [convResult, setConvResult] = useState<number>(1285000);

  const handleCalculate = (amount: number, from: string, to: string) => {
    let amountInUzs = amount;
    
    if (from !=='UZS') {
      const fromCurr = currencies.find(c => c.code === from);
      if (fromCurr) {
        amountInUzs = amount * fromCurr.rate;}}

    let finalAmount = amountInUzs;
    if (to !=='UZS') {
      const toCurr = currencies.find(c => c.code === to);
      if (toCurr && toCurr.rate > 0) {
        finalAmount = amountInUzs / toCurr.rate;}}
    
    setConvResult(finalAmount);};

  const handleAmountChange = (val: number) => {
    setConvAmount(val);
    handleCalculate(val, convFrom, convTo);};

  const handleFromChange = (val: string) => {
    setConvFrom(val);
    handleCalculate(convAmount, val, convTo);};

  const handleToChange = (val: string) => {
    setConvTo(val);
    handleCalculate(convAmount, convFrom, val);};

  const handleSwap = () => {
    const temp = convFrom;
    setConvFrom(convTo);
    setConvTo(temp);
    handleCalculate(convAmount, convTo, temp);};

  const filtered = currencies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCurrency) {
      // Edit
      setCurrencies(prev => prev.map(c => c.id === selectedCurrency.id ? {
        ...c,
        code: form.code.toUpperCase(),
        name: form.name,
        symbol: form.symbol,
        previousRate: c.rate,
        rate: Number(form.rate),
        isActive: form.isActive,
        updatedAt: new Date().toISOString().slice(0, 16).replace('T','')} : c));} else {
      // Add new
      setCurrencies(prev => [...prev, {
        id: Date.now(),
        code: form.code.toUpperCase(),
        name: form.name,
        symbol: form.symbol,
        rate: Number(form.rate),
        previousRate: Number(form.rate),
        updatedAt: new Date().toISOString().slice(0, 16).replace('T',''),
        isActive: form.isActive}]);}
    closeFormModal();};

  const openEditModal = (currency: CurrencyRate) => {
    setSelectedCurrency(currency);
    setForm({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      rate: currency.rate,
      isActive: currency.isActive});
    setIsModalOpen(true);};

  const openAddModal = () => {
    setSelectedCurrency(null);
    setForm({
      code:'',
      name:'',
      symbol:'',
      rate: 0,
      isActive: true});
    setIsModalOpen(true);};

  const closeFormModal = () => {
    setIsModalOpen(false);
    setSelectedCurrency(null);};

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#20c997]" />
            Valyuta kurslari boshqaruvi
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Tizimdagi chet el valyutalari kurslarini yangilash va hisob-kitob qilish.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-10 px-4 flex items-center gap-2 border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-white/5  :bg-slate-800/50" onClick={() => setIsConverterOpen(true)}>
            <ArrowLeftRight className="w-4 h-4" /> Kalkulyator
          </Button>
          <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]" onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Kurs qo'shish
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {currencies.slice(0, 4).map(c => {
          const diff = c.rate - c.previousRate;
          const isUp = diff > 0;
          return (
            <div key={c.id} className="group bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/60 dark:border-white/5 p-5 rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-[15px]">{c.code} / UZS</span>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded uppercase">{c.symbol}</span>
                  </div>
                  {diff !== 0 ? (
                    <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isUp ?'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700' :'bg-rose-50 dark:bg-rose-950/50 text-rose-700'}`}>
                      {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {parseFloat(Math.abs(diff).toFixed(4))} UZS
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      O'zgarishsiz
                    </span>
                  )}
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {c.rate.toLocaleString()} <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">UZS</span>
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 mt-4 border-t border-slate-100 dark:border-transparent pt-2.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{c.updatedAt} da yangilandi</span>
              </div>
            </div>
          );})}
      </div>

      {/* Filter and Content */}
      <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] dark:border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-transparent bg-slate-50/50 dark:bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md relative flex-1">
            <div className="z-10 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white dark:bg-white/[0.08] h-10 border-slate-200 dark:border-transparent" placeholder="Valyuta nomi yoki kodini yozing..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Bugungi kurslar: {new Date().toLocaleDateString('uz-UZ')} holatiga</span>
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'code', label:'Valyuta kodi'},
            { key:'name', label:'Nomi'},
            { key:'rate', label:'Kurs qiymati (UZS)'},
            { key:'diff', label:'O\'zgarish'},
            { key:'updatedAt', label:'Oxirgi yangilanish'},
            { key:'status', label:'Holati'},
            { key:'actions', label:'Amallar', className:'text-right'},
          ]}
          data={filtered}
          renderRow={(currency) => {
            const diff = currency.rate - currency.previousRate;
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-bold text-slate-900 dark:text-slate-100 sm:pl-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center font-bold text-[13px] text-primary-600">
                      {currency.code}
                    </div>
                    <span>{currency.code}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-medium text-slate-600 dark:text-slate-400">{currency.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                  {currency.rate.toLocaleString()} <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">UZS</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px]">
                  {diff > 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +{parseFloat(Math.abs(diff).toFixed(4))}
                    </span>
                  ) : diff < 0 ? (
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" /> -{parseFloat(Math.abs(diff).toFixed(4))}
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 font-medium">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[13px] text-slate-500 dark:text-slate-400">{currency.updatedAt}</td>
                <td className="whitespace-nowrap px-3 py-4">
                  {currency.isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Faol
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <AlertCircle className="w-3.5 h-3.5" /> Nofaol
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right text-[13px] font-medium">
                  <Button variant="outline" size="sm" className="h-8 px-2 rounded-lg text-slate-600 dark:text-slate-400 border-slate-200 dark:border-transparent hover:bg-slate-50 dark:bg-white/5  :bg-slate-800/50" onClick={() => openEditModal(currency)}>
                    <Edit3 className="w-3.5 h-3.5 mr-1" /> Tahrirlash
                  </Button>
                </td>
              </>
            );}}
        />
      </div>

      {/* Currency Converter Modal */}
      <Modal isOpen={isConverterOpen} onClose={() => setIsConverterOpen(false)} title="Valyuta konvertori">
        <div className="space-y-5 p-1">
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-transparent flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold">
              <span>Mavjud valyutalar kurslari asosida hisoblanadi.</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-3">
              {/* From */}
              <div className="sm:col-span-3 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Qaysi valyutadan</label>
                <div className="flex rounded-xl border border-slate-300 dark:border-transparent overflow-hidden bg-white dark:bg-white/[0.08]">
                  <input type="number" value={convAmount ||''} onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="flex-1 min-w-0 border-0 px-3 py-2 text-[15px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none" />
                  <select value={convFrom} onChange={(e) => handleFromChange(e.target.value)}
                    className="bg-slate-100 dark:bg-white/[0.06] border-l border-slate-300 dark:border-transparent px-3 text-[14px] font-bold text-slate-700 dark:text-slate-300 focus:outline-none">
                    <option value="UZS">UZS</option>
                    {currencies.map(c => <option key={c.id} value={c.code}>{c.code}</option>)}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center sm:col-span-1 pt-4 sm:pt-0">
                <button type="button" onClick={handleSwap}
                  className="w-10 h-10 rounded-full border-2 border-[#f1f2f4] dark:border-transparent bg-white dark:bg-white/[0.08] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-white/5  :bg-slate-800/50 hover:text-slate-700 dark:text-slate-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-colors">
                  <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0" />
                </button>
              </div>

              {/* To */}
              <div className="sm:col-span-3 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Qaysi valyutaga</label>
                <div className="flex rounded-xl border border-slate-300 dark:border-transparent overflow-hidden bg-white dark:bg-white/[0.08]">
                  <input type="text" readOnly value={convResult.toLocaleString(undefined, { maximumFractionDigits: 2})}
                    className="flex-1 min-w-0 border-0 px-3 py-2 text-[15px] font-extrabold text-primary-600 bg-slate-50/50 dark:bg-white/5 focus:outline-none" />
                  <select value={convTo} onChange={(e) => handleToChange(e.target.value)}
                    className="bg-slate-100 dark:bg-white/[0.06] border-l border-slate-300 dark:border-transparent px-3 text-[14px] font-bold text-slate-700 dark:text-slate-300 focus:outline-none">
                    <option value="UZS">UZS</option>
                    {currencies.map(c => <option key={c.id} value={c.code}>{c.code}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-transparent">
            <Button type="button" className="rounded-xl px-6" onClick={() => setIsConverterOpen(false)}>Yopish</Button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeFormModal} title={selectedCurrency ?"Valyuta kursini tahrirlash" :"Yangi valyuta qo'shish"}>
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Valyuta kodi *" placeholder="Masalan: USD, EUR, RUB" value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value})} className="rounded-xl uppercase font-bold" required disabled={!!selectedCurrency} />
            <Input label="Belgisi *" placeholder="Masalan: $, €, ₽" value={form.symbol}
              onChange={(e) => setForm({ ...form, symbol: e.target.value})} className="rounded-xl font-bold" required />
          </div>
          <Input label="Valyuta nomi *" placeholder="Masalan: AQSH Dollari" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value})} className="rounded-xl" required />
          <div>
            <Input label="Kurs qiymati (UZS da) *" type="number" min={0.01} step="any" value={form.rate ||''}
              onChange={(e) => setForm({ ...form, rate: Number(e.target.value)})} className="rounded-xl font-extrabold" required />
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">1 birlik valyutaning o'zbek so'midagi ekvivalenti.</p>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked})}
              className="w-4 h-4 text-primary-600 border-slate-300 dark:border-transparent rounded focus:ring-primary-500" />
            <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 dark:text-slate-300 select-none cursor-pointer">
              Ushbu valyuta faol (Tizim bo'yicha amalda qo'llanilsin)
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100 dark:border-transparent">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={closeFormModal}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
