import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AuthGuard from './components/AuthGuard';


import HRLayout from './pages/hr/HRLayout';
import Employees from './pages/hr/Employees';
import Departments from './pages/hr/Departments';
import Positions from './pages/hr/Positions';
import Permissions from './pages/hr/Permissions';
import SettingsPage from './pages/settings/SettingsPage';
import Login from './pages/auth/Login';

import CRMLayout from './pages/crm/CRMLayout';
import Clients from './pages/crm/Clients';
import Orders from './pages/crm/Orders';
import Categories from './pages/crm/Categories';

import SupplyLayout from './pages/supply/SupplyLayout';
import Purchases from './pages/supply/Purchases';
import Suppliers from './pages/supply/Suppliers';
import Requests from './pages/supply/Requests';
import Returns from './pages/supply/Returns';

import WarehouseLayout from './pages/warehouse/WarehouseLayout';
import Products from './pages/warehouse/Products';
import Locations from './pages/warehouse/Locations';
import Inventory from './pages/warehouse/Inventory';
import Transfers from './pages/warehouse/Transfers';
import WarehouseDrafts from './pages/warehouse/Drafts';
import WarehouseScheduled from './pages/warehouse/Scheduled';

import FinanceLayout from './pages/finance/FinanceLayout';
import Cashbox from './pages/finance/Cashbox';
import Expenses from './pages/finance/Expenses';
import Currency from './pages/finance/Currency';

import POS from './pages/pos/POS';

const queryClient = new QueryClient();



import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<AuthGuard />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pos" element={<POS />} />
              <Route path="/crm" element={<CRMLayout />}>
                <Route index element={<Navigate to="clients" replace />} />
                <Route path="clients" element={<Clients />} />
                <Route path="orders" element={<Orders />} />
                <Route path="categories" element={<Categories />} />
              </Route>
              <Route path="/warehouse" element={<WarehouseLayout />}>
                <Route index element={<Navigate to="products" replace />} />
                <Route path="products" element={<Products />} />
                <Route path="drafts" element={<WarehouseDrafts />} />
                <Route path="scheduled" element={<WarehouseScheduled />} />
                <Route path="locations" element={<Locations />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="transfers" element={<Transfers />} />
              </Route>
              <Route path="/supply" element={<SupplyLayout />}>
                <Route index element={<Navigate to="purchases" replace />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="requests" element={<Requests />} />
                <Route path="returns" element={<Returns />} />
              </Route>
              <Route path="/finance" element={<FinanceLayout />}>
                <Route index element={<Navigate to="cashbox" replace />} />
                <Route path="cashbox" element={<Cashbox />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="currency" element={<Currency />} />
              </Route>
              <Route path="/hr" element={<HRLayout />}>
                <Route index element={<Navigate to="employees" replace />} />
                <Route path="employees" element={<Employees />} />
                <Route path="departments" element={<Departments />} />
                <Route path="positions" element={<Positions />} />
                <Route path="permissions" element={<Permissions />} />
              </Route>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </QueryClientProvider>
    <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
