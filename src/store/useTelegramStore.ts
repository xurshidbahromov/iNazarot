import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  type TelegramSettings,
  DEFAULT_TELEGRAM_SETTINGS,
  sendTelegramMessage,
  formatCashGapTelegramMessage
} from '../utils/telegramService';
import { toast } from 'sonner';

interface AlertModalData {
  title: string;
  htmlText: string;
  type: 'gap' | 'anomaly' | 'digest';
  actionLabel?: string;
  onAction?: () => void;
}

interface TelegramState {
  settings: TelegramSettings;
  updateSettings: (partial: Partial<TelegramSettings>) => void;
  isModalOpen: boolean;
  modalData: AlertModalData;
  isSending: boolean;
  openAlertModal: (data?: Partial<AlertModalData>) => void;
  closeAlertModal: () => void;
  sendAlertToTelegram: (customText?: string) => Promise<boolean>;
}

const DEFAULT_MODAL_DATA: AlertModalData = {
  title: "Kassa Uzilishi Xavfi (28-sentabr)",
  htmlText: formatCashGapTelegramMessage('28-sentabr', '4,200,000', '32,000,000'),
  type: 'gap',
  actionLabel: "AI Rejasini Qo'llash",
};

export const useTelegramStore = create<TelegramState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_TELEGRAM_SETTINGS,

      updateSettings: (partial) => {
        set((state) => ({
          settings: { ...state.settings, ...partial },
        }));
        toast.success("Telegram sozlamalari saqlandi!");
      },

      isModalOpen: false,
      modalData: DEFAULT_MODAL_DATA,
      isSending: false,

      openAlertModal: (data) => {
        set({
          isModalOpen: true,
          modalData: { ...DEFAULT_MODAL_DATA, ...data },
        });
      },

      closeAlertModal: () => {
        set({ isModalOpen: false });
      },

      sendAlertToTelegram: async (customText) => {
        const { settings, modalData } = get();
        const textToSend = customText || modalData.htmlText;

        if (!settings.botToken || !settings.chatId) {
          toast.info("Telegram Bot Token va Chat ID kiritilmagan. Smartfon simulyatorida ko'rsatilmoqda.");
          return false;
        }

        set({ isSending: true });
        try {
          const res = await sendTelegramMessage(
            settings.botToken,
            settings.chatId,
            textToSend,
            {
              inline_keyboard: [
                [
                  { text: "✅ AI Rejasini Qo'llash", callback_data: "apply_ai_fix" },
                  { text: "📊 iNazorat'da Ko'rish", url: "https://inazorat.uz/ai/forecast" }
                ]
              ]
            }
          );

          set({ isSending: false });
          if (res.success) {
            toast.success("Xabarnoma Telegramga yuborildi! 📲");
            return true;
          } else {
            toast.error(`Telegram xatosi: ${res.message}`);
            return false;
          }
        } catch {
          set({ isSending: false });
          toast.error("Xabar yuborishda xatolik yuz berdi.");
          return false;
        }
      },
    }),
    {
      name: 'inazorat_telegram_store',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
