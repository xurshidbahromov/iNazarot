import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  category: string;
  unit: string;
  price: number;
  stock: number;
  sku?: string;
  boxType?: string;
  boxQuantity?: number;
  features?: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  manager: string;
  status: 'faol' | 'nofaol';
}

export interface Inventory {
  id: number;
  date: string;
  locationId: number;
  status: 'yangi' | 'jarayonda' | 'yakunlangan';
  items: { productId: number; expected: number; actual: number }[];
}

export interface Transfer {
  id: number;
  date: string;
  fromLocationId: number;
  toLocationId: number;
  productId: number;
  quantity: number;
  status: 'kutilmoqda' | 'tasdiqlangan' | 'bekor_qilingan';
}

interface WarehouseState {
  products: Product[];
  locations: Location[];
  inventories: Inventory[];
  transfers: Transfer[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateStock: (id: number, quantity: number) => void;
  addLocation: (location: Omit<Location, 'id'>) => void;
  addInventory: (inventory: Omit<Inventory, 'id'>) => void;
  addTransfer: (transfer: Omit<Transfer, 'id'>) => void;
}

export const useWarehouseStore = create<WarehouseState>()(
  persist(
    (set) => ({
      products: [
        { id: 1, name: 'Sement M-400', category: 'Qurilish materiallari', unit: 'qop', price: 45000, stock: 120, sku: 'SKU-001' },
        { id: 2, name: 'Armatura 12mm', category: 'Metall prokati', unit: 'metr', price: 6500, stock: 1500, sku: 'SKU-002' },
        { id: 3, name: 'Gipskarton oddiy', category: 'Qurilish materiallari', unit: 'dona', price: 32000, stock: 85, sku: 'SKU-003' },
      ],
      locations: [
        { id: 1, name: 'Asosiy ombor', address: 'Toshkent sh, Chilonzor tumani', manager: 'Alisher Vohidov', status: 'faol' },
        { id: 2, name: 'Zaxira ombor', address: 'Toshkent sh, Sergeli tumani', manager: 'Sardor Karimov', status: 'faol' }
      ],
      inventories: [],
      transfers: [],
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, { ...product, id: Date.now(), sku: `SKU-${Date.now().toString().slice(-4)}` }] 
      })),
      updateStock: (id, quantity) => set((state) => ({
        products: state.products.map(p => 
          p.id === id ? { ...p, stock: p.stock + quantity } : p
        )
      })),
      addLocation: (location) => set((state) => ({
        locations: [...state.locations, { ...location, id: Date.now() }]
      })),
      addInventory: (inventory) => set((state) => ({
        inventories: [...state.inventories, { ...inventory, id: Date.now() }]
      })),
      addTransfer: (transfer) => set((state) => ({
        transfers: [...state.transfers, { ...transfer, id: Date.now() }]
      }))
    }),
    {
      name: 'bitoerp-warehouse-storage',
    }
  )
);
