import { useState } from 'react';
import { Plus, Search, FlaskConical, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useProductionStore } from '../../store/useProductionStore';
import type { FormulaItem, Formula } from '../../store/useProductionStore';
import { useWarehouseStore } from '../../store/useWarehouseStore';

export default function Formulas() {
  const { formulas, addFormula } = useProductionStore();
  const { products } = useWarehouseStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    targetProductId: '',
    targetQuantity: 1,
    targetUnit: 'dona',
  });
  
  const [items, setItems] = useState<FormulaItem[]>([]);

  const filtered = formulas.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.targetProductName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = () => {
    setItems([...items, { productId: 0, productName: '', quantity: 1, unit: 'kg' }]);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    if (field === 'productId') {
      const prod = products.find(p => p.id === Number(value));
      newItems[index] = { ...newItems[index], productId: Number(value), productName: prod?.name || '', unit: prod?.unit || 'kg' };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProd = products.find(p => p.id === Number(form.targetProductId));
    if (!targetProd) return alert("Tayyor mahsulotni tanlang");

    addFormula({
      name: form.name || `${targetProd.name} retsepti`,
      targetProductId: targetProd.id,
      targetProductName: targetProd.name,
      targetQuantity: Number(form.targetQuantity),
      targetUnit: targetProd.unit,
      items: items.filter(i => i.productId !== 0),
      status: 'faol'
    });
    
    setIsModalOpen(false);
    setForm({ name: '', targetProductId: '', targetQuantity: 1, targetUnit: 'dona' });
    setItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-indigo-500" />
            Retseptlar (BOM)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Mahsulotlarni ishlab chiqarish uchun tarkibiy qismlar va me'yorlar
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yangi retsept
        </Button>
      </div>

      <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-transparent rounded-2xl p-4 shadow-sm">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Retsept nomini qidirish..."
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
              { key: 'name', label: 'Retsept Nomi' },
              { key: 'targetProductName', label: 'Tayyor Mahsulot' },
              { key: 'targetQuantity', label: 'Me\'yor' },
              { key: 'items', label: 'Tarkiblar (Xomashyo)' },
              { key: 'status', label: 'Holat' },
              { key: 'actions', label: 'Amallar', className: 'text-right' },
            ]}
            data={filtered}
            renderRow={(formula: Formula) => (
              <>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{formula.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{formula.targetProductName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {formula.targetQuantity} {formula.targetUnit}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex flex-col gap-1">
                      {formula.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="font-medium">{item.productName}</span>
                          <span className="text-slate-400">- {item.quantity} {item.unit}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      formula.status === 'faol' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-400'
                    }`}>
                      {formula.status === 'faol' ? 'Faol' : 'Nofaol'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
              </>
            )}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi Retsept Qo'shish">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Retsept nomi (ixtiyoriy)</label>
              <Input
                placeholder="Masalan: Oliy un 1t"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tayyor mahsulot *</label>
              <select
                required
                value={form.targetProductId}
                onChange={e => setForm({ ...form, targetProductId: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              >
                <option value="">Tanlang...</option>
                {products.filter(p => p.category === 'Tayyor mahsulot' || !p.category).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Natijaviy miqdor *</label>
              <Input
                type="number"
                min="0.1"
                step="0.1"
                required
                value={form.targetQuantity}
                onChange={e => setForm({ ...form, targetQuantity: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 dark:border-white/10 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tarkibi (Xomashyolar)</h4>
              <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="gap-2">
                <Plus className="w-4 h-4" /> Qo'shish
              </Button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-1">
                    <select
                      required
                      value={item.productId}
                      onChange={e => handleItemChange(index, 'productId', e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-white/[0.08] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    >
                      <option value="">Xomashyo tanlang...</option>
                      {products.filter(p => p.category !== 'Tayyor mahsulot').map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.unit})</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      placeholder="Miqdor"
                      value={item.quantity}
                      onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))}
                      className="h-10"
                    />
                  </div>
                  <button type="button" onClick={() => handleRemoveItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Tarkibiy qismlar kiritilmagan</p>
              )}
            </div>
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
