import { useState, useRef } from 'react';
import { ShoppingCart, Search, CreditCard, Banknote, Plus, Minus, Trash2, PackageSearch, User, X, ScanBarcode, ChevronRight, Store, Printer, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../components/ui/Input';
import { useWarehouseStore } from '../../store/useWarehouseStore';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useActivityStore } from '../../store/useActivityStore';
import { cn } from '../../utils/cn';
import { printReceipt } from '../../utils/posUtils';
import POSLockScreen from './POSLockScreen';

interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

interface PaymentSuccessModal {
  isOpen: boolean;
  method: string;
  total: number;
  checkId: string;
  items: CartItem[];
}

export default function POS() {
  const { products, updateStock } = useWarehouseStore();
  const { addTransaction } = useFinanceStore();
  const { addActivity } = useActivityStore();
  
  const [isLocked, setIsLocked] = useState(true);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [successModal, setSuccessModal] = useState<PaymentSuccessModal>({
    isOpen: false, method: '', total: 0, checkId: '', items: []
  });

  const searchRef = useRef<HTMLInputElement>(null);

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

    // Show success modal
    setSuccessModal({
      isOpen: true,
      method,
      total,
      checkId: timestamp,
      items: [...cart]
    });

    // Faoliyat logiga yozish
    const itemCount = cart.reduce((a, c) => a + c.quantity, 0);
    addActivity({
      type: 'sale',
      title: 'Savdo amalga oshirildi',
      description: `${itemCount} ta mahsulot — ${method === 'Naqd pul' ? 'Naqd' : 'Plastik karta'} orqali`,
      amount: total,
      href: '/finance/cashbox',
    });

    setCart([]);
  };

  const handleClose = () => {
    window.close();
  };

  const handlePrintAndClose = () => {
    printReceipt({
      items: successModal.items,
      total: successModal.total,
      method: successModal.method,
      checkId: successModal.checkId,
    });
    setSuccessModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleCloseModal = () => {
    setSuccessModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100/80 relative overflow-hidden font-sans">
      
      {/* Lock Screen Overlay */}
      {isLocked && (
        <POSLockScreen onUnlock={() => setIsLocked(false)} />
      )}

      {/* Payment Success Modal */}
      {successModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] w-full max-w-sm animate-in zoom-in-90 slide-in-from-bottom-4 duration-300">
            {/* Success Header */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-t-[2rem] p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent)]" />
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-white/30">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">To'lov qabul qilindi!</h2>
                <p className="text-emerald-100 text-sm mt-1 font-medium">{successModal.method} orqali</p>
              </div>
            </div>

            {/* Amount */}
            <div className="p-6 text-center border-b border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Jami summa</p>
              <p className="text-4xl font-black text-slate-900 tracking-tight">
                {successModal.total.toLocaleString()}
                <span className="text-lg font-bold text-slate-400 ml-2">UZS</span>
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium">Chek № POS-{successModal.checkId}</p>
            </div>

            {/* Items summary */}
            <div className="p-4 max-h-36 overflow-y-auto">
              {successModal.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-medium text-slate-700 truncate flex-1 mr-2">{item.name}</span>
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                    {item.quantity} × {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-6 pt-3 grid grid-cols-2 gap-3">
              <button
                onClick={handleCloseModal}
                className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all duration-150 active:scale-95"
              >
                Yopish
              </button>
              <button
                onClick={handlePrintAndClose}
                className="h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
              >
                <Printer className="w-4 h-4" strokeWidth={2.5} />
                Chek chop et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standalone Terminal Header */}
      <header className={cn(
        "h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-8 flex-shrink-0 z-10 transition-all duration-500",
        isLocked ? "blur-sm scale-[0.99] opacity-50" : ""
      )}>
        <div className="flex items-center gap-4">
        {/* Free logo — no box */}
        <div className="flex items-center gap-3">
          <Store className="w-6 h-6 text-emerald-500" strokeWidth={1.8} />
          <div className="flex items-center">
            <span
              className="text-[26px] font-bold tracking-tight text-slate-900 leading-none"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              iNazorat
            </span>
            <svg
              className="w-[16px] h-[16px] text-emerald-500 -mt-3 ml-0.5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M11 5 H 19 V 13" />
              <path d="M5 11 H 13 V 19" />
            </svg>
          </div>
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <span className="text-[13px] font-semibold text-slate-400 tracking-wide">Kassa terminali</span>
        </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-5 py-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-800 leading-none">Kassir 01</p>
              <p className="text-slate-500 text-xs font-medium mt-1">Onlayn rejim</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all duration-150 border border-slate-200/60 shadow-sm active:scale-90 active:rotate-3"
            title="Terminalni yopish"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* Main POS Layout */}
      <div className={cn(
        "flex-1 flex gap-6 p-6 overflow-hidden transition-all duration-700 delay-100",
        isLocked ? "blur-md scale-[0.98] opacity-40 pointer-events-none" : "blur-0 scale-100 opacity-100"
      )}>
        
        {/* Products Section */}
        <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden relative">
          
          {/* Subtle gradient background inside products container */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white/10 pointer-events-none" />

          {/* Search Header */}
          <div className="p-6 pb-2 relative z-10 flex gap-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 z-10">
                <Search className="h-5 w-5 text-slate-400" strokeWidth={2} />
              </div>
              {!isLocked && (
                <Input
                  ref={searchRef}
                  className="pl-14 h-14 text-lg rounded-2xl bg-slate-100/50 border-transparent hover:bg-slate-100 focus:bg-white focus:border-slate-300 transition-all placeholder:text-slate-400 font-medium"
                  placeholder="Mahsulot qidirish yoki shtrix kod skanerlash..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400">
                  <ScanBarcode className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 p-6 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 custom-scrollbar relative z-10 content-start">
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="group flex flex-col bg-white border border-slate-100 rounded-[1.5rem] p-4 cursor-pointer hover:border-slate-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-150 active:scale-[0.94] active:translate-y-0.5 select-none"
              >
                <div className="h-32 bg-slate-50/80 rounded-2xl mb-4 flex items-center justify-center group-hover:bg-slate-100 transition-colors relative overflow-hidden">
                  <PackageSearch className="text-slate-300 w-10 h-10 group-hover:text-slate-400 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                </div>
                
                <div className="flex-1 flex flex-col px-1">
                  <h4 className="font-bold text-slate-700 text-[15px] line-clamp-2 mb-2 group-hover:text-slate-900 transition-colors leading-snug">{p.name}</h4>
                  <div className="mt-auto pt-3 flex items-end justify-between">
                    <div>
                      <p className="text-slate-900 font-black text-lg leading-none tracking-tight">{p.price.toLocaleString()} <span className="text-xs font-bold text-slate-400 tracking-normal">UZS</span></p>
                    </div>
                    <div className={cn(
                      "text-[11px] font-bold px-2 py-1 rounded-md",
                      p.stock > 10 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {p.stock} {p.unit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filtered.length === 0 && (
               <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                   <PackageSearch className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                 </div>
                 <p className="text-lg font-bold text-slate-600">Natija yo'q</p>
                 <p className="text-sm mt-1 text-slate-400">Qidiruv so'rovini o'zgartirib ko'ring</p>
               </div>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-[420px] xl:w-[460px] flex flex-col bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden flex-shrink-0 relative">
          
          {/* Customer Selector */}
          <div className="p-6 pb-4 border-b border-slate-50">
            <button className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 rounded-2xl hover:bg-slate-100 active:scale-[0.97] active:translate-y-px transition-all duration-150 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Oddiy xaridor</p>
                  <p className="text-xs text-slate-400 font-medium">Mijozni tanlash</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-in fade-in zoom-in duration-500">
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="w-12 h-12 text-slate-300" strokeWidth={1.5} />
                </div>
                <p className="font-extrabold text-slate-700 text-xl tracking-tight">Savat bo'm-bo'sh</p>
                <p className="text-sm mt-2 text-slate-400 max-w-[200px] leading-relaxed">Mahsulotlarni qo'shish uchun chap tomondagi ro'yxatdan foydalaning</p>
              </div>
            ) : (
              <div className="space-y-2 px-4">
                {cart.map(item => (
                  <div key={item.id} className="p-4 flex flex-col gap-4 bg-white border border-slate-100 rounded-[1.25rem] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] transition-all animate-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-sm font-bold text-slate-700 leading-snug">{item.name}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-all duration-150 p-1 -mr-1 -mt-1 rounded-lg hover:bg-red-50 active:scale-75">
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all active:scale-90 active:bg-slate-300">
                          <Minus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <span className="text-sm font-black w-8 text-center text-slate-700">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all active:scale-90 active:bg-slate-300">
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 mb-0.5">{item.price.toLocaleString()} x {item.quantity}</p>
                        <p className="text-base font-black text-slate-900 leading-none">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px] font-bold text-slate-400">UZS</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          <div className="p-6 bg-white border-t border-slate-50 z-10 relative">
            <div className="flex justify-between items-end mb-6 px-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">To'lov summasi</span>
                <span className="text-sm font-bold text-slate-500">{cart.reduce((a, c) => a + c.quantity, 0)} ta mahsulot</span>
              </div>
              <span className="text-4xl font-black text-slate-900 tracking-tight leading-none">{total.toLocaleString()} <span className="text-xl font-bold text-slate-400 tracking-normal">UZS</span></span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handlePay('Plastik karta')}
                disabled={cart.length === 0}
                className="relative group overflow-hidden flex flex-col items-center justify-center gap-3 h-[100px] bg-white border-2 border-slate-200 rounded-[1.5rem] hover:border-slate-800 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.95] active:translate-y-px"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300 text-slate-400">
                  <CreditCard className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Karta</span>
              </button>
              
              <button
                onClick={() => handlePay('Naqd pul')}
                disabled={cart.length === 0}
                className="relative group overflow-hidden flex flex-col items-center justify-center gap-3 h-[100px] bg-emerald-500 border-2 border-transparent rounded-[1.5rem] text-white transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-[0.95] active:translate-y-px"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Banknote className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold tracking-wide">Naqd pul</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
