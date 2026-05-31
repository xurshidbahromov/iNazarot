import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  category: string;
  unit: string;
  price: number;
  stock: number;
  minStock?: number; // Minimal zaxira chegarasi
  sku?: string;
  boxType?: string;
  boxQuantity?: number;
  features?: string;
  image?: string; // Base64 kodlangan rasm
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
  setMinStock: (id: number, minStock: number) => void;
  addLocation: (location: Omit<Location, 'id'>) => void;
  addInventory: (inventory: Omit<Inventory, 'id'>) => void;
  addTransfer: (transfer: Omit<Transfer, 'id'>) => void;
}

export const useWarehouseStore = create<WarehouseState>()(
  persist(
    (set) => ({
      products: [
        { id: 1, name: 'Oliy navli bug\'doy uni 2kg', category: 'Un mahsulotlari', unit: 'dona', price: 18000, stock: 450, minStock: 100, sku: 'SKU-0001', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop' },
        { id: 2, name: 'Kungaboqar yog\'i "Oila" 1L', category: 'Yog\' mahsulotlari', unit: 'dona', price: 17500, stock: 320, minStock: 50, sku: 'SKU-0002', image: 'https://images.unsplash.com/photo-1628189874895-188c83a7431f?q=80&w=300&auto=format&fit=crop' },
        { id: 3, name: 'Makaron "Maksimum" 400g', category: 'Makaron mahsulotlari', unit: 'dona', price: 5500, stock: 2500, minStock: 500, sku: 'SKU-0003', image: 'https://images.unsplash.com/photo-1612814890657-79b94098939a?q=80&w=300&auto=format&fit=crop' },
        { id: 4, name: 'Tuxum 1-nav (30 dona)', category: 'Tuxum va sut', unit: 'quti', price: 38000, stock: 120, minStock: 30, sku: 'SKU-0004', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=300&auto=format&fit=crop' },
        { id: 5, name: 'Sut "Musaffo" 3.2% 1L', category: 'Sut mahsulotlari', unit: 'dona', price: 13000, stock: 185, minStock: 50, sku: 'SKU-0005', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=300&auto=format&fit=crop' },
        { id: 6, name: 'Qaymoq "Nestle" 200g', category: 'Sut mahsulotlari', unit: 'dona', price: 16000, stock: 90, minStock: 30, sku: 'SKU-0006' },
        { id: 7, name: 'Shakar (Qadoqlangan) 1kg', category: 'Baqqollik', unit: 'dona', price: 14000, stock: 150, minStock: 40, sku: 'SKU-0007', image: 'https://images.unsplash.com/photo-1622485542171-86ccbece1ebc?q=80&w=300&auto=format&fit=crop' },
        { id: 8, name: 'Guruch "Lazer" 1kg', category: 'Don mahsulotlari', unit: 'dona', price: 21000, stock: 420, minStock: 100, sku: 'SKU-0008' },
        { id: 9, name: 'Qora choy "Ahmad Tea" 100g', category: 'Choy va kofe', unit: 'dona', price: 18500, stock: 300, minStock: 80, sku: 'SKU-0009', image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?q=80&w=300&auto=format&fit=crop' },
        { id: 10, name: 'Qahva "Nescafe Gold" 95g', category: 'Choy va kofe', unit: 'dona', price: 54000, stock: 120, minStock: 20, sku: 'SKU-0010' },
        { id: 11, name: 'Kolbasa "Rozmetov" (Halol) 1kg', category: 'Go\'sht mahsulotlari', unit: 'kg', price: 65000, stock: 45, minStock: 10, sku: 'SKU-0011' },
        { id: 12, name: 'Tovuq go\'shti (Yaxna) 1kg', category: 'Go\'sht mahsulotlari', unit: 'kg', price: 32000, stock: 80, minStock: 20, sku: 'SKU-0012', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=300&auto=format&fit=crop' },
        { id: 13, name: 'Coca-Cola 1.5L', category: 'Ichimliklar', unit: 'dona', price: 12000, stock: 500, minStock: 100, sku: 'SKU-0013', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&auto=format&fit=crop' },
        { id: 14, name: 'Fanta 1.5L', category: 'Ichimliklar', unit: 'dona', price: 12000, stock: 300, minStock: 100, sku: 'SKU-0014' },
        { id: 15, name: 'Mineral suv "Hydrolife" 1L', category: 'Ichimliklar', unit: 'dona', price: 4500, stock: 800, minStock: 200, sku: 'SKU-0015' },
        { id: 16, name: 'Pechenye "Roshen" 200g', category: 'Shirinliklar', unit: 'dona', price: 15000, stock: 150, minStock: 30, sku: 'SKU-0016' },
        { id: 17, name: 'Shokolad "Alpen Gold" 90g', category: 'Shirinliklar', unit: 'dona', price: 12500, stock: 240, minStock: 50, sku: 'SKU-0017', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=300&auto=format&fit=crop' },
        { id: 18, name: 'Kartoshka (Qizil)', category: 'Sabzavotlar', unit: 'kg', price: 6500, stock: 800, minStock: 200, sku: 'SKU-0018' },
        { id: 19, name: 'Piyoz (Oq)', category: 'Sabzavotlar', unit: 'kg', price: 4500, stock: 650, minStock: 150, sku: 'SKU-0019' },
        { id: 20, name: 'Sabzi (Qizil)', category: 'Sabzavotlar', unit: 'kg', price: 5000, stock: 500, minStock: 100, sku: 'SKU-0020' },
      ],
      locations: [
        { id: 1, name: 'Asosiy ombor (Sovutkichli)', address: 'Toshkent sh., Chilonzor tumani, 14-kvartal', manager: 'Alisher Vohidov', status: 'faol' },
        { id: 2, name: 'Quruq mahsulotlar ombori', address: 'Toshkent sh., Sergeli tumani', manager: 'Sardor Karimov', status: 'faol' },
        { id: 3, name: 'Farg\'ona filiali ombori', address: 'Farg\'ona sh., Aeroport ko\'chasi', manager: 'Dilshod Raxmatov', status: 'faol' },
        { id: 4, name: 'Samarqand tranzit ombori', address: 'Samarqand sh., Siyob bozori yonida', manager: 'Umidjon Qosimov', status: 'faol' }
      ],
      inventories: [
        { id: 1, date: '2026-05-20', locationId: 1, status: 'yakunlangan', items: [{ productId: 1, expected: 450, actual: 450 }, { productId: 2, expected: 320, actual: 318 }] },
        { id: 2, date: '2026-05-25', locationId: 2, status: 'jarayonda', items: [{ productId: 3, expected: 2500, actual: 2500 }] }
      ],
      transfers: [
        { id: 1, date: '2026-05-22', fromLocationId: 1, toLocationId: 3, productId: 1, quantity: 50, status: 'tasdiqlangan' },
        { id: 2, date: '2026-05-24', fromLocationId: 2, toLocationId: 1, productId: 4, quantity: 200, status: 'tasdiqlangan' },
        { id: 3, date: '2026-05-26', fromLocationId: 1, toLocationId: 4, productId: 10, quantity: 500, status: 'kutilmoqda' }
      ],
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, { ...product, id: Date.now(), sku: `SKU-${Date.now().toString().slice(-4)}` }] 
      })),
      updateStock: (id, quantity) => set((state) => ({
        products: state.products.map(p => 
          p.id === id ? { ...p, stock: Math.max(0, p.stock + quantity) } : p
        )
      })),
      setMinStock: (id, minStock) => set((state) => ({
        products: state.products.map(p =>
          p.id === id ? { ...p, minStock: Math.max(0, minStock) } : p
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
      name: 'inazorat-warehouse-storage-v4',
    }
  )
);

