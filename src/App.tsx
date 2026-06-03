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
import Guide from './pages/help/Guide';
import Login from './pages/auth/Login';

import ReportsLayout from './pages/reports/ReportsLayout';
import ReportsList from './pages/reports/ReportsList';
import ReportView from './pages/reports/ReportView';

import CRMLayout from './pages/crm/CRMLayout';
import Clients from './pages/crm/Clients';
import Orders from './pages/crm/Orders';
import Categories from './pages/crm/Categories';

import SupplyLayout from './pages/supply/SupplyLayout';
import Purchases from './pages/supply/Purchases';
import Suppliers from './pages/supply/Suppliers';
import SupplyRequests from './pages/supply/Requests';
import Returns from './pages/supply/Returns';

// Distribution
import DistributionLayout from './pages/distribution/DistributionLayout';
import Drivers from './pages/distribution/Drivers';
import Shipments from './pages/distribution/Shipments';

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

import POSLayout from './pages/pos/POSLayout';
import POSLauncher from './pages/pos/POSLauncher';
import POS from './pages/pos/POS';

import ProductionLayout from './pages/production/ProductionLayout';
import ProductionOrders from './pages/production/Orders';
import Formulas from './pages/production/Formulas';

const queryClient = new QueryClient();

import { Toaster } from 'sonner';
import { useThemeStore } from './store/useThemeStore';

import { useEffect } from 'react';

function App() {
  const { theme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<AuthGuard />}>
            {/* Standalone POS Terminal */}
            <Route path="/pos/terminal" element={<POSLayout />}>
              <Route index element={<POS />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pos" element={<POSLauncher />} />
              <Route path="/reports" element={<ReportsLayout />}>
                <Route index element={<ReportsList />} />
                <Route path=":id" element={<ReportView />} />
              </Route>
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
                <Route path="transfers" element={<Transfers />} />
                <Route path="inventory" element={<Inventory />} />
              </Route>
              <Route path="/supply" element={<SupplyLayout />}>
                <Route index element={<Purchases />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="requests" element={<SupplyRequests />} />
                <Route path="returns" element={<Returns />} />
              </Route>
              <Route path="/distribution" element={<DistributionLayout />}>
                <Route index element={<Shipments />} />
                <Route path="shipments" element={<Shipments />} />
                <Route path="drivers" element={<Drivers />} />
              </Route>
              <Route path="/production" element={<ProductionLayout />}>
                <Route index element={<Navigate to="orders" replace />} />
                <Route path="orders" element={<ProductionOrders />} />
                <Route path="formulas" element={<Formulas />} />
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
              <Route path="/help" element={<Guide />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </QueryClientProvider>
    <Toaster 
      position="top-right"
      theme={theme}
      toastOptions={{
        style: {
          borderRadius: '16px',
        },
        classNames: {
          toast: '!backdrop-blur-2xl !shadow-[0_8px_30px_rgba(0,0,0,0.05)] !rounded-[20px]',
          success: theme === 'dark' 
            ? '!bg-emerald-950/90 !border !border-emerald-800/60 !text-emerald-100'
            : '!bg-emerald-50/90 !border !border-emerald-200/80 !text-emerald-900',
          error: theme === 'dark'
            ? '!bg-red-950/90 !border !border-red-800/60 !text-red-100'
            : '!bg-red-50/90 !border !border-red-200/80 !text-red-900',
          warning: theme === 'dark'
            ? '!bg-amber-950/90 !border !border-amber-800/60 !text-amber-100'
            : '!bg-amber-50/90 !border !border-amber-200/80 !text-amber-900',
          info: theme === 'dark'
            ? '!bg-blue-950/90 !border !border-blue-800/60 !text-blue-100'
            : '!bg-blue-50/90 !border !border-blue-200/80 !text-blue-900',
          title: '!font-semibold !text-[14px] !text-inherit',
          description: '!text-[13px] opacity-80',
        }
      }}
    />
    </>
  );
}

export default App;

