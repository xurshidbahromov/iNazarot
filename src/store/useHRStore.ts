import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  phone: string;
  status: string;
}

export interface Department {
  id: number;
  name: string;
  manager: string;
  employeeCount: number;
}

interface HRState {
  employees: Employee[];
  departments: Department[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  deleteEmployee: (id: number) => void;
}

export const useHRStore = create<HRState>()(
  persist(
    (set) => ({
      employees: [
        { id: 1, name: 'Aziz Rahimov', position: 'Sotuvchi', department: 'Savdo', phone: '+998 90 123 45 67', status: 'Faol' },
        { id: 2, name: 'Malika Karimova', position: 'Bosh Buxgalter', department: 'Moliya', phone: '+998 93 987 65 43', status: 'Faol' },
        { id: 3, name: "Jasur To'rayev", position: 'Ombor mudiri', department: 'Ombor', phone: '+998 99 111 22 33', status: "Faol" },
        { id: 4, name: 'Nodira Aliyeva', position: 'HR Menejer', department: 'HR', phone: '+998 97 222 33 44', status: 'Faol' },
        { id: 5, name: 'Dilshod Raxmatov', phone: '+998 90 333 44 55', position: 'Logistik', department: 'Logistika', status: 'Faol' },
        { id: 6, name: 'Shahnoza Umarova', phone: '+998 94 444 55 66', position: 'Sotuvchi', department: 'Savdo', status: "Ta'tilda" },
        { id: 7, name: 'Otabek Qosimov', phone: '+998 93 555 66 77', position: 'Kassir', department: 'Moliya', status: 'Faol' },
        { id: 8, name: 'Sardor Karimov', phone: '+998 99 666 77 88', position: 'Omborchi', department: 'Ombor', status: 'Faol' },
        { id: 9, name: 'Alisher Vohidov', phone: '+998 90 777 88 99', position: 'Bosh Omborchi', department: 'Ombor', status: 'Faol' },
        { id: 10, name: 'Zarina Rustamova', phone: '+998 97 888 99 00', position: 'Mijozlar bilan ishlash', department: 'Savdo', status: 'Nofaol' },
        { id: 11, name: 'Umidjon Qosimov', phone: '+998 94 999 00 11', position: 'Omborchi', department: 'Ombor', status: 'Faol' },
        { id: 12, name: 'Iroda Xusanova', phone: '+998 93 000 11 22', position: 'Marketing menejeri', department: 'Savdo', status: 'Faol' },
        { id: 13, name: 'Jamshid Tursunov', phone: '+998 99 111 22 33', position: 'Haydovchi', department: 'Logistika', status: 'Faol' },
        { id: 14, name: 'Botir Mamatov', phone: '+998 90 222 33 44', position: 'Kuzatuvchi', department: 'Xavfsizlik', status: 'Faol' },
        { id: 15, name: 'Gulnora Ismoilova', phone: '+998 97 333 44 55', position: 'Farrosh', department: 'Xo\'jalik', status: 'Faol' },
      ],
      departments: [
        { id: 1, name: "Rahbariyat", manager: 'Rustam Abdullayev', employeeCount: 3 },
        { id: 2, name: "Savdo bo'limi", manager: 'Aziz Rahimov', employeeCount: 12 },
        { id: 3, name: "Moliya bo'limi", manager: 'Malika Karimova', employeeCount: 4 },
        { id: 4, name: 'Ombor', manager: "Jasur To'rayev", employeeCount: 8 },
        { id: 5, name: "Logistika", manager: 'Dilshod Raxmatov', employeeCount: 6 },
        { id: 6, name: "HR", manager: 'Nodira Aliyeva', employeeCount: 2 },
      ],
      addEmployee: (emp) => set((state) => ({ 
        employees: [...state.employees, { ...emp, id: Date.now() }] 
      })),
      addDepartment: (dept) => set((state) => ({ 
        departments: [...state.departments, { ...dept, id: Date.now() }] 
      })),
      deleteEmployee: (id) => set((state) => ({
        employees: state.employees.filter(e => e.id !== id)
      })),
    }),
    {
      name: 'inazorat-hr-storage-v2',
    }
  )
);
