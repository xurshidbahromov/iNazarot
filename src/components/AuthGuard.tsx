import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// Rolga qarab ruxsat etilgan yo'nalishlar (marshrutlarning boshlang'ich qismi)
const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ['*'],
  administrator: ['*'],
  menejer: ['/', '/crm', '/warehouse', '/supply', '/production', '/distribution', '/reports', '/settings', '/pos'],
  omborchi: ['/', '/warehouse', '/supply', '/production', '/settings'],
  kasir: ['/', '/finance', '/crm', '/pos', '/settings'],
  hr: ['/', '/hr', '/settings'],
};

// Agar sahifa yopiq bo'lsa, foydalanuvchini yo'naltirish kerak bo'lgan asosiy sahifasi
const ROLE_FALLBACKS: Record<string, string> = {
  admin: '/',
  administrator: '/',
  menejer: '/',
  omborchi: '/warehouse',
  kasir: '/finance',
  hr: '/hr',
};

export default function AuthGuard() {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && user.role) {
    const role = user.role.toLowerCase();
    const permissions = ROLE_PERMISSIONS[role] || [];
    
    // Admin hamma joyga kira oladi
    if (!permissions.includes('*')) {
      const currentPath = location.pathname;
      
      // Asosiy sahifa hammaga ochiq (lekin komponent ichida ma'lumotlar filtrlanadi)
      // Faqatgina Dashboard (/) bo'lsa, o'tkazamiz. Boshqa yo'nalishlarda startsWith qilinadi.
      let isAllowed = false;
      
      if (currentPath === '/') {
        isAllowed = true; // Hammaga ochiq
      } else {
        // Ruxsat etilgan ro'yxatdan birontasiga to'g'ri kelsa (masalan: '/crm' -> '/crm/clients' ga ham o'tadi)
        isAllowed = permissions.some(path => path !== '/' && currentPath.startsWith(path));
      }

      if (!isAllowed) {
        // Ruxsatsiz yo'nalishga kirdi, o'zining asosiy sahifasiga qaytaramiz
        const fallback = ROLE_FALLBACKS[role] || '/';
        return <Navigate to={fallback} replace />;
      }
    }
  }

  return <Outlet />;
}
