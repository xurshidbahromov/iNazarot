import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProductionOrder {
  id: number;
  orderNumber: string;
  productId: number;
  productName: string;
  quantity: number;
  status: 'rejalashtirilgan' | 'jarayonda' | 'yakunlangan';
  startDate: string;
  endDate?: string;
  responsible: string;
}

interface ProductionState {
  productionOrders: ProductionOrder[];
}

export const useProductionStore = create<ProductionState>()(
  persist(
    () => ({
      productionOrders: [
        {
          id: 1,
          orderNumber: 'PROD-2026-001',
          productId: 1,
          productName: 'Oliy navli bug\'doy uni 2kg',
          quantity: 500,
          status: 'yakunlangan',
          startDate: '2026-05-20',
          endDate: '2026-05-22',
          responsible: 'Akmal Karimov'
        },
        {
          id: 2,
          orderNumber: 'PROD-2026-002',
          productId: 3,
          productName: 'Makaron "Maksimum" 400g',
          quantity: 1000,
          status: 'jarayonda',
          startDate: '2026-06-01',
          responsible: 'Jasur Vohidov'
        }
      ] as ProductionOrder[]
    }),
    {
      name: 'inazorat-production-storage',
    }
  )
);
