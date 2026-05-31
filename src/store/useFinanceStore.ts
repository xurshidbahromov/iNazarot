import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: number;
  date: string;
  type: 'Kirim' | 'Chiqim';
  amount: number;
  currency: string; // UZS, USD, RUB, EUR
  rate: number; // 1 (for UZS), or exchange rate (e.g. 12850 for USD)
  description: string;
  method: string;
}

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (trx: Omit<Transaction, 'id' | 'date'>) => void;
  getBalance: () => number;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [
        { id: 1, date: '30.05.2026 18:30', type: 'Kirim', amount: 4400000, currency: 'UZS', rate: 1, description: 'Oshxona "Milliy" avans to\'lovi', method: 'Pul o\'tkazma' },
        { id: 2, date: '30.05.2026 12:15', type: 'Chiqim', amount: 150000, currency: 'UZS', rate: 1, description: 'Ombor xodimlari tushligi uchun', method: 'Naqd' },
        { id: 3, date: '29.05.2026 16:40', type: 'Kirim', amount: 975000, currency: 'UZS', rate: 1, description: 'Bekzod Shomurodov xaridi', method: 'Karta' },
        { id: 4, date: '29.05.2026 11:00', type: 'Chiqim', amount: 12000000, currency: 'UZS', rate: 1, description: 'Oziq-ovqat Baza LLC qarzi qisman uzildi', method: 'Pul o\'tkazma' },
        { id: 5, date: '28.05.2026 14:20', type: 'Kirim', amount: 3400000, currency: 'UZS', rate: 1, description: 'Jasur Xikmatov mahsulot xaridi', method: 'Karta' },
        { id: 6, date: '28.05.2026 10:10', type: 'Chiqim', amount: 200, currency: 'USD', rate: 12850, description: 'Facebook va Google reklamalar uchun', method: 'Karta (Visa)' },
        { id: 7, date: '27.05.2026 15:50', type: 'Kirim', amount: 100000, currency: 'UZS', rate: 1, description: '"Korzinka.uz" Samarqand avans qismi', method: 'Pul o\'tkazma' },
        { id: 8, date: '27.05.2026 09:30', type: 'Chiqim', amount: 450000, currency: 'UZS', rate: 1, description: 'Ofis interneti va aloqa xizmati', method: 'Pul o\'tkazma' },
        { id: 9, date: '26.05.2026 17:00', type: 'Kirim', amount: 4700000, currency: 'UZS', rate: 1, description: 'Supermarket "Makro" avans to\'lovi', method: 'Pul o\'tkazma' },
        { id: 10, date: '26.05.2026 14:00', type: 'Chiqim', amount: 500, currency: 'USD', rate: 12850, description: 'Xorijiy ta\'minotchi bo\'nak', method: 'SWIFT' },
        { id: 11, date: '25.05.2026 11:45', type: 'Kirim', amount: 15400000, currency: 'UZS', rate: 1, description: 'Kunlik tushum (POS)', method: 'Naqd' },
        { id: 12, date: '25.05.2026 10:15', type: 'Kirim', amount: 5000000, currency: 'UZS', rate: 1, description: 'Tohir Murodov qarzi to\'lovi', method: 'Naqd' },
        { id: 13, date: '24.05.2026 18:00', type: 'Chiqim', amount: 2500000, currency: 'UZS', rate: 1, description: 'Transport xizmatlari (Logistika)', method: 'Naqd' },
        { id: 14, date: '24.05.2026 13:20', type: 'Kirim', amount: 1550000, currency: 'UZS', rate: 1, description: 'Tohir Murodov un va makaron to\'lovi', method: 'Karta' },
        { id: 15, date: '23.05.2026 16:40', type: 'Chiqim', amount: 100, currency: 'USD', rate: 12820, description: 'Ofis uchun printer xaridi', method: 'Karta' },
        { id: 16, date: '23.05.2026 12:00', type: 'Kirim', amount: 8400000, currency: 'UZS', rate: 1, description: 'Kunlik tushum (POS)', method: 'Naqd' },
        { id: 17, date: '22.05.2026 09:30', type: 'Kirim', amount: 500, currency: 'USD', rate: 12800, description: 'Xorijiy hamkordan avans', method: 'Pul o\'tkazma' },
        { id: 18, date: '21.05.2026 18:30', type: 'Chiqim', amount: 15000000, currency: 'UZS', rate: 1, description: 'Soliq to\'lovlari', method: 'Pul o\'tkazma' },
        { id: 19, date: '20.05.2026 14:00', type: 'Chiqim', amount: 30000000, currency: 'UZS', rate: 1, description: 'Oylik ish haqi fondi', method: 'Pul o\'tkazma' },
        { id: 20, date: '19.05.2026 10:00', type: 'Kirim', amount: 25000000, currency: 'UZS', rate: 1, description: 'Yirik investor sarmoyasi', method: 'Pul o\'tkazma' },
      ],
      addTransaction: (trx) => set((state) => ({ 
        transactions: [{ 
          ...trx, 
          id: Date.now(),
          date: (() => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${day}.${month}.${year} ${hours}:${minutes}`;
          })()
        }, ...state.transactions] 
      })),
      getBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, curr) => {
          const amountInUzs = curr.amount * curr.rate;
          return curr.type === 'Kirim' ? acc + amountInUzs : acc - amountInUzs;
        }, 0);
      }
    }),
    {
      name: 'inazorat-finance-storage-v3',
    }
  )
);
