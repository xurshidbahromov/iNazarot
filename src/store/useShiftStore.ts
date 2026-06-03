import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Shift {
  id: string;
  cashierId: string;
  cashierName: string;
  status: 'open' | 'closed';
  openTime: string;
  closeTime?: string;
  openingCash: number;
  cashSales: number;
  cardSales: number;
}

interface ShiftState {
  currentShift: Shift | null;
  openShift: (cashierId: string, cashierName: string, openingCash: number) => void;
  closeShift: () => void;
  addSaleToShift: (amount: number, method: 'Naqd' | 'Karta') => void;
}

export const useShiftStore = create<ShiftState>()(
  persist(
    (set) => ({
      currentShift: null,
      openShift: (cashierId, cashierName, openingCash) => set({
        currentShift: {
          id: `SHIFT-${Date.now().toString().slice(-6)}`,
          cashierId,
          cashierName,
          status: 'open',
          openTime: new Date().toISOString(),
          openingCash,
          cashSales: 0,
          cardSales: 0
        }
      }),
      closeShift: () => set((state) => {
        if (!state.currentShift) return { currentShift: null };
        return {
          currentShift: {
            ...state.currentShift,
            status: 'closed',
            closeTime: new Date().toISOString()
          }
        };
      }),
      addSaleToShift: (amount, method) => set((state) => {
        if (!state.currentShift || state.currentShift.status !== 'open') return {};
        const isCash = method === 'Naqd';
        return {
          currentShift: {
            ...state.currentShift,
            cashSales: state.currentShift.cashSales + (isCash ? amount : 0),
            cardSales: state.currentShift.cardSales + (!isCash ? amount : 0)
          }
        };
      })
    }),
    {
      name: 'inazorat-pos-shifts',
    }
  )
);
