import { create } from 'zustand';

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

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [
    { id: 1, date: '24.05.2024 10:15', type: 'Kirim', amount: 5000000, currency: 'UZS', rate: 1, description: "Tohir Murodov qarzi to'lovi", method: 'Naqd' },
    { id: 2, date: '23.05.2024 16:40', type: 'Chiqim', amount: 100, currency: 'USD', rate: 12820, description: 'Ofis uchun printer xaridi', method: 'Karta' },
    { id: 3, date: '23.05.2024 12:00', type: 'Kirim', amount: 15400000, currency: 'UZS', rate: 1, description: 'Kunlik tushum (POS)', method: 'Naqd' },
    { id: 4, date: '22.05.2024 09:30', type: 'Kirim', amount: 500, currency: 'USD', rate: 12800, description: 'Xorijiy hamkordan avans', method: 'Pul o\'tkazma' }
  ],
  addTransaction: (trx) => set((state) => ({ 
    transactions: [{ 
      ...trx, 
      id: Date.now(),
      date: new Intl.DateTimeFormat('uz-UZ', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      }).format(new Date())
    }, ...state.transactions] 
  })),
  getBalance: () => {
    const { transactions } = get();
    return transactions.reduce((acc, curr) => {
      const amountInUzs = curr.amount * curr.rate;
      return curr.type === 'Kirim' ? acc + amountInUzs : acc - amountInUzs;
    }, 0);
  }
}));
