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
  status: string;
  items: number;
  additionalExpense?: number; // Qo'shimcha xarajatlar, masalan transport
}

interface SupplyState {
  suppliers: Supplier[];
  purchases: Purchase[];
  addSupplier: (s: Omit<Supplier, 'id'>) => void;
  addPurchase: (p: Omit<Purchase, 'id' | 'date'>) => void;
}

export const useSupplyStore = create<SupplyState>()(
  persist(
    (set) => ({
      suppliers: [
        { id: 1, name: 'Qurilish Baza LLC', phone: '+998 71 123 45 67', address: 'Toshkent sh., Mirzo Ulugbek t.', balance: -2500000, status: 'Faol' },
        { id: 2, name: 'MetalPro OAJ', phone: '+998 71 234 56 78', address: 'Toshkent sh., Yunusobod t.', balance: 0, status: 'Faol' },
        { id: 3, name: 'GipsTrade XK', phone: '+998 93 345 67 89', address: 'Samarqand sh.', balance: -800000, status: 'Faol' },
      ],
      purchases: [
        { id: 1, date: '22.05.2024', supplier: 'Qurilish Baza LLC', total: 5500000, status: "To'langan", items: 3, additionalExpense: 150000 },
        { id: 2, date: '20.05.2024', supplier: 'MetalPro OAJ', total: 12000000, status: "Qisman to'langan", items: 1, additionalExpense: 500000 },
        { id: 3, date: '18.05.2024', supplier: 'GipsTrade XK', total: 3200000, status: "To'lanmagan", items: 2, additionalExpense: 0 },
      ],
      addSupplier: (s) => set((state) => ({
        suppliers: [...state.suppliers, { ...s, id: Date.now() }]
      })),
      addPurchase: (p) => set((state) => ({
        purchases: [{ ...p, id: Date.now(), date: new Date().toLocaleDateString('uz-UZ') }, ...state.purchases]
      })),
    }),
    {
      name: 'bitoerp-supply-storage',
    }
  )
);
