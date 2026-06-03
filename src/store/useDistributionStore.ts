import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  status: 'band_emas' | 'band' | 'xizmat_safari' | 'dam_olish';
}

export interface Shipment {
  id: number;
  shipmentNumber: string;
  orderId?: number; // CRM Order bilan bog'lash (Mijozga)
  transferId?: number; // Ombor filiallari bilan bog'lash (Filialga)
  driverId: number;
  destination: string; // Mijoz manzili yoki filial nomi
  status: 'kutmoqda' | 'yolda' | 'yetkazildi' | 'qaytarildi';
  startDate: string;
  endDate?: string;
  totalVolume: string; // Masalan: "1.5 tonna" yoki "10 ta quti"
  notes?: string;
}

interface DistributionState {
  drivers: Driver[];
  shipments: Shipment[];
  addDriver: (d: Omit<Driver, 'id'>) => void;
  updateDriver: (id: number, d: Partial<Driver>) => void;
  deleteDriver: (id: number) => void;
  addShipment: (s: Omit<Shipment, 'id' | 'shipmentNumber'>) => void;
  updateShipmentStatus: (id: number, status: Shipment['status']) => void;
}

export const useDistributionStore = create<DistributionState>()(
  persist(
    (set) => ({
      drivers: [
        {
          id: 1,
          name: "Sardor Yo'ldoshev",
          phone: "+998 90 123 45 67",
          vehicle: "Isuzu NPR",
          vehicleNumber: "01 A 777 AA",
          status: 'band_emas'
        },
        {
          id: 2,
          name: "Ilhom Karimov",
          phone: "+998 93 987 65 43",
          vehicle: "Damas",
          vehicleNumber: "10 B 123 CD",
          status: 'band'
        }
      ] as Driver[],
      
      shipments: [
        {
          id: 1,
          shipmentNumber: 'SHP-2026-001',
          driverId: 2,
          destination: 'Chilonzor Oq-Tepa (Korzinka)',
          status: 'yolda',
          startDate: '2026-06-03',
          totalVolume: '25 quti'
        }
      ] as Shipment[],
      
      addDriver: (d) => set((state) => ({
        drivers: [...state.drivers, { ...d, id: Date.now() }]
      })),
      
      updateDriver: (id, d) => set((state) => ({
        drivers: state.drivers.map(driver => driver.id === id ? { ...driver, ...d } : driver)
      })),
      
      deleteDriver: (id) => set((state) => ({
        drivers: state.drivers.filter(driver => driver.id !== id)
      })),
      
      addShipment: (s) => set((state) => {
        const newId = Date.now();
        const year = new Date().getFullYear();
        const shipNum = `SHP-${year}-${String(state.shipments.length + 1).padStart(3, '0')}`;
        return {
          shipments: [{ ...s, id: newId, shipmentNumber: shipNum }, ...state.shipments]
        };
      }),
      
      updateShipmentStatus: (id, status) => set((state) => ({
        shipments: state.shipments.map(ship => 
          ship.id === id 
            ? { ...ship, status, endDate: ['yetkazildi', 'qaytarildi'].includes(status) ? new Date().toISOString().split('T')[0] : ship.endDate } 
            : ship
        )
      }))
    }),
    {
      name: 'inazorat-distribution-storage-v2', // v2 to override the previous data structure
    }
  )
);
