import { useState} from'react';
import { Plus, Search, Download, Package, AlertCircle, TrendingDown, Box} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useWarehouseStore } from '../../store/useWarehouseStore';
import { useActivityStore } from '../../store/useActivityStore';
import { exportToExcel } from '../../utils/exportToExcel';

export default function Products() {
  const { products, addProduct, setMinStock } = useWarehouseStore();
  const { addActivity } = useActivityStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name:'',
    category:'',
    unit:'',
    price: 0,
    stock: 0,
    minStock: 0,
    sku:'',
    boxType:'',
    boxQuantity: 0,
    features:''});

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: form.name,
      category: form.category,
      unit: form.unit,
      price: Number(form.price),
      stock: Number(form.stock),
      minStock: form.minStock ? Number(form.minStock) : undefined,
      sku: form.sku || undefined,
      boxType: form.boxType || undefined,
      boxQuantity: form.boxQuantity ? Number(form.boxQuantity) : undefined,
      features: form.features || undefined});

    addActivity({
      type: 'product',
      title: "Yangi mahsulot qo'shildi",
      description: `${form.name} — ${form.stock} ${form.unit} (Sotuv narxi: ${Number(form.price).toLocaleString()} UZS)`,
      href: '/warehouse/products',
    });

    setForm({
      name:'',
      category:'',
      unit:'',
      price: 0,
      stock: 0,
      minStock: 0,
      sku:'',
      boxType:'',
      boxQuantity: 0,
      features:''});
    setIsModalOpen(false);};

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => {
    const threshold = p.minStock ?? 10;
    return p.stock > 0 && p.stock <= threshold;
  }).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  const stats = [
    { title:'Jami turlar', value: totalProducts.toString(), icon: Package, color:'text-blue-500', bg:'bg-blue-50'},
    { title:'Umumiy qiymat', value:`${(totalValue / 1000000).toFixed(1)}M UZS`, icon: Box, color:'text-emerald-500', bg:'bg-emerald-50'},
    { title:'Chegara oshganlar', value: lowStockProducts.toString(), icon: TrendingDown, color:'text-amber-500', bg:'bg-amber-50'},
    { title:'Tugaganlar', value: outOfStockProducts.toString(), icon: AlertCircle, color:'text-red-500', bg:'bg-red-50'},
  ];

  // Inline minStock editing handler
  const handleMinStockChange = (id: number, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setMinStock(id, num);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-primary-600" />
            Mahsulotlar ombori
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Barcha tovarlar qoldig'i, o'lchamlari va narxlari ro'yxatini boshqarish.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="outline"
            className="rounded-xl h-10 px-4 bg-white border-slate-200 hover:bg-slate-50  :bg-slate-800/50 text-slate-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all"
            onClick={() => exportToExcel(products,'Ombor_qoldiqlari')}
          >
            <Download className="w-4 h-4 mr-2 text-slate-400" strokeWidth={1.6} /> Excel yuklash
          </Button>
          <Button 
            className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Mahsulot qo'shish
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-slate-500 mb-0.5">{stat.title}</p>
              <h4 className="text-xl font-bold text-slate-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Table Area */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input
              className="pl-10 rounded-xl bg-white h-10"
              placeholder="Nomi, SKU yoki kategoriyasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          variant="nested"
          selectable
          onSelectionChange={(selected) => console.log('Tanlangan mahsulotlar:', selected)}
          columns={[
            { key:'name', label:'Mahsulot (Nomi & SKU)', sortable: true},
            { key:'category', label:'Kategoriya', sortable: true},
            { key:'unit', label:'Birligi', sortable: true},
            { key:'price', label:'Sotuv narxi', sortable: true},
            { key:'stock', label:'Joriy qoldiq', sortable: true},
            { key:'minStock', label:'Min. chegara'},
          ]}
          data={filtered}
          renderRow={(product) => (
            <>
              <td className="py-4 pl-4 pr-3 text-[14px] sm:pl-6 max-w-[280px]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 mt-0.5 flex-shrink-0">
                    <Package className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">{product.name}</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-medium text-slate-400">
                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">{product.sku ||'SKU-yoq'}</span>
                      {product.features && <span className="truncate max-w-[150px] italic">({product.features})</span>}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500 font-semibold">{product.category}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] text-slate-500">{product.unit}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[14px] font-bold text-slate-700">
                {product.price.toLocaleString()} <span className="text-[12px] text-slate-400 font-medium">UZS</span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                {(() => {
                  const threshold = product.minStock ?? 0;
                  const isOut = product.stock === 0;
                  const isLow = !isOut && threshold > 0 && product.stock <= threshold;
                  const colorClass = isOut
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : isLow
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  const dotClass = isOut ? 'bg-red-500' : isLow ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500';
                  return (
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${colorClass}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                      {product.stock} {product.unit}
                    </span>
                  );
                })()}
              </td>
              {/* Inline editable minStock */}
              <td className="whitespace-nowrap px-3 py-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    defaultValue={product.minStock ?? ''}
                    placeholder="—"
                    onBlur={(e) => handleMinStockChange(product.id, e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                    className="w-20 px-2 py-1.5 text-[13px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white transition-colors"
                  />
                  <span className="text-[11px] text-slate-400 font-medium">{product.unit}</span>
                </div>
              </td>
            </>
          )}
        />
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi mahsulot qo'shish">
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Mahsulot nomi *"
                placeholder="Masalan: Sement M-400"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value})}
                className="rounded-xl"
                required
              />
            </div>
            <div>
              <Input
                label="SKU kodi (Artikul)"
                placeholder="Masalan: SEM-400"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value})}
                className="rounded-xl uppercase font-mono"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Kategoriya *"
              placeholder="Qurilish materiallari"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value})}
              className="rounded-xl"
              required
            />
            <Input
              label="O'lchov birligi *"
              placeholder="dona, qop, kg..."
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value})}
              className="rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quti turi (Qadoqlash)"
              placeholder="Masalan: Katta quti, Palet"
              value={form.boxType}
              onChange={(e) => setForm({ ...form, boxType: e.target.value})}
              className="rounded-xl"
            />
            <Input
              label="Qutidagi soni"
              type="number"
              min={0}
              placeholder="Masalan: 24"
              value={form.boxQuantity ||''}
              onChange={(e) => setForm({ ...form, boxQuantity: Number(e.target.value)})}
              className="rounded-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sotuv narxi (UZS) *"
              type="number"
              min={0}
              placeholder="45000"
              value={form.price ||''}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value)})}
              className="rounded-xl font-bold"
              required
            />
            <Input
              label="Boshlang'ich qoldiq *"
              type="number"
              min={0}
              placeholder="100"
              value={form.stock ||''}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value)})}
              className="rounded-xl font-bold"
              required
            />
          </div>

          {/* Min stock threshold */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <label className="block text-[13px] font-bold text-amber-800 mb-1">⚠️ Minimal zaxira chegarasi</label>
            <p className="text-[11px] text-amber-600 mb-3">Qoldiq bu raqamdan tushsa bildirishnoma keladi. Bo'sh qoldirsangiz 50 ta qabul qilinadi.</p>
            <Input
              type="number"
              min={0}
              placeholder="Masalan: 30"
              value={form.minStock ||''}
              onChange={(e) => setForm({ ...form, minStock: Number(e.target.value)})}
              className="rounded-xl font-bold bg-white"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tovar xususiyatlari / Tafsiloti</label>
            <textarea
              placeholder="Masalan: M-400 markali sement, 50kg lik qoplarda, namlikka chidamli"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value})}
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] focus:outline-none resize-none"
              rows={2}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="rounded-xl px-6">
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
