import { create } from 'zustand';

export interface Client {
  id: number;
  name: string;
  phone: string;
  status: string;
  lastPurchase: string;
  balance: number;
}

export interface ClientCategory {
  id: number;
  name: string;
  description: string;
  discount: number; // foizda, masalan 5 -> 5% chegirma
  minPurchase: number; // o'tish uchun min summa
  color: string; // rang sinfi (badge uchun)
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  clientId: number;
  clientName: string;
  date: string;
  products: OrderItem[];
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial'; // to'langan, nasiya (to'lanmagan), qisman
  status: 'yangi' | 'tayyorlanmoqda' | 'yetkazilmoqda' | 'yakunlandi' | 'bekor_qilingan';
  notes?: string;
  installmentTerm?: number; // Nasiya muddati (oyda)
}

interface CRMState {
  clients: Client[];
  categories: ClientCategory[];
  orders: Order[];
  addClient: (client: Omit<Client, 'id'>) => void;
  addCategory: (category: Omit<ClientCategory, 'id'>) => void;
  deleteCategory: (id: number) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date'>) => void;
  updateOrderStatus: (id: number, status: Order['status']) => void;
  updateOrderPayment: (id: number, paidAmount: number, paymentStatus: Order['paymentStatus']) => void;
}

export const useCRMStore = create<CRMState>((set) => ({
  clients: [
    { id: 1, name: 'Tohir Murodov', phone: '+998 90 123 45 67', status: 'Faol', lastPurchase: '21.05.2024', balance: 0 },
    { id: 2, name: 'OOO "Yangi Qurilish"', phone: '+998 71 234 56 78', status: 'Faol', lastPurchase: '18.05.2024', balance: -1500000 },
    { id: 3, name: 'Sardor Qosimov', phone: '+998 99 987 65 43', status: "Qora ro'yxat", lastPurchase: '01.02.2024', balance: -450000 },
  ],
  categories: [
    { id: 1, name: 'VIP Mijozlar', description: 'Har oylik xarid hajmi 50 mln so\'mdan yuqori bo\'lganlar', discount: 10, minPurchase: 50000000, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    { id: 2, name: 'Doimiy xaridorlar', description: 'Tizimda muntazam xarid qiluvchilar', discount: 5, minPurchase: 10000000, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { id: 3, name: 'Oddiy xaridorlar', description: 'Yangi yoki kam xarid qiladigan foydalanuvchilar', discount: 0, minPurchase: 0, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  ],
  orders: [
    {
      id: 1,
      orderNumber: 'ORD-2026-0001',
      clientId: 1,
      clientName: 'Tohir Murodov',
      date: '2026-05-24',
      products: [
        { productId: 101, name: 'Sement M-400', quantity: 20, price: 65000 },
        { productId: 102, name: 'Armatura 12mm', quantity: 100, price: 12000 }
      ],
      totalAmount: 2500000,
      paidAmount: 2500000,
      paymentStatus: 'paid',
      status: 'yakunlandi',
    },
    {
      id: 2,
      orderNumber: 'ORD-2026-0002',
      clientId: 2,
      clientName: 'OOO "Yangi Qurilish"',
      date: '2026-05-26',
      products: [
        { productId: 102, name: 'Armatura 12mm', quantity: 500, price: 12000 },
        { productId: 103, name: 'Gipskarton Knauf', quantity: 50, price: 40000 }
      ],
      totalAmount: 8000000,
      paidAmount: 2000000,
      paymentStatus: 'partial',
      status: 'tayyorlanmoqda',
      notes: 'Yetkazish loyiha maydoniga, qolgan to\'lov 10 kunda.',
      installmentTerm: 3
    },
    {
      id: 3,
      orderNumber: 'ORD-2026-0003',
      clientId: 3,
      clientName: 'Sardor Qosimov',
      date: '2026-05-27',
      products: [
        { productId: 101, name: 'Sement M-400', quantity: 10, price: 65000 }
      ],
      totalAmount: 650000,
      paidAmount: 0,
      paymentStatus: 'unpaid',
      status: 'yangi',
      notes: 'Nasiya sharti bilan, muddat: 1 oy.',
      installmentTerm: 1
    }
  ],
  addClient: (client) => set((state) => ({ 
    clients: [...state.clients, { ...client, id: Date.now() }] 
  })),
  addCategory: (category) => set((state) => ({ 
    categories: [...state.categories, { ...category, id: Date.now() }] 
  })),
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(c => c.id !== id)
  })),
  addOrder: (order) => set((state) => {
    const nextNum = String(state.orders.length + 1).padStart(4, '0');
    const orderNumber = `ORD-2026-${nextNum}`;
    const newOrder: Order = {
      ...order,
      id: Date.now(),
      orderNumber,
      date: new Date().toISOString().slice(0, 10),
    };
    
    // Mijoz balansini yangilash (nasiya summasi bo'yicha)
    const unpaidDebt = order.totalAmount - order.paidAmount;
    let updatedClients: Client[];
    if (unpaidDebt > 0) {
      updatedClients = state.clients.map(c => 
        c.id === order.clientId 
          ? { ...c, balance: c.balance - unpaidDebt, lastPurchase: newOrder.date }
          : c
      );
    } else {
      updatedClients = state.clients.map(c => 
        c.id === order.clientId 
          ? { ...c, lastPurchase: newOrder.date }
          : c
      );
    }

    return {
      orders: [newOrder, ...state.orders],
      clients: updatedClients
    };
  }),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  })),
  updateOrderPayment: (id, paidAmount, paymentStatus) => set((state) => {
    const order = state.orders.find(o => o.id === id);
    if (!order) return {};

    const prevUnpaid = order.totalAmount - order.paidAmount;
    const newUnpaid = order.totalAmount - paidAmount;
    const debtDiff = prevUnpaid - newUnpaid; // ijobiy bo'lsa qarz kamaydi, salbiy bo'lsa ko'paydi

    // Mijoz balansini mos ravishda yangilash
    const updatedClients = state.clients.map(c => 
      c.id === order.clientId 
        ? { ...c, balance: c.balance + debtDiff }
        : c
    );

    return {
      orders: state.orders.map(o => o.id === id ? { ...o, paidAmount, paymentStatus } : o),
      clients: updatedClients
    };
  })
}));
