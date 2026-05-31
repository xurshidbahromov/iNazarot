import { useState} from'react';
import { Plus, Search, ShoppingBag, Clock, Eye, Calendar, DollarSign, Wallet, FileText, Trash2, TrendingUp} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useCRMStore} from'../../store/useCRMStore';
import type { Order, OrderItem} from'../../store/useCRMStore';
import { useWarehouseStore} from'../../store/useWarehouseStore';

const statusMap: Record<string, { label: string; cls: string}> = {
  yangi: { label:'Yangi', cls:'bg-blue-50 text-blue-700 border-blue-200'},
  tayyorlanmoqda: { label:'Tayyorlanmoqda', cls:'bg-amber-50 text-amber-700 border-amber-200'},
  yetkazilmoqda: { label:'Yetkazilmoqda', cls:'bg-indigo-50 text-indigo-700 border-indigo-200'},
  yakunlandi: { label:'Yakunlandi', cls:'bg-emerald-50 text-emerald-700 border-emerald-200'},
  bekor_qilingan: { label:'Bekor qilingan', cls:'bg-rose-50 text-rose-700 border-rose-200'},};

const paymentStatusMap: Record<string, { label: string; cls: string}> = {
  paid: { label:'To\'langan', cls:'bg-emerald-100 text-emerald-800'},
  unpaid: { label:'Nasiya (To\'lanmagan)', cls:'bg-rose-100 text-rose-800'},
  partial: { label:'Qisman to\'langan', cls:'bg-amber-100 text-amber-800'},};

