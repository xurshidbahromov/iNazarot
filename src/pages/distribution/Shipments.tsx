import { useState } from 'react';
import { Truck, MapPin, Search, Package, Clock, CheckCircle2, Navigation, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useDistributionStore } from '../../store/useDistributionStore';
import type { Shipment } from '../../store/useDistributionStore';
import { useCRMStore } from '../../store/useCRMStore';
import { exportToExcel } from '../../utils/exportToExcel';

export default function Shipments() {
  const { shipments, addShipment, updateShipmentStatus, drivers, updateDriver } = useDistributionStore();
  const { orders, updateOrderStatus } = useCRMStore();
  
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    orderId: '',
    driverId: '',
    destination: '',
    totalVolume: '',
    notes: ''
  });

  const filtered = shipments.filter(s =>
    s.shipmentNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.destination.toLowerCase().includes(search.toLowerCase())
  );

  const pendingOrders = orders.filter(o => o.status === 'yangi' || o.status === 'tayyorlanmoqda');
  const availableDrivers = drivers.filter(d => d.status === 'band_emas');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.driverId || !form.destination) return;

    addShipment({
      orderId: form.orderId ? Number(form.orderId) : undefined,
      driverId: Number(form.driverId),
      destination: form.destination,
      totalVolume: form.totalVolume,
      notes: form.notes,
      status: 'kutmoqda',
      startDate: new Date().toISOString().split('T')[0]
    });

    if (form.orderId) {
      updateOrderStatus(Number(form.orderId), 'yetkazilmoqda');
    }
    updateDriver(Number(form.driverId), { status: 'band' });

    setIsModalOpen(false);
    setForm({ orderId: '', driverId: '', destination: '', totalVolume: '', notes: '' });
  };

  const handleStatusChange = (shipment: Shipment, status: Shipment['status']) => {
    updateShipmentStatus(shipment.id, status);
    
    if (status === 'yetkazildi' || status === 'qaytarildi') {
      updateDriver(shipment.driverId, { status: 'band_emas' });
      if (shipment.orderId) {
        updateOrderStatus(shipment.orderId, status === 'yetkazildi' ? 'yakunlandi' : 'bekor_qilingan');
      }
    }
  };

  const handleExport = () => {
    const data = filtered.map(s => {
      const driver = drivers.find(d => d.id === s.driverId);
      return {
        "Jo'natma No": s.shipmentNumber,
        "Manzil": s.destination,
        "Yuk hajmi": s.totalVolume,
        "Haydovchi": driver?.name || 'Noma\'lum',
        "Transport raqami": driver?.vehicleNumber || '-',
        "Sana": s.startDate,
        "Holati": s.status,
        "Izoh": s.notes || '-'
      };
    });
    exportToExcel(data, 'Yuklar_Yetkazish_Hisoboti');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-500" />
            Yetkazib Berish (Dostavka)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Mijozlarga va filiallarga jo'natilgan tovarlarni kuzatish
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
            <Navigation className="w-4 h-4" />
            Yangi jo'natma
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-transparent rounded-2xl p-4 shadow-sm">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Jo'natma raqami yoki manzil bo'yicha qidirish..."
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
              { key: 'shipmentNumber', label: 'Jo\'natma No' },
              { key: 'driver', label: 'Haydovchi' },
              { key: 'destination', label: 'Manzil' },
              { key: 'status', label: 'Holat' },
              { key: 'dates', label: 'Sana' },
              { key: 'actions', label: 'Amallar', className: 'text-right' },
            ]}
            data={filtered}
            renderRow={(shipment: Shipment) => {
              const driver = drivers.find(d => d.id === shipment.driverId);
              return (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{shipment.shipmentNumber}</span>
                      <span className="text-xs text-slate-500">{shipment.totalVolume}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {driver?.name || 'Noma\'lum'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 ml-6">{driver?.vehicleNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400" />
                      {shipment.destination}
                    </div>
                    {shipment.orderId && (
                      <div className="text-xs font-medium text-emerald-600 mt-1 ml-6">
                        Buyurtma (CRM) ID: {shipment.orderId}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      shipment.status === 'yetkazildi' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent' : 
                      shipment.status === 'yolda' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-transparent' : 
                      shipment.status === 'kutmoqda' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent' :
                      'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-transparent'
                    }`}>
                      {shipment.status === 'yetkazildi' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {shipment.status === 'yolda' && <Navigation className="w-3 h-3 mr-1" />}
                      {shipment.status === 'kutmoqda' && <Clock className="w-3 h-3 mr-1" />}
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1).replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    Jo'natildi: {shipment.startDate}
                    {shipment.endDate && <div className="text-emerald-600 mt-0.5">Yetkazildi: {shipment.endDate}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {shipment.status === 'kutmoqda' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(shipment, 'yolda')} className="text-blue-600 hover:bg-blue-50 mr-2">
                        Yo'lga chiqish
                      </Button>
                    )}
                    {shipment.status === 'yolda' && (
                      <Button size="sm" onClick={() => handleStatusChange(shipment, 'yetkazildi')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Yetkazildi
                      </Button>
                    )}
                  </td>
                </>
              );
            }}
          />
        </div>

        {/* Mobile Card Feed */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filtered.map((shipment: Shipment) => {
            const driver = drivers.find(d => d.id === shipment.driverId);
            const statusConfig = {
              yetkazildi: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent', label: 'Yetkazildi', icon: CheckCircle2 },
              yolda: { bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-transparent', label: 'Yo\'lda', icon: Navigation },
              kutmoqda: { bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-transparent', label: 'Kutilmoqda', icon: Clock },
              bekor_qilingan: { bg: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-transparent', label: 'Qaytarildi', icon: Clock }
            };
            const currentStatus = statusConfig[shipment.status as keyof typeof statusConfig] || { bg: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-400 dark:border-transparent', label: shipment.status, icon: Clock };
            const StatusIcon = currentStatus.icon;

            return (
              <div 
                key={shipment.id} 
                className="bg-white dark:bg-white/[0.02] rounded-2xl p-4 border border-slate-200/60 dark:border-white/5 shadow-sm space-y-4"
              >
                {/* Header: Shipment Number, Volume & Status */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-extrabold text-indigo-600 dark:text-indigo-400">{shipment.shipmentNumber}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{shipment.totalVolume}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${currentStatus.bg}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {currentStatus.label}
                  </span>
                </div>

                {/* Body Details */}
                <div className="space-y-2.5 text-sm">
                  {/* Destination with Navigation Link */}
                  <div className="flex items-start gap-2.5 bg-slate-50/50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-transparent">
                    <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-350">{shipment.destination}</p>
                      {shipment.orderId && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Buyurtma ID: #{shipment.orderId}</p>
                      )}
                      <a 
                        href={`https://yandex.com/maps/?text=${encodeURIComponent(shipment.destination)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-1.5 hover:underline"
                      >
                        <Navigation className="w-3 h-3" /> Xaritada ochish (Yandex)
                      </a>
                    </div>
                  </div>

                  {/* Driver and Vehicle */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-[10px]">
                        {(driver?.name || 'N').charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{driver?.name || 'Noma\'lum'}</span>
                    </div>
                    <span className="font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 rounded px-1.5 py-0.5 bg-slate-50 dark:bg-white/5 text-[10px]">
                      {driver?.vehicleNumber || '-'}
                    </span>
                  </div>

                  {/* Dates & Eslatmalar */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 px-1">
                    <div className="flex justify-between">
                      <span>Jo'natilgan sana:</span>
                      <span className="font-semibold">{shipment.startDate}</span>
                    </div>
                    {shipment.endDate && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>Yetkazilgan sana:</span>
                        <span>{shipment.endDate}</span>
                      </div>
                    )}
                    {shipment.notes && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-white/5 text-slate-400 dark:text-slate-500">
                        <span className="font-bold">Izoh:</span> {shipment.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Footer - Large full-width button */}
                {shipment.status !== 'yetkazildi' && shipment.status !== 'qaytarildi' && (
                  <div className="pt-2">
                    {shipment.status === 'kutmoqda' && (
                      <Button 
                        onClick={() => handleStatusChange(shipment, 'yolda')} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 h-10 text-xs font-bold active:scale-[0.98] transition-all"
                      >
                        <Navigation className="w-3.5 h-3.5 mr-2 inline-block" /> Yo'lga chiqish
                      </Button>
                    )}
                    {shipment.status === 'yolda' && (
                      <Button 
                        onClick={() => handleStatusChange(shipment, 'yetkazildi')} 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2 h-10 text-xs font-bold active:scale-[0.98] transition-all border-transparent"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 inline-block" /> Yetkazib berildi
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
              Ma'lumot topilmadi
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi jo'natmani shakllantirish">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Buyurtmani tanlang (Mijozlar)</label>
            <select
              value={form.orderId}
              onChange={e => {
                const order = orders.find(o => o.id === Number(e.target.value));
                setForm({ 
                  ...form, 
                  orderId: e.target.value, 
                  destination: order ? order.clientName : form.destination,
                  notes: order ? `Buyurtma No: ${order.orderNumber}` : form.notes
                });
              }}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            >
              <option value="">Erkin manzilga (Buyurtmasiz)</option>
              {pendingOrders.map(o => (
                <option key={o.id} value={o.id}>{o.orderNumber} - {o.clientName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Manzil *</label>
            <Input
              required
              placeholder="Manzilni kiriting..."
              value={form.destination}
              onChange={e => setForm({ ...form, destination: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Haydovchini tanlang *</label>
            <select
              required
              value={form.driverId}
              onChange={e => setForm({ ...form, driverId: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            >
              <option value="">Haydovchi tanlang...</option>
              {availableDrivers.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.vehicleNumber})</option>
              ))}
            </select>
            {availableDrivers.length === 0 && (
              <p className="text-xs text-amber-500 mt-1">Barcha haydovchilar band!</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Yuk hajmi *</label>
              <Input
                required
                placeholder="Masalan: 10 quti, 1.5 tonna"
                value={form.totalVolume}
                onChange={e => setForm({ ...form, totalVolume: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qo'shimcha eslatma</label>
              <Input
                placeholder="..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Jo'natish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
