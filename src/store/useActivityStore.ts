import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ActivityType =
  | 'sale'        // POS savdo
  | 'income'      // Kirim
  | 'expense'     // Chiqim
  | 'product'     // Mahsulot qo'shildi
  | 'client'      // Mijoz qo'shildi
  | 'employee'    // Xodim qo'shildi
  | 'stock'       // Zaxira o'zgarishi
  | 'system';     // Tizim

export interface ActivityLog {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string; // ISO string
  amount?: number;   // Moliyaviy miqdor (UZS)
  href?: string;     // Bog'liq sahifa
  user?: string;     // Kim qildi (hozircha optional)
}

interface ActivityState {
  logs: ActivityLog[];
  addActivity: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  clearAll: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      logs: [
        {
          id: 1,
          type: 'sale',
          title: "Savdo amalga oshirildi",
          description: "3 ta mahsulot — Plastik karta orqali",
          timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
          amount: 270000,
          href: '/finance/cashbox',
        },
        {
          id: 2,
          type: 'income',
          title: "Kirim qo'shildi",
          description: "Tohir Murodov — qarz to'lovi",
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          amount: 5000000,
          href: '/finance/cashbox',
        },
        {
          id: 3,
          type: 'product',
          title: "Yangi mahsulot qo'shildi",
          description: "Gipskarton oddiy — 85 dona zaxira",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          href: '/warehouse/products',
        },
        {
          id: 4,
          type: 'expense',
          title: "Xarajat qayd etildi",
          description: "Ofis uchun printer xaridi",
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          amount: 1282000,
          href: '/finance/cashbox',
        },
        {
          id: 5,
          type: 'client',
          title: "Yangi mijoz qo'shildi",
          description: "Sardor Rahimov — Toshkent sh.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          href: '/crm/clients',
        },
      ],
      addActivity: (log) =>
        set((state) => ({
          logs: [
            {
              ...log,
              id: Date.now(),
              timestamp: new Date().toISOString(),
            },
            ...state.logs,
          ].slice(0, 100), // Maksimum 100 ta saqlash
        })),
      clearAll: () => set({ logs: [] }),
    }),
    {
      name: 'inazorat-activity-storage',
    }
  )
);