export default function Orders() {
  const { clients, orders, addOrder, updateOrderStatus, updateOrderPayment} = useCRMStore();
  const { products} = useWarehouseStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // New Order Form State
  const [newOrderClientId, setNewOrderClientId] = useState<string>('');
  const [newOrderItems, setNewOrderItems] = useState<{ productId: number; quantity: number; price: number}[]>([]);
  const [newOrderPaidAmount, setNewOrderPaidAmount] = useState<number>(0);

  const [newOrderInstallmentTerm, setNewOrderInstallmentTerm] = useState<number>(0);
  const [newOrderNotes, setNewOrderNotes] = useState<string>('');

  // Payment Form State
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const filtered = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
                          o.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ==='all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;});

  const totalSales = orders.filter(o => o.status !=='bekor_qilingan').reduce((a, b) => a + b.totalAmount, 0);
  const totalDebt = orders.filter(o => o.status !=='bekor_qilingan').reduce((a, b) => a + (b.totalAmount - b.paidAmount), 0);
  const activeOrdersCount = orders.filter(o => ['yangi','tayyorlanmoqda','yetkazilmoqda'].includes(o.status)).length;

  const handleAddProductItem = () => {
    if (products.length > 0) {
      setNewOrderItems(prev => [...prev, { productId: products[0].id, quantity: 1, price: products[0].price}]);}};

  const handleRemoveProductItem = (index: number) => {
    setNewOrderItems(prev => prev.filter((_, i) => i !== index));};

  const handleItemChange = (index: number, field:'productId' |'quantity' |'price', value: number) => {
    setNewOrderItems(prev => prev.map((item, i) => {
      if (i === index) {
        if (field ==='productId') {
          const selectedProd = products.find(p => p.id === value);
          return {
            ...item,
            productId: value,
            price: selectedProd ? selectedProd.price : 0};}
        return { ...item, [field]: value};}
      return item;}));};

  const calculateNewOrderTotal = () => {
    return newOrderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);};

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderClientId || newOrderItems.length === 0) return;

    const client = clients.find(c => c.id === Number(newOrderClientId));
    if (!client) return;

    const totalAmount = calculateNewOrderTotal();
    
    // To'lov holatini avtomatik aniqlash
    let payStatus: Order['paymentStatus'];
    if (newOrderPaidAmount === 0) {
      payStatus ='unpaid';} else if (newOrderPaidAmount < totalAmount) {
      payStatus ='partial';} else {
      payStatus ='paid';}

    const orderProducts: OrderItem[] = newOrderItems.map(item => {
      const prod = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        name: prod ? prod.name :'Noma\'lum mahsulot',
        quantity: item.quantity,
        price: item.price};});

    addOrder({
      clientId: client.id,
      clientName: client.name,
      products: orderProducts,
      totalAmount,
      paidAmount: newOrderPaidAmount,
      paymentStatus: payStatus,
      status:'yangi',
      notes: newOrderNotes,
      installmentTerm: payStatus !=='paid' ? newOrderInstallmentTerm : undefined});

    // Reset Form
    setNewOrderClientId('');
    setNewOrderItems([]);
    setNewOrderPaidAmount(0);

    setNewOrderInstallmentTerm(0);
    setNewOrderNotes('');
    setIsAddModalOpen(false);};

  const handleOpenPaymentModal = (order: Order) => {
    setSelectedOrder(order);
    setPaymentAmount(order.totalAmount - order.paidAmount);
    setIsPaymentModalOpen(true);};

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const newPaidAmount = selectedOrder.paidAmount + Number(paymentAmount);
    let newPayStatus: Order['paymentStatus'] ='paid';

    if (newPaidAmount === 0) {
      newPayStatus ='unpaid';} else if (newPaidAmount < selectedOrder.totalAmount) {
      newPayStatus ='partial';}

    updateOrderPayment(selectedOrder.id, newPaidAmount, newPayStatus);
    setIsPaymentModalOpen(false);
    setSelectedOrder(null);};

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);};

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary-600" />
            Buyurtmalar boshqaruvi
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">Mijozlar buyurtmalari, nasiya muddatlari va yetkazib berish jarayonini nazorat qilish.</p>
        </div>
        <Button className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]" onClick={() => {
          setIsAddModalOpen(true);
          handleAddProductItem(); // Dastlabki bir dona mahsulot qatorini qo'shish
        }}>
          <Plus className="w-4 h-4 mr-2" strokeWidth={2} /> Yangi buyurtma
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50">
            <ShoppingBag className="w-6 h-6 text-blue-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Jami Buyurtmalar</p>
            <h4 className="text-xl font-bold text-slate-900">{orders.length} ta</h4>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50">
            <TrendingUp className="w-6 h-6 text-emerald-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Jami Savdo</p>
            <h4 className="text-xl font-bold text-slate-900">{totalSales.toLocaleString()} UZS</h4>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-50">
            <Wallet className="w-6 h-6 text-red-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Nasiya Summasi</p>
            <h4 className="text-xl font-bold text-slate-900">{totalDebt.toLocaleString()} UZS</h4>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50">
            <Clock className="w-6 h-6 text-amber-500" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500 mb-0.5">Aktiv buyurtmalar</p>
            <h4 className="text-xl font-bold text-slate-900">{activeOrdersCount} ta</h4>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-[20px] border-2 border-[#f1f2f4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.6} />
            </div>
            <Input className="pl-10 rounded-xl bg-white h-10 border-slate-200" placeholder="Kodi yoki mijoz bo'yicha qidiring..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
              <option value="all">Barcha holatlar</option>
              <option value="yangi">Yangi</option>
              <option value="tayyorlanmoqda">Tayyorlanmoqda</option>
              <option value="yetkazilmoqda">Yetkazilmoqda</option>
              <option value="yakunlandi">Yakunlangan</option>
              <option value="bekor_qilingan">Bekor qilingan</option>
            </select>
          </div>
        </div>

        <Table
          variant="nested"
          columns={[
            { key:'orderNumber', label:'Buyurtma kodi'},
            { key:'clientName', label:'Mijoz nomi'},
            { key:'date', label:'Sana'},
            { key:'totalAmount', label:'Jami'},
            { key:'paidAmount', label:'To\'landi / Qarz'},
            { key:'paymentStatus', label:'To\'lov'},
            { key:'status', label:'Holat'},
            { key:'actions', label:'Amallar', className:'text-right'},
          ]}
          data={filtered}
          renderRow={(order) => {
            const unpaid = order.totalAmount - order.paidAmount;
            return (
              <>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-bold text-slate-900 sm:pl-6">{order.orderNumber}</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-semibold text-slate-700">{order.clientName}</td>
                <td className="whitespace-nowrap px-3 py-4 text-[13px] text-slate-500">{order.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-extrabold text-slate-900">{order.totalAmount.toLocaleString()} UZS</td>
                <td className="whitespace-nowrap px-3 py-4 text-[13px]">
                  <div className="font-semibold text-emerald-600">{order.paidAmount.toLocaleString()} UZS</div>
                  {unpaid > 0 && <div className="text-[11px] text-rose-500 font-bold mt-0.5">Qarz: {unpaid.toLocaleString()} UZS</div>}
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${paymentStatusMap[order.paymentStatus].cls}`}>
                    {paymentStatusMap[order.paymentStatus].label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold border ${statusMap[order.status].cls}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusMap[order.status].label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right text-xs font-medium space-x-2">
                  <Button variant="outline" size="sm" className="h-8 px-2 rounded-lg text-slate-600 border-slate-200 hover:bg-slate-50  :bg-slate-800/50" onClick={() => handleViewDetails(order)}>
                    <Eye className="w-3.5 h-3.5 mr-1" /> Batafsil
                  </Button>
                  {unpaid > 0 && order.status !=='bekor_qilingan' && (
                    <Button size="sm" className="h-8 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleOpenPaymentModal(order)}>
                      <DollarSign className="w-3.5 h-3.5 mr-1" /> To'lov
                    </Button>
                  )}
                </td>
              </>
            );
          }}
        />
      </div>

      {/* New Order Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Yangi buyurtma yaratish">
        <form onSubmit={handleCreateOrder} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Mijoz tanlang *</label>
            <select value={newOrderClientId} onChange={(e) => setNewOrderClientId(e.target.value)}
              className="w-full h-11 px-3 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors" required>
              <option value="">Mijozni tanlang...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} (Balans: {c.balance.toLocaleString()} UZS)</option>)}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-semibold text-slate-700">Mahsulotlar *</label>
              <Button type="button" variant="outline" size="sm" className="h-8 rounded-lg text-[12px] border-slate-200" onClick={handleAddProductItem}>
                + Mahsulot qo'shish
              </Button>
            </div>
            
            <div className="space-y-3">
              {newOrderItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 bg-slate-50 p-3 rounded-xl border-2 border-[#f1f2f4]">
                  <div className="flex-1">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mahsulot</label>
                    <select value={item.productId} onChange={(e) => handleItemChange(index,'productId', Number(e.target.value))}
                      className="w-full h-9 px-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none">
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} (Zaxira: {p.stock})</option>)}
                    </select>
                  </div>
                  
                  <div className="w-24">
                    <Input label="Miqdor" type="number" min={1} value={item.quantity ||''}
                      onChange={(e) => handleItemChange(index,'quantity', Number(e.target.value))} className="h-9 rounded-lg text-sm" required />
                  </div>

                  <div className="w-32">
                    <Input label="Narx (UZS)" type="number" min={0} value={item.price ||''}
                      onChange={(e) => handleItemChange(index,'price', Number(e.target.value))} className="h-9 rounded-lg text-sm" required />
                  </div>

                  <div className="flex items-end justify-end">
                    <Button type="button" variant="outline" size="sm" className="h-9 w-9 p-0 border-rose-200 text-rose-500 hover:bg-rose-50 rounded-lg"
                      onClick={() => handleRemoveProductItem(index)} disabled={newOrderItems.length === 1}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl flex flex-col gap-2 border-2 border-[#f1f2f4]">
            <div className="flex justify-between text-sm font-semibold text-slate-600">
              <span>Umumiy miqdor:</span>
              <span>{newOrderItems.reduce((acc, curr) => acc + curr.quantity, 0)} dona</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-200 pt-2">
              <span>Jami Summa:</span>
              <span>{calculateNewOrderTotal().toLocaleString()} UZS</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input label="To'langan Summa (UZS)" type="number" min={0} max={calculateNewOrderTotal()} value={newOrderPaidAmount ||''}
                onChange={(e) => setNewOrderPaidAmount(Number(e.target.value))} className="rounded-xl font-bold" />
              <p className="mt-1 text-[11px] text-slate-400">Qolgan summa mijoz qarziga yoziladi.</p>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nasiya muddati (oyda)</label>
              <select value={newOrderInstallmentTerm} onChange={(e) => setNewOrderInstallmentTerm(Number(e.target.value))}
                className="w-full h-11 px-3 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] focus:outline-none"
                disabled={newOrderPaidAmount === calculateNewOrderTotal()}>
                <option value={0}>Nasiya emas (bir martalik to'lov)</option>
                <option value={1}>1 oy</option>
                <option value={3}>3 oy</option>
                <option value={6}>6 oy</option>
                <option value={12}>12 oy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Izohlar / Yetkazib berish manzili</label>
            <textarea value={newOrderNotes} onChange={(e) => setNewOrderNotes(e.target.value)}
              placeholder="Masalan: Yetkazish bepul, manzil: Toshkent sh, 1-uy"
              className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-slate-300 rounded-xl text-[14px] focus:outline-none resize-none" rows={2} />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsAddModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6">Buyurtmani saqlash</Button>
          </div>
        </form>
      </Modal>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Qarz uchun to'lov qabul qilish">
        <form onSubmit={handleSavePayment} className="space-y-4 p-1">
          {selectedOrder && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Buyurtma:</span>
                <span>{selectedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Mijoz:</span>
                <span>{selectedOrder.clientName}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Umumiy summa:</span>
                <span className="font-bold text-slate-800">{selectedOrder.totalAmount.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>To'langan:</span>
                <span className="font-bold text-emerald-600">{selectedOrder.paidAmount.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-rose-500 border-t border-slate-200 pt-2">
                <span>Qolgan qarz:</span>
                <span>{(selectedOrder.totalAmount - selectedOrder.paidAmount).toLocaleString()} UZS</span>
              </div>
            </div>
          )}
          
          <Input label="Qabul qilinayotgan summa (UZS) *" type="number" min={1} max={selectedOrder ? selectedOrder.totalAmount - selectedOrder.paidAmount : 0}
            value={paymentAmount ||''} onChange={(e) => setPaymentAmount(Number(e.target.value))} className="rounded-xl font-extrabold" required />

          <div className="flex gap-3 justify-end pt-4 mt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl px-5" onClick={() => setIsPaymentModalOpen(false)}>Bekor qilish</Button>
            <Button type="submit" className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white">To'lovni saqlash</Button>
          </div>
        </form>
      </Modal>

      {/* Details View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Buyurtma tafsilotlari">
        {selectedOrder && (
          <div className="space-y-5 p-1 max-h-[80vh] overflow-y-auto">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-black text-slate-900">{selectedOrder.orderNumber}</h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedOrder.date}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border ${statusMap[selectedOrder.status].cls}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusMap[selectedOrder.status].label}
              </span>
            </div>

            {/* Status change actions */}
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-[#f1f2f4] space-y-2">
              <label className="block text-xs font-bold text-slate-500 mb-1">Buyurtma holatini o'zgartirish</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(statusMap).map((st) => (
                  <button key={st} type="button" onClick={() => updateOrderStatus(selectedOrder.id, st as Order['status'])}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      selectedOrder.status === st
                        ?'bg-primary-600 border-primary-600 text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
                        :'bg-white border-slate-200 text-slate-600 hover:bg-slate-50  :bg-slate-800/50'}`}>
                    {statusMap[st].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Client info */}
            <div>
              <h5 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mijoz haqida</h5>
              <div className="bg-white/80 backdrop-blur-md border-2 border-[#f1f2f4] p-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                  {selectedOrder.clientName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h6 className="text-[14px] font-bold text-slate-900">{selectedOrder.clientName}</h6>
                  <p className="text-xs text-slate-500 mt-0.5">ID: {selectedOrder.clientId}</p>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div>
              <h5 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mahsulotlar</h5>
              <div className="border-2 border-[#f1f2f4] rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="py-2 pl-3 pr-2 text-left text-xs font-semibold text-slate-500">Mahsulot</th>
                      <th className="py-2 px-2 text-left text-xs font-semibold text-slate-500">Narx</th>
                      <th className="py-2 px-2 text-left text-xs font-semibold text-slate-500">Soni</th>
                      <th className="py-2 px-3 text-right text-xs font-semibold text-slate-500">Jami</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {selectedOrder.products.map((p, idx) => (
                      <tr key={idx} className="text-xs">
                        <td className="py-2.5 pl-3 pr-2 font-bold text-slate-800">{p.name}</td>
                        <td className="py-2.5 px-2 text-slate-500">{p.price.toLocaleString()} UZS</td>
                        <td className="py-2.5 px-2 font-semibold text-slate-600">{p.quantity}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800">{(p.quantity * p.price).toLocaleString()} UZS</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial summary */}
            <div className="bg-slate-100 p-4 rounded-xl border-2 border-[#f1f2f4] space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Jami summa:</span>
                <span className="text-slate-800">{selectedOrder.totalAmount.toLocaleString()} UZS</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>To'langan summa:</span>
                <span className="text-emerald-600">{selectedOrder.paidAmount.toLocaleString()} UZS</span>
              </div>
              {selectedOrder.installmentTerm ? (
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Nasiya muddati:</span>
                  <span className="text-indigo-600">{selectedOrder.installmentTerm} oy</span>
                </div>
              ) : null}
              <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                <span>Qolgan qarz:</span>
                <span className={selectedOrder.totalAmount - selectedOrder.paidAmount > 0 ?"text-rose-600" :"text-slate-800"}>
                  {(selectedOrder.totalAmount - selectedOrder.paidAmount).toLocaleString()} UZS
                </span>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
                <h6 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Izoh va eslatmalar:
                </h6>
                <p className="text-xs text-amber-700 leading-relaxed font-medium">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button type="button" className="rounded-xl px-6" onClick={() => setIsViewModalOpen(false)}>Yopish</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
