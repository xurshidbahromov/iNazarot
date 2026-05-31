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
          description: "Supermarket 'Makro' — 500 quti Tuxum, 50 dona Sut",
          timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
          amount: 19650000,
          href: '/finance/cashbox',
        },
        {
          id: 2,
          type: 'income',
          title: "Kirim qo'shildi",
          description: "Oshxona 'Milliy' avans to'lovi",
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          amount: 4400000,
          href: '/finance/cashbox',
        },
        {
          id: 3,
          type: 'expense',
          title: "Xarajat qayd etildi",
          description: "Ombor xodimlari tushligi uchun",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          amount: 150000,
          href: '/finance/cashbox',
        },
        {
          id: 4,
          type: 'product',
          title: "Zaxira yangilandi",
          description: "Oliy navli bug'doy uni — 450 dona qabul qilindi",
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          href: '/warehouse/products',
        },
        {
          id: 5,
          type: 'client',
          title: "Yangi mijoz qo'shildi",
          description: "Jasur Xikmatov — Toshkent sh.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          href: '/crm/clients',
        },
        {
          id: 6,
          type: 'stock',
          title: "Omborlararo ko'chirish",
          description: "Tuxum (200 quti) Quruq mahsulotlar omboridan Asosiy omborga o'tkazildi",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
          href: '/warehouse/movements',
        },
        {
          id: 7,
          type: 'employee',
          title: "Xodim ma'lumotlari yangilandi",
          description: "Iroda Xusanova (Marketing menejeri) tizimga kiritildi",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          href: '/hr',
        },
        {
          id: 8,
          type: 'system',
          title: "Sizning PRO obunangiz aktivlashtirildi",
          description: "1 yil muddatga",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          href: '/settings',
        },
        {
          id: 9,
          type: 'sale',
          title: "Savdo amalga oshirildi (Kassa)",
          description: "Guruch 'Lazer', 40 kg — Naqd",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
          amount: 840000,
          href: '/finance/cashbox',
        },
        {
          id: 10,
          type: 'expense',
          title: "Ta'minotchiga to'lov",
          description: "Oziq-ovqat Baza LLC qarzi qisman uzildi",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          amount: 12000000,
          href: '/finance/cashbox',
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
      name: 'inazorat-activity-storage-v3',
    }
  )
);
