import type { Product } from '../store/useWarehouseStore';
import type { Transaction } from '../store/useFinanceStore';
import type { Client, Order } from '../store/useCRMStore';

export interface AIRecommendation {
  id: string;
  type: 'finance' | 'warehouse' | 'crm' | 'general';
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  severity: 'success' | 'warning' | 'info';
}

export type BusinessGoal = 'growth' | 'efficiency' | 'debt_reduction' | 'general';

export function generateAIRecommendations(
  products: Product[],
  transactions: Transaction[],
  clients: Client[],
  orders: Order[],
  goal: BusinessGoal = 'general'
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];

  // 1. WAREHOUSE INSIGHTS (Zaxira tahlili)
  const lowStockProducts = products.filter(p => p.stock <= (p.minStock || 30));
  if (lowStockProducts.length > 0) {
    const listNames = lowStockProducts.slice(0, 2).map(p => `"${p.name}"`).join(', ');
    const countExtra = lowStockProducts.length > 2 ? ` va yana ${lowStockProducts.length - 2} ta` : '';
    
    recommendations.push({
      id: 'low-stock-alert',
      type: 'warehouse',
      title: 'Zaxira tugash xavfi mavjud',
      description: `Omborda ${listNames}${countExtra} mahsulotlari belgilangan minimal zaxira chegarasidan kam qoldi. Sotuvlar to'xtab qolmasligi uchun ta'minot bo'limiga buyurtma berishingiz tavsiya etiladi.`,
      actionText: 'Omborni tekshirish',
      actionLink: '/warehouse/products',
      severity: 'warning'
    });
  } else {
    recommendations.push({
      id: 'stock-optimized',
      type: 'warehouse',
      title: 'Zaxira balansi me\'yorda',
      description: 'Tabriklaymiz! Barcha mahsulotlar zaxirasi optimal holatda, minimal ko\'rsatkichlardan past bo\'lgan mahsulotlar aniqlanmadi.',
      actionText: 'Zaxiralarni ko\'rish',
      actionLink: '/warehouse/products',
      severity: 'success'
    });
  }

  // Overstock analysis (Zaxira to'lib ketishi)
  const overStockProducts = products.filter(p => p.stock > 1000);
  if (overStockProducts.length > 0 && goal === 'efficiency') {
    const p = overStockProducts[0];
    recommendations.push({
      id: 'over-stock-alert',
      type: 'warehouse',
      title: 'Ombor mablag\'i aylanmasi sekin',
      description: `"${p.name}" mahsulotidan omborda juda katta miqdorda (${p.stock} ${p.unit}) mavjud. Bu aylanma mablag'larning muzlab qolishiga sabab bo'ladi. Xaridlar hajmini kamaytirish yoki aksiyalar tashkil etish tavsiya etiladi.`,
      actionText: 'Tahlil qilish',
      actionLink: '/warehouse/products',
      severity: 'info'
    });
  }

  // 2. FINANCE INSIGHTS (Moliya tahlili)
  const incomeTotal = transactions.filter(t => t.type === 'Kirim').reduce((a, t) => a + t.amount * t.rate, 0);
  const expenseTotal = transactions.filter(t => t.type === 'Chiqim').reduce((a, t) => a + t.amount * t.rate, 0);
  const netProfit = incomeTotal - expenseTotal;
  const expenseRatio = incomeTotal > 0 ? (expenseTotal / incomeTotal) * 100 : 0;

  if (expenseRatio > 60) {
    recommendations.push({
      id: 'high-expenses',
      type: 'finance',
      title: 'Xarajatlar ulushi yuqori',
      description: `Ushbu oydagi umumiy tushumga nisbatan xarajatlar ${Math.round(expenseRatio)}% ni tashkil etdi. Sof daromad marjasini oshirish uchun operatsion va ma'muriy xarajatlarni qisqartirish yo'llarini tahlil qiling.`,
      actionText: 'Xarajatlarni ko\'rish',
      actionLink: '/finance/expenses',
      severity: 'warning'
    });
  } else if (netProfit > 0) {
    recommendations.push({
      id: 'financial-health',
      type: 'finance',
      title: 'Moliyaviy ko\'rsatkichlar barqaror',
      description: `Tizimdagi tushumlar xarajatlardan ${(netProfit).toLocaleString()} UZS ko'p. Biznes rentabelligi juda yaxshi holatda. Bo'sh mablag'larni investitsiya qilish haqida o'ylashingiz mumkin.`,
      actionText: 'Moliya tahlili',
      actionLink: '/finance/cashbox',
      severity: 'success'
    });
  }

  // Currency variation check
  const usdTransactions = transactions.filter(t => t.currency === 'USD');
  if (usdTransactions.length > 0 && goal === 'growth') {
    recommendations.push({
      id: 'currency-hedging',
      type: 'finance',
      title: 'Valyuta risklarini sug\'urtalash',
      description: 'Tranzaksiyalaringiz orasida chet el valyutasi (USD) ulushi mavjud. Valyuta kursi o\'zgarishi sababli foyda yo\'qotmaslik uchun milliy kursdagi shartnomalar va kelishuvlarni ustuvor qiling.',
      actionText: 'Valyuta sozlamalari',
      actionLink: '/finance/currency',
      severity: 'info'
    });
  }

  // 3. CRM & SALES INSIGHTS (Mijozlar va Sotuvlar tahlili)
  const debtClients = clients.filter(c => c.balance < 0);
  const totalDebt = Math.abs(debtClients.reduce((a, c) => a + c.balance, 0));

  if (debtClients.length > 0 && (goal === 'debt_reduction' || goal === 'general')) {
    recommendations.push({
      id: 'crm-debts',
      type: 'crm',
      title: 'Nasiya qarzdorliklarini yig\'ish',
      description: `Tizimda ${debtClients.length} ta mijozning debitor qarzdorligi mavjud. Jami kutilayotgan nasiya summasi: ${totalDebt.toLocaleString()} UZS. Balansni tiklash uchun nasiya shartlarini qayta ko'rib chiqing.`,
      actionText: 'Nasiyadorlarni ko\'rish',
      actionLink: '/crm/clients',
      severity: 'warning'
    });
  }

  // Installment alert
  const pendingOrders = orders.filter(o => o.paymentStatus === 'partial' || o.paymentStatus === 'unpaid');
  if (pendingOrders.length > 0) {
    recommendations.push({
      id: 'installment-reminder',
      type: 'crm',
      title: 'To\'lanmagan buyurtmalar nazorati',
      description: `Ayni paytda to'liq to'lanmagan ${pendingOrders.length} ta faol buyurtma mavjud. Xaridorlar bilan bog'lanib, to'lov muddatlarini eslatish va grafikni tasdiqlash lozim.`,
      actionText: 'Buyurtmalarga o\'tish',
      actionLink: '/crm/orders',
      severity: 'info'
    });
  }

  // VIP clients upgrade recommendation
  const loyalClients = clients.filter(c => c.status === 'Faol' && c.balance >= 0);
  if (loyalClients.length > 0 && goal === 'growth') {
    const c = loyalClients[0];
    recommendations.push({
      id: 'crm-vip-upgrade',
      type: 'crm',
      title: 'Sodiqlik dasturini taklif qilish',
      description: `"${c.name}" mijozining savdo faolligi yuqori. Uni "VIP Mijozlar" toifasiga o'tkazish orqali maxsus 10% chegirmali taklif berishingiz va savdolar aylanmasini yanada oshirishingiz mumkin.`,
      actionText: 'Mijoz toifasini o\'zgartirish',
      actionLink: '/crm/categories',
      severity: 'success'
    });
  }

  // 4. GOAL SPECIFIC RECOMMENDATIONS
  if (goal === 'growth' && recommendations.length < 4) {
    recommendations.push({
      id: 'goal-growth-expand',
      type: 'general',
      title: 'Yangi savdo nuqtalarini ochish',
      description: 'Faol sotuvlar va ombor balansi barqarorligi sizga yangi filiallar yoki hududiy omborlar ochish imkonini beradi. Ta\'minot tarmoqlarini kengaytirishni rejalashtiring.',
      actionText: 'Omborlar ro\'yxati',
      actionLink: '/warehouse/locations',
      severity: 'info'
    });
  }

  return recommendations;
}
