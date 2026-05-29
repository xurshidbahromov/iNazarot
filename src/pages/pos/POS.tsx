import { useState } from 'react';
import { ShoppingCart, Search, CreditCard, Banknote, Plus, Minus, Trash2, PackageSearch, User, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../components/ui/Input';
import { useWarehouseStore } from '../../store/useWarehouseStore';
import { useFinanceStore } from '../../store/useFinanceStore';

interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

export default function POS() {
  const { products, updateStock } = useWarehouseStore();
  const { addTransaction } = useFinanceStore();
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const showToast = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    if (type === 'success') toast.success(message);
    else if (type === 'error') toast.error(message);
    else toast.warning(message);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    if (product.stock <= 0) {
      showToast("Bu mahsulot zaxirada tugagan!", 'error');
      return;
    }
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast(`Zaxirada atigi ${product.stock} ${product.unit} bor!`, 'warning');
          return prev;
        }
        return prev.map(c => c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, unit: product.unit, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    setCart(prev =>
      prev.map(c => {
        if (c.id === id) {
          const newQty = c.quantity + delta;
          if (newQty > product.stock) {
            showToast(`Zaxirada atigi ${product.stock} ${product.unit} bor!`, 'warning');
            return c;
          }
          return { ...c, quantity: Math.max(1, newQty) };
        }
        return c;
      }).filter(c => c.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(c => c.id !== id));

  const total = cart.reduce((acc, c) => acc + c.price * c.quantity, 0);

  const handlePay = (method: string) => {
    if (cart.length === 0) return;
    
    // eslint-disable-next-line react-hooks/purity
    const timestamp = Date.now().toString().slice(-6);
    
    // Ombordan zaxiralarni kamaytirish
    cart.forEach(item => {
      updateStock(item.id, -item.quantity);
    });

    // Kassaga Kirim yozish
    addTransaction({
      type: 'Kirim',
      amount: total,
      currency: 'UZS',
      rate: 1,
      description: `Savdo (POS Chek: POS-${timestamp})`,
      method: method === 'Naqd pul' ? 'Naqd' : 'Karta'
    });

    showToast(`To'lov muvaffaqiyatli qabul qilindi! Summa: ${total.toLocaleString()} UZS`, 'success');
    setCart([]);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 relative">


      {/* Products Section */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search Header */}
        <div className="p-5 border-b border-slate-200 bg-white flex gap-4">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input
              className="pl-11 h-12 text-base rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
              placeholder="Mahsulot qidirish (shtrix kod yoki nom)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="p-5 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 custom-scrollbar">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-200 active:scale-[0.98] select-none relative overflow-hidden"
            >
              {/* Product Image Placeholder */}
              <div className="h-28 bg-slate-50 rounded-xl mb-4 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                <PackageSearch className="text-slate-300 w-10 h-10 group-hover:text-primary-400 transition-colors" strokeWidth={1.4} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h4 className="font-semibold text-slate-900 text-[15px] line-clamp-2 mb-1.5 group-hover:text-primary-700 transition-colors">{p.name}</h4>
                <div className="mt-auto pt-2">
                  <p className="text-primary-600 font-bold text-lg leading-none">{p.price.toLocaleString()} <span className="text-[13px] font-medium text-primary-600/70">UZS</span></p>
                  <p className="text-xs font-medium text-slate-400 mt-2 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.stock > 10 ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    Qoldiq: {p.stock} {p.unit}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
             <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
               <PackageSearch className="w-16 h-16 text-slate-200 mb-4" strokeWidth={1.2} />
               <p className="text-lg font-medium text-slate-600">Mahsulot topilmadi</p>
               <p className="text-sm mt-1 text-slate-400">Boshqa so'rov kiritib ko'ring</p>
             </div>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-[400px] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0">
        {/* Customer Selector */}
        <div className="p-5 border-b border-slate-200 bg-white">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors" strokeWidth={1.8} />
              </div>
              <span className="text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Mijoz tanlang...</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={1.6} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200 border-dashed">
                <ShoppingCart className="w-8 h-8 text-slate-300" strokeWidth={1.4} />
              </div>
              <p className="font-semibold text-slate-600 text-lg">Savat bo'sh</p>
              <p className="text-sm mt-1.5 text-slate-400 max-w-[200px] leading-relaxed">Mahsulot qo'shish uchun chap tomondagi katalogdan tanlang</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 p-3 space-y-2">
              {cart.map(item => (
                <div key={item.id} className="p-3.5 flex items-center gap-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-slate-900 truncate mb-1">{item.name}</p>
                    <p className="text-sm font-bold text-primary-600">{(item.price * item.quantity).toLocaleString()} <span className="text-xs font-medium text-primary-600/70">UZS</span></p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1" title="O'chirish">
                      <Trash2 className="w-4 h-4" strokeWidth={1.6} />
                    </button>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1.5 rounded-md hover:bg-white hover:shadow-sm text-slate-500 transition-all">
                        <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                      <span className="text-sm font-bold w-6 text-center text-slate-900">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1.5 rounded-md hover:bg-white hover:shadow-sm text-slate-500 transition-all">
                        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10">
          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Jami mahsulotlar:</span>
              <span className="font-semibold text-slate-700">{cart.reduce((a, c) => a + c.quantity, 0)} ta</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-sm font-medium text-slate-600">To'lov summasi:</span>
              <span className="text-2xl font-bold text-slate-900 leading-none">{total.toLocaleString()} <span className="text-base text-slate-500">UZS</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              onClick={() => handlePay('Plastik karta')}
              disabled={cart.length === 0}
              className="flex flex-col items-center justify-center gap-2 h-20 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-all disabled:opacity-50 disabled:pointer-events-none group"
            >
              <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.6} />
              <span className="text-[13px] font-semibold">Karta orqali</span>
            </button>
            <button
              onClick={() => handlePay('Naqd pul')}
              disabled={cart.length === 0}
              className="flex flex-col items-center justify-center gap-2 h-20 bg-emerald-600 border-2 border-transparent rounded-2xl hover:bg-emerald-700 text-white transition-all disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-emerald-500/25 group"
            >
              <Banknote className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.6} />
              <span className="text-[13px] font-semibold">Naqd pul</span>
            </button>
          </div>

          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 py-2.5 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.6} />
              Savatni tozalash
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
