import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FormulaItem {
  productId: number;
  productName: string;
  quantity: number;
  unit: string;
}

export interface Formula {
  id: number;
  name: string;
  targetProductId: number;
  targetProductName: string;
  targetQuantity: number;
  targetUnit: string;
  items: FormulaItem[];
  status: 'faol' | 'nofaol';
}

export interface ProductionOrder {
  id: number;
  orderNumber: string;
  formulaId: number; // Retseptga bog'lash
  productId: number;
  productName: string;
  quantity: number;
  status: 'rejalashtirilgan' | 'jarayonda' | 'yakunlangan';
  startDate: string;
  endDate?: string;
  responsible: string;
}

interface ProductionState {
  formulas: Formula[];
  productionOrders: ProductionOrder[];
  addFormula: (f: Omit<Formula, 'id'>) => void;
  updateFormula: (id: number, f: Partial<Formula>) => void;
  addProductionOrder: (p: Omit<ProductionOrder, 'id' | 'orderNumber'>) => void;
  updateOrderStatus: (id: number, status: ProductionOrder['status']) => void;
}

export const useProductionStore = create<ProductionState>()(
  persist(
    (set) => ({
      formulas: [
        {
          id: 1,
          name: "Oliy navli bug'doy uni 1000 kg",
          targetProductId: 1, // Tayyor un
          targetProductName: "Oliy navli bug'doy uni",
          targetQuantity: 1000,
          targetUnit: "kg",
          status: 'faol',
          items: [
            { productId: 101, productName: "Bug'doy", quantity: 1200, unit: "kg" },
            { productId: 102, productName: "Boyituvchi qo'shimchalar", quantity: 5, unit: "kg" }
          ]
        }
      ] as Formula[],
      productionOrders: [
        {
          id: 1,
          orderNumber: 'PROD-2026-001',
          formulaId: 1,
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
          formulaId: 1,
          productId: 3,
          productName: 'Makaron "Maksimum" 400g',
          quantity: 1000,
          status: 'jarayonda',
          startDate: '2026-06-01',
          responsible: 'Jasur Vohidov'
        }
      ] as ProductionOrder[],
      
      addFormula: (f) => set((state) => ({
        formulas: [...state.formulas, { ...f, id: Date.now() }]
      })),
      
      updateFormula: (id, f) => set((state) => ({
        formulas: state.formulas.map(form => form.id === id ? { ...form, ...f } : form)
      })),
      
      addProductionOrder: (p) => set((state) => {
        const newId = Date.now();
        const year = new Date().getFullYear();
        const orderNum = `PROD-${year}-${String(state.productionOrders.length + 1).padStart(3, '0')}`;
        return {
          productionOrders: [{ ...p, id: newId, orderNumber: orderNum }, ...state.productionOrders]
        };
      }),
      
      updateOrderStatus: (id, status) => set((state) => ({
        productionOrders: state.productionOrders.map(order => 
          order.id === id 
            ? { ...order, status, endDate: status === 'yakunlangan' ? new Date().toISOString().split('T')[0] : order.endDate } 
            : order
        )
      }))
    }),
    {
      name: 'inazorat-production-storage-v2', // v2 to override old data format
    }
  )
);
