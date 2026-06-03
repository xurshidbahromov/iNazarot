import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  address: string;
  balance: number;
  status: string;
}

export interface Purchase {
  id: number;
  date: string;
  supplier: string;
  total: number;
  status: 'qabul_qilindi' | 'kutilmoqda' | 'bekor_qilingan' | string;
  items: number;
  additionalExpense?: number;
  itemsList?: { productId: number; productName: string; quantity: number; price: number }[];
}

interface SupplyState {
  suppliers: Supplier[];
  purchases: Purchase[];
  addSupplier: (s: Omit<Supplier, 'id'>) => void;
  addPurchase: (p: Omit<Purchase, 'id' | 'date'>) => void;
  updatePurchaseStatus: (id: number, status: Purchase['status']) => void;
}

export const useSupplyStore = create<SupplyState>()(
  persist(
    (set) => ({
      suppliers: [
        { id: 1, name: 'Oziq-ovqat Baza LLC', phone: '+998 71 123 45 67', address: 'Toshkent sh., Mirzo Ulugbek t.', balance: -2500000, status: 'Faol' },
        { id: 2, name: 'AgroPro OAJ', phone: '+998 71 234 56 78', address: 'Toshkent sh., Yunusobod t.', balance: 0, status: 'Faol' },
        { id: 3, name: 'Sharq Shirinliklari', phone: '+998 93 345 67 89', address: 'Samarqand sh.', balance: -800000, status: 'Faol' },
        { id: 4, name: 'Beverage Group', phone: '+998 90 999 88 77', address: 'Toshkent sh., Uchtepa t.', balance: -15000000, status: 'Faol' },
        { id: 5, name: 'Dairy Product XK', phone: '+998 97 111 22 33', address: 'Toshkent sh., Olmazor t.', balance: 0, status: 'Faol' },
        { id: 6, name: 'Premium Meat', phone: '+998 99 444 55 66', address: 'Toshkent sh., Sergeli t.', balance: -3200000, status: 'Faol' },
        { id: 7, name: 'Toshkent Un Zavodi', phone: '+998 70 202 30 40', address: 'Toshkent vil., Ohangaron t.', balance: 0, status: 'Faol' },
        { id: 8, name: 'Green Vegetables', phone: '+998 94 555 66 77', address: 'Toshkent sh., Yakkasaroy t.', balance: -1200000, status: 'Nofaol' },
        { id: 9, name: 'Choy va Kofe Impeks', phone: '+998 93 222 33 44', address: 'Farg\'ona sh.', balance: -5000000, status: 'Faol' },
        { id: 10, name: 'Global FMCG', phone: '+998 90 888 77 66', address: 'Toshkent sh., Yashnobod t.', balance: 0, status: 'Faol' },
      ],
      purchases: [
        { id: 1, date: '29.05.2026', supplier: 'Toshkent Un Zavodi', total: 45000000, status: "To'langan", items: 2, additionalExpense: 1500000 },
        { id: 2, date: '28.05.2026', supplier: 'Beverage Group', total: 15000000, status: "Qisman to'langan", items: 5, additionalExpense: 200000 },
        { id: 3, date: '27.05.2026', supplier: 'Oziq-ovqat Baza LLC', total: 5500000, status: "To'lanmagan", items: 3, additionalExpense: 150000 },
        { id: 4, date: '26.05.2026', supplier: 'AgroPro OAJ', total: 12000000, status: "Qisman to'langan", items: 1, additionalExpense: 500000 },
        { id: 5, date: '25.05.2026', supplier: 'Sharq Shirinliklari', total: 3200000, status: "To'langan", items: 2, additionalExpense: 0 },
        { id: 6, date: '24.05.2026', supplier: 'Premium Meat', total: 8500000, status: "To'lanmagan", items: 4, additionalExpense: 50000 },
        { id: 7, date: '22.05.2026', supplier: 'Dairy Product XK', total: 12500000, status: "To'langan", items: 6, additionalExpense: 350000 },
        { id: 8, date: '20.05.2026', supplier: 'Choy va Kofe Impeks', total: 22000000, status: "Qisman to'langan", items: 3, additionalExpense: 1200000 },
        { id: 9, date: '18.05.2026', supplier: 'Global FMCG', total: 1500000, status: "To'langan", items: 10, additionalExpense: 0 },
        { id: 10, date: '15.05.2026', supplier: 'Green Vegetables', total: 4200000, status: "To'lanmagan", items: 2, additionalExpense: 100000 },
      ],
      addSupplier: (s) => set((state) => ({
        suppliers: [...state.suppliers, { ...s, id: Date.now() }]
      })),
      addPurchase: (p) => set((state) => ({
        purchases: [{ ...p, id: Date.now(), date: new Date().toLocaleDateString('ru-RU') }, ...state.purchases]
      })),
      updatePurchaseStatus: (id, status) => set((state) => ({
        purchases: state.purchases.map(p => p.id === id ? { ...p, status } : p)
      }))
    }),
    {
      name: 'inazorat-supply-storage-v2',
    }
  )
);
