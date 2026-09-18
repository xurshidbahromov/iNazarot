import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  calculateFinancialHealth,
  generateCashFlowForecast,
  detectExpenseAnomalies,
  queryFinancialCopilot,
  type FinancialHealthScore,
  type DailyCashProjection,
  type AnomalyItem
} from '../utils/aiFinancialEngine';
import { useFinanceStore } from './useFinanceStore';
import { useCRMStore } from './useCRMStore';
import { useWarehouseStore } from './useWarehouseStore';
import { useSupplyStore } from './useSupplyStore';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  keyMetrics?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
  actionButtons?: { label: string; action: string }[];
}

interface AIState {
  isAnalyzing: boolean;
  healthScore: FinancialHealthScore;
  forecastTimeline: DailyCashProjection[];
  forecastSummary: {
    totalExpectedInflow: number;
    totalExpectedOutflow: number;
    lowestCashPoint: number;
    lowestCashDate: string;
    gapDetected: boolean;
  };
  anomalies: AnomalyItem[];
  chatMessages: ChatMessage[];
  refreshIntelligence: () => void;
  sendCopilotMessage: (text: string) => void;
  resolveAnomaly: (id: string | number) => void;
}

export const useAIStore = create<AIState>()(
  persist(
    (set, get) => ({
      isAnalyzing: false,
      healthScore: calculateFinancialHealth(
        useFinanceStore.getState().transactions,
        useCRMStore.getState().clients,
        useWarehouseStore.getState().products,
        useSupplyStore.getState().purchases
      ),
      ...(() => {
        const res = generateCashFlowForecast(
          useFinanceStore.getState().getBalance(),
          useFinanceStore.getState().transactions,
          useCRMStore.getState().clients
        );
        return {
          forecastTimeline: res.timeline,
          forecastSummary: res.summary
        };
      })(),
      anomalies: detectExpenseAnomalies(useFinanceStore.getState().transactions),
      chatMessages: [
        {
          id: 'welcome-1',
          sender: 'ai',
          text: `Salom! Men sizning **iNazorat AI moliyaviy yordamchingizman** (Copilot).

Moliyaviy ma'lumotlaringiz tahlil qilindi:
• **Salomatlik skori:** 72/100 (Yaxshi, ammo xavflar mavjud)
• **Kassa uzilishi:** 28-sentabrda 4.2M UZS defitsit kutilmoqda.
• **Xarajat anomaliyasi:** Logistika to'lovi me'yordan 625% ko'p.

Qanday savolingiz bor? Quyidagi tezkor tugmalardan birini tanlashingiz mumkin:`,
          timestamp: 'Hozir',
          actionButtons: [
            { label: 'Nega kassa kamaydi?', action: 'ask_profit_drop' },
            { label: '28-sentabr kassa uzilishini yechish', action: 'ask_cash_gap' },
            { label: 'Anomaliyalarni tahlil qilish', action: 'view_anomaly' }
          ]
        }
      ],

      refreshIntelligence: () => {
        set({ isAnalyzing: true });
        const trxs = useFinanceStore.getState().transactions;
        const clients = useCRMStore.getState().clients;
        const products = useWarehouseStore.getState().products;
        const purchases = useSupplyStore.getState().purchases;
        const balance = useFinanceStore.getState().getBalance();

        setTimeout(() => {
          const health = calculateFinancialHealth(trxs, clients, products, purchases);
          const forecastRes = generateCashFlowForecast(balance, trxs, clients);
          const anoms = detectExpenseAnomalies(trxs);

          set({
            isAnalyzing: false,
            healthScore: health,
            forecastTimeline: forecastRes.timeline,
            forecastSummary: forecastRes.summary,
            anomalies: anoms
          });
        }, 600);
      },

      sendCopilotMessage: (text: string) => {
        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          sender: 'user',
          text,
          timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };

        set(state => ({ chatMessages: [...state.chatMessages, userMsg] }));

        // AI processes message
        const { healthScore, forecastTimeline, forecastSummary, anomalies } = get();
        const aiResponse = queryFinancialCopilot(text, {
          healthScore,
          forecast: { timeline: forecastTimeline, summary: forecastSummary },
          anomalies
        });

        setTimeout(() => {
          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: aiResponse.answer,
            timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
            keyMetrics: aiResponse.keyMetrics,
            actionButtons: aiResponse.actionButtons
          };
          set(state => ({ chatMessages: [...state.chatMessages, aiMsg] }));
        }, 500);
      },

      resolveAnomaly: (id: string | number) => {
        set(state => ({
          anomalies: state.anomalies.filter(a => a.id !== id)
        }));
      }
    }),
    {
      name: 'inazorat-ai-storage-v1'
    }
  )
);
