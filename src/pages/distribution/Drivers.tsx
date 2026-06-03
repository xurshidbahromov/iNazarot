import { useState } from 'react';
import { Plus, Search, Truck, Edit2, Trash2, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useDistributionStore } from '../../store/useDistributionStore';
import type { Driver } from '../../store/useDistributionStore';
import { exportToExcel } from '../../utils/exportToExcel';

export default function Drivers() {
  const { drivers, addDriver, deleteDriver } = useDistributionStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicle: '',
    vehicleNumber: '',
    status: 'band_emas' as Driver['status']
  });

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicleNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver({ ...form });
    setIsModalOpen(false);
    setForm({ name: '', phone: '', vehicle: '', vehicleNumber: '', status: 'band_emas' });
  };

  const handleExport = () => {
    const data = filtered.map(d => ({
      "F.I.Sh.": d.name,
      "Telefon": d.phone,
      "Transport vositasi": d.vehicle,
      "Davlat raqami": d.vehicleNumber,
      "Holati": d.status === 'band_emas' ? 'Band emas' : 
                d.status === 'band' ? 'Yo\'lda' : 
                d.status === 'xizmat_safari' ? 'Xizmat safari' : 'Dam olishda'
    }));
    exportToExcel(data, 'Haydovchilar_Royxati');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Truck className="w-6 h-6 text-indigo-500" />
            Haydovchilar va Transportlar
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Yetkazib berish xizmati xodimlari ro'yxati
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button
            variant="outline"
            className="rounded-xl h-10 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm dark:hover:bg-white/10 transition-all duration-150 active:scale-95"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /> Excel yuklash
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            Yangi haydovchi
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-transparent rounded-2xl p-4 shadow-sm">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Ism yoki avtoraqam bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <Table
            variant="nested"
            columns={[
              { key: 'name', label: 'F.I.Sh.' },
              { key: 'phone', label: 'Telefon' },
              { key: 'vehicle', label: 'Transport vositasi' },
              { key: 'status', label: 'Holat' },
              { key: 'actions', label: 'Amallar', className: 'text-right' },
            ]}
            data={filtered}
            renderRow={(driver: Driver) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-xs">
                      {driver.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{driver.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                  {driver.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{driver.vehicle}</div>
                  <div className="text-xs font-bold text-slate-500 mt-0.5 border border-slate-200 dark:border-white/10 rounded px-1.5 py-0.5 inline-block bg-slate-50 dark:bg-white/5">
                    {driver.vehicleNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    driver.status === 'band_emas' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent' : 
                    driver.status === 'band' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent' : 
                    driver.status === 'xizmat_safari' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-transparent' : 
                    'bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-400 dark:border-transparent'
                  }`}>
                    {driver.status === 'band_emas' ? 'Band emas' : 
                     driver.status === 'band' ? 'Band (Yo\'lda)' : 
                     driver.status === 'xizmat_safari' ? 'Xizmat safari' : 'Dam olishda'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteDriver(driver.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        </div>

        {/* Mobile Card Feed */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filtered.map((driver: Driver) => (
            <div 
              key={driver.id} 
              className="bg-white dark:bg-white/[0.02] rounded-2xl p-4 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-4"
            >
              {/* Header: Avatar, Name & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {driver.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 leading-tight">{driver.name}</h4>
                    <a 
                      href={`tel:${driver.phone}`} 
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors inline-block mt-1"
                    >
                      {driver.phone}
                    </a>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                  driver.status === 'band_emas' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent' : 
                  driver.status === 'band' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent' : 
                  driver.status === 'xizmat_safari' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-transparent' : 
                  'bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-400 dark:border-transparent'
                }`}>
                  {driver.status === 'band_emas' ? 'Band emas' : 
                   driver.status === 'band' ? 'Yo\'lda' : 
                   driver.status === 'xizmat_safari' ? 'Xizmat safari' : 'Dam olishda'}
                </span>
              </div>

              {/* Vehicle & Plate details */}
              <div className="flex items-center justify-between bg-slate-50/50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-transparent">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{driver.vehicle}</span>
                </div>
                {/* State car plate representation */}
                <div className="flex items-center border border-slate-300 dark:border-white/15 rounded bg-white dark:bg-slate-900 shadow-sm text-[10px] font-bold select-none h-6">
                  <div className="bg-indigo-600 text-white px-1 h-full flex flex-col items-center justify-center border-r border-slate-200 dark:border-transparent leading-none">
                    <span className="text-[5px] tracking-widest font-normal uppercase opacity-75">UZ</span>
                  </div>
                  <span className="px-2 py-0.5 tracking-wider text-slate-800 dark:text-slate-200 uppercase">{driver.vehicleNumber}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">ID: #{driver.id}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteDriver(driver.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
              Ma'lumot topilmadi
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi haydovchi qo'shish">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">F.I.Sh. *</label>
            <Input
              required
              placeholder="Masalan: Sardor Yo'ldoshev"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Telefon *</label>
            <Input
              required
              placeholder="+998 90 123 45 67"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Transport rusumi *</label>
              <Input
                required
                placeholder="Isuzu, Damas, Labo..."
                value={form.vehicle}
                onChange={e => setForm({ ...form, vehicle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Davlat raqami *</label>
              <Input
                required
                placeholder="01 A 777 AA"
                value={form.vehicleNumber}
                onChange={e => setForm({ ...form, vehicleNumber: e.target.value.toUpperCase() })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Holat</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value as Driver['status'] })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            >
              <option value="band_emas">Band emas</option>
              <option value="band">Band (Yo'lda)</option>
              <option value="xizmat_safari">Xizmat safari</option>
              <option value="dam_olish">Dam olishda</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
