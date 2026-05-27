import { create } from 'zustand';

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

export const useHRStore = create<HRState>((set) => ({
  employees: [
    { id: 1, name: 'Aziz Rahimov', position: 'Sotuvchi', department: 'Savdo', phone: '+998 90 123 45 67', status: 'Faol' },
    { id: 2, name: 'Malika Karimova', position: 'Bugalter', department: 'Moliya', phone: '+998 93 987 65 43', status: 'Faol' },
    { id: 3, name: "Jasur To'rayev", position: 'Omborchi', department: 'Ombor', phone: '+998 99 111 22 33', status: "Ta'tilda" },
  ],
  departments: [
    { id: 1, name: "Savdo bo'limi", manager: 'Aziz Rahimov', employeeCount: 12 },
    { id: 2, name: "Moliya bo'limi", manager: 'Malika Karimova', employeeCount: 4 },
    { id: 3, name: 'Ombor', manager: "Jasur To'rayev", employeeCount: 8 },
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
}));
