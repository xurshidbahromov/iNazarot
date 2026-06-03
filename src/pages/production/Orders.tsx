import { useState } from 'react';
import { Plus, Search, Factory, Play, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useProductionStore } from '../../store/useProductionStore';
import type { ProductionOrder } from '../../store/useProductionStore';
import { useWarehouseStore } from '../../store/useWarehouseStore';

export default function Orders() {
  const { productionOrders, formulas, addProductionOrder, updateOrderStatus } = useProductionStore();
  const { products, updateStock } = useWarehouseStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    formulaId: '',
    quantity: 1, // Target quantity multiple
    responsible: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  const filtered = productionOrders.filter(o =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.productName.toLowerCase().includes(search.toLowerCase()) ||
    o.responsible.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formula = formulas.find(f => f.id === Number(form.formulaId));
    if (!formula) return alert("Retseptni tanlang");

    addProductionOrder({
      formulaId: formula.id,
      productId: formula.targetProductId,
      productName: formula.targetProductName,
      quantity: formula.targetQuantity * Number(form.quantity), // If quantity=2, and formula target is 1000kg, total is 2000kg
      status: 'rejalashtirilgan',
      startDate: form.startDate,
      responsible: form.responsible
    });
    
    setIsModalOpen(false);
    setForm({ formulaId: '', quantity: 1, responsible: '', startDate: new Date().toISOString().split('T')[0] });
  };

  const handleStatusChange = (order: ProductionOrder, newStatus: ProductionOrder['status']) => {
    if (newStatus === 'yakunlangan' && order.status !== 'yakunlangan') {
      // 1. Ayirish (Ombordan xomashyolarni yechish)
      const formula = formulas.find(f => f.id === order.formulaId);
      if (formula) {
        // order.quantity bu umumiy tayyor mahsulot miqdori. Formula bo'yicha proporsiya topamiz:
        const ratio = order.quantity / formula.targetQuantity;
        
        // Omborda yetarli xomashyo bormi? Tekshirish
        const missingItems: string[] = [];
        formula.items.forEach(item => {
          const reqQty = item.quantity * ratio;
          const whProduct = products.find(p => p.id === item.productId);
          if (!whProduct || whProduct.stock < reqQty) {
            missingItems.push(`${item.productName} (Kerak: ${reqQty}, Bor: ${whProduct?.stock || 0})`);
          }
        });

        if (missingItems.length > 0) {
          alert(`Omborda xomashyo yetishmaydi:\n${missingItems.join('\n')}`);
          return;
        }

        // Ayirish
        formula.items.forEach(item => {
          const reqQty = item.quantity * ratio;
          updateStock(item.productId, -reqQty);
        });

        // 2. Tayyor mahsulotni omborga qo'shish
        updateStock(order.productId, order.quantity);
      }
    }
    
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Factory className="w-6 h-6 text-indigo-500" />
            Ishlab chiqarish jarayonlari
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rejalashtirilgan, jarayondagi va yakunlangan buyurtmalar nazorati
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yangi buyurtma
        </Button>
      </div>

      <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-transparent rounded-2xl p-4 shadow-sm">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Buyurtma yoki mas'ul shaxsni qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            variant="nested"
            columns={[
              { key: 'orderNumber', label: 'Buyurtma No' },
              { key: 'productName', label: 'Mahsulot' },
              { key: 'quantity', label: 'Miqdor' },
              { key: 'responsible', label: 'Mas\'ul Shaxs' },
              { key: 'startDate', label: 'Sana' },
              { key: 'status', label: 'Holat' },
              { key: 'actions', label: 'Amallar', className: 'text-right' },
            ]}
            data={filtered}
            renderRow={(order: ProductionOrder) => (
              <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{order.productName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{order.responsible}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {order.startDate} {order.endDate && `— ${order.endDate}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      order.status === 'yakunlangan' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-transparent' : 
                      order.status === 'jarayonda' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-transparent' : 
                      'bg-slate-50 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-400 dark:border-transparent'
                    }`}>
                      {order.status === 'yakunlangan' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {order.status === 'jarayonda' && <Play className="w-3 h-3 mr-1" />}
                      {order.status === 'rejalashtirilgan' && <Clock className="w-3 h-3 mr-1" />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {order.status === 'rejalashtirilgan' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(order, 'jarayonda')} className="text-blue-600 hover:bg-blue-50">
                        Boshlash
                      </Button>
                    )}
                    {order.status === 'jarayonda' && (
                      <Button size="sm" onClick={() => handleStatusChange(order, 'yakunlangan')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Yakunlash
                      </Button>
                    )}
                  </td>
              </>
            )}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi ishlab chiqarish buyurtmasi">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Retseptni tanlang *</label>
            <select
              required
              value={form.formulaId}
              onChange={e => setForm({ ...form, formulaId: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            >
              <option value="">Tanlang...</option>
              {formulas.filter(f => f.status === 'faol').map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.targetProductName})</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qancha marotaba (Karrali)? *</label>
              <Input
                type="number"
                min="0.1"
                step="0.1"
                required
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
              />
              <p className="text-xs text-slate-500 mt-1">
                Agar retsept 1000 kg ga mo'ljallangan bo'lsa, 2 kiritsangiz 2000 kg ishlab chiqariladi.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Boshlanish sanasi *</label>
              <Input
                type="date"
                required
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mas'ul shaxs *</label>
            <Input
              required
              placeholder="Masalan: Murod Alimov"
              value={form.responsible}
              onChange={e => setForm({ ...form, responsible: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Yaratish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
