import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [
        {
          id: '1',
          title: 'Tizim yangilanishi',
          description: "iNazorat v2.0 tizimi muvaffaqiyatli ishga tushirildi. Yangi logistika va moliya bo'limlari qo'shildi.",
          date: new Date().toISOString(),
          isRead: false,
          type: 'info',
        },
        {
          id: '2',
          title: 'Ombor qoldig\'i kam',
          description: '"Un Oliy nav" mahsulotining qoldig\'i minimal chegaradan tushib ketdi (Qoldiq: 45 kg).',
          date: new Date(Date.now() - 3600000).toISOString(),
          isRead: false,
          type: 'warning',
          link: '/warehouse/inventory'
        }
      ],
      addNotification: (n) => set((state) => ({
        notifications: [
          {
            ...n,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            isRead: false
          },
          ...state.notifications
        ]
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true }))
      })),
      clearAll: () => set({ notifications: [] }),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
    }),
    {
      name: 'inazorat-notifications',
    }
  )
);
