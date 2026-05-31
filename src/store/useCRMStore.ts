import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useCRMStore = create<CRMState>()(
  persist(
    (set) => ({
      clients: [
        { id: 1, name: 'Tohir Murodov', phone: '+998 90 123 45 67', status: 'Faol', lastPurchase: '2026-05-24', balance: 0 },
        { id: 2, name: 'Supermarket "Makro"', phone: '+998 71 234 56 78', status: 'Faol', lastPurchase: '2026-05-26', balance: -1500000 },
        { id: 3, name: 'Sardor Qosimov', phone: '+998 99 987 65 43', status: "Qora ro'yxat", lastPurchase: '2026-02-01', balance: -450000 },
        { id: 4, name: 'Jasur Xikmatov', phone: '+998 97 111 22 33', status: 'Faol', lastPurchase: '2026-05-28', balance: 0 },
        { id: 5, name: 'Oshxona "Milliy"', phone: '+998 71 555 44 33', status: 'Faol', lastPurchase: '2026-05-30', balance: -12000000 },
        { id: 6, name: 'Asadbek Soliyev', phone: '+998 93 444 55 66', status: 'Nofaol', lastPurchase: '2025-11-15', balance: 0 },
        { id: 7, name: '"Havas" do\'koni', phone: '+998 71 999 88 77', status: 'Faol', lastPurchase: '2026-05-25', balance: 500000 },
        { id: 8, name: 'Bekzod Shomurodov', phone: '+998 90 777 66 55', status: 'Faol', lastPurchase: '2026-05-29', balance: 0 },
        { id: 9, name: 'Shoxrux Rahimov', phone: '+998 94 333 22 11', status: 'Faol', lastPurchase: '2026-05-20', balance: -200000 },
        { id: 10, name: '"Korzinka.uz" Samarqand', phone: '+998 66 222 33 44', status: 'Faol', lastPurchase: '2026-05-27', balance: -5000000 },
      ],
      categories: [
        { id: 1, name: 'VIP Mijozlar', description: 'Har oylik xarid hajmi 50 mln so\'mdan yuqori bo\'lganlar', discount: 10, minPurchase: 50000000, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
        { id: 2, name: 'Korporativ', description: 'Katta hajmli supermarket va oshxonalar', discount: 7, minPurchase: 20000000, color: 'bg-purple-100 text-purple-700 border-purple-200' },
        { id: 3, name: 'Doimiy xaridorlar', description: 'Tizimda muntazam xarid qiluvchi jismoniy shaxslar', discount: 5, minPurchase: 10000000, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { id: 4, name: 'Oddiy xaridorlar', description: 'Yangi yoki kam xarid qiladigan foydalanuvchilar', discount: 0, minPurchase: 0, color: 'bg-slate-100 text-slate-700 border-slate-200' },
      ],
      orders: [
        {
          id: 1,
          orderNumber: 'ORD-2026-0001',
          clientId: 1,
          clientName: 'Tohir Murodov',
          date: '2026-05-24',
          products: [
            { productId: 1, name: 'Oliy navli bug\'doy uni 2kg', quantity: 20, price: 18000 },
            { productId: 3, name: 'Makaron "Maksimum" 400g', quantity: 100, price: 5500 }
          ],
          totalAmount: 910000,
          paidAmount: 910000,
          paymentStatus: 'paid',
          status: 'yakunlandi',
        },
        {
          id: 2,
          orderNumber: 'ORD-2026-0002',
          clientId: 2,
          clientName: 'Supermarket "Makro"',
          date: '2026-05-26',
          products: [
            { productId: 4, name: 'Tuxum 1-nav (30 dona)', quantity: 500, price: 38000 },
            { productId: 5, name: 'Sut "Musaffo" 3.2% 1L', quantity: 50, price: 13000 }
          ],
          totalAmount: 19650000,
          paidAmount: 15000000,
          paymentStatus: 'partial',
          status: 'tayyorlanmoqda',
          notes: 'Yetkazish filial markaziy omboriga, qolgan to\'lov 10 kunda.',
          installmentTerm: 3
        },
        {
          id: 3,
          orderNumber: 'ORD-2026-0003',
          clientId: 5,
          clientName: 'Oshxona "Milliy"',
          date: '2026-05-30',
          products: [
            { productId: 2, name: 'Kungaboqar yog\'i "Oila" 1L', quantity: 200, price: 17500 },
            { productId: 14, name: 'Fanta 1.5L', quantity: 300, price: 12000 }
          ],
          totalAmount: 7100000,
          paidAmount: 3000000,
          paymentStatus: 'partial',
          status: 'yangi',
          notes: 'Shartnoma asosida',
          installmentTerm: 1
        },
        {
          id: 4,
          orderNumber: 'ORD-2026-0004',
          clientId: 8,
          clientName: 'Bekzod Shomurodov',
          date: '2026-05-29',
          products: [
            { productId: 18, name: 'Kartoshka (Qizil)', quantity: 10, price: 6500 },
            { productId: 15, name: 'Mineral suv "Hydrolife" 1L', quantity: 50, price: 4500 }
          ],
          totalAmount: 290000,
          paidAmount: 290000,
          paymentStatus: 'paid',
          status: 'yakunlandi',
        },
        {
          id: 5,
          orderNumber: 'ORD-2026-0005',
          clientId: 10,
          clientName: '"Korzinka.uz" Samarqand',
          date: '2026-05-27',
          products: [
            { productId: 10, name: 'Qahva "Nescafe Gold" 95g', quantity: 100, price: 54000 },
            { productId: 11, name: 'Kolbasa "Rozmetov" (Halol) 1kg', quantity: 50, price: 65000 }
          ],
          totalAmount: 8650000,
          paidAmount: 5000000,
          paymentStatus: 'partial',
          status: 'yetkazilmoqda',
        },
        {
          id: 6,
          orderNumber: 'ORD-2026-0006',
          clientId: 4,
          clientName: 'Jasur Xikmatov',
          date: '2026-05-28',
          products: [
            { productId: 8, name: 'Guruch "Lazer" 1kg', quantity: 40, price: 21000 }
          ],
          totalAmount: 840000,
          paidAmount: 840000,
          paymentStatus: 'paid',
          status: 'yakunlandi',
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
    }),
    {
      name: 'inazorat-crm-storage-v2',
    }
  )
);
