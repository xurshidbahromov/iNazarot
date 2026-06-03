import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Distributor {
  id: number;
  name: string;
  region: string;
  phone: string;
  status: 'faol' | 'nofaol';
}

export interface DistributionOrder {
  id: number;
  orderNumber: string;
  distributorId: number;
  date: string;
  totalAmount: number;
  status: 'kutilmoqda' | 'jo_natildi' | 'yetkazib_berildi';
}

interface DistributionState {
  distributors: Distributor[];
  orders: DistributionOrder[];
}

export const useDistributionStore = create<DistributionState>()(
  persist(
    () => ({
      distributors: [
        { id: 1, name: 'Toshkent Dist', region: 'Toshkent', phone: '+998 90 123 45 67', status: 'faol' },
        { id: 2, name: 'Vodiy Dist', region: 'Farg\'ona, Andijon, Namangan', phone: '+998 93 234 56 78', status: 'faol' },
      ] as Distributor[],
      orders: [
        {
          id: 1,
          orderNumber: 'DIST-2026-001',
          distributorId: 1,
          date: '2026-05-28',
          totalAmount: 12500000,
          status: 'yetkazib_berildi'
        },
        {
          id: 2,
          orderNumber: 'DIST-2026-002',
          distributorId: 2,
          date: '2026-06-01',
          totalAmount: 34000000,
          status: 'jo_natildi'
        }
      ] as DistributionOrder[]
    }),
    {
      name: 'inazorat-distribution-storage',
    }
  )
);
