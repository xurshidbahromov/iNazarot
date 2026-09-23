/**
 * iNazorat AI — Telegram Alert & Executive Bot Service
 * Integrates with Telegram Bot API to deliver real-time financial risk alerts
 * directly to CFO / SMB Business Owner smartphones.
 */

export interface TelegramSettings {
  botToken: string;
  chatId: string;
  isEnabled: boolean;
  alertOnCashGap: boolean;
  alertOnAnomaly: boolean;
  alertOnDailyDigest: boolean;
}

export const DEFAULT_TELEGRAM_SETTINGS: TelegramSettings = {
  botToken: '8907672296:AAGPrCJsttAnj0YitLATRh6M1QyzTkn2tsU',
  chatId: '2064830631',
  isEnabled: true,
  alertOnCashGap: true,
  alertOnAnomaly: true,
  alertOnDailyDigest: true,
};

export const OFFICIAL_BOT_USERNAME = 'inazorat_ai_test_bot';

/**
 * Automatically inspects the bot's getUpdates feed to find the latest
 * user who sent /start or messaged the bot, returning their chat_id.
 */
export async function getLatestChatId(
  token: string
): Promise<{ success: boolean; chatId?: string; senderName?: string; message?: string }> {
  const cleanToken = token.trim();
  if (!cleanToken) {
    return { success: false, message: "Bot token kiritilmagan." };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${cleanToken}/getUpdates`);
    const data = await response.json();

    if (!data.ok) {
      return { success: false, message: data.description || "Telegram API xatoligi yuz berdi." };
    }

    if (!data.result || data.result.length === 0) {
      return {
        success: false,
        message: "Botga hali hech kim /start bosmagan. Iltimos, avval @inazorat_ai_test_bot ga kirib Start tugmasini bosing."
      };
    }

    // Find the newest message with chat info
    for (let i = data.result.length - 1; i >= 0; i--) {
      const update = data.result[i];
      const msg = update.message || update.edited_message || update.channel_post || update.my_chat_member;
      const chat = msg?.chat;
      const from = msg?.from;

      if (chat?.id) {
        return {
          success: true,
          chatId: String(chat.id),
          senderName: from?.first_name || from?.username || chat?.title || 'Foydalanuvchi'
        };
      }
    }

    return { success: false, message: "Chat ID aniqlanmadi." };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Tarmoq xatosi: ${errorMsg}` };
  }
}

const STORAGE_KEY = 'inazorat_telegram_settings';

export function getStoredTelegramSettings(): TelegramSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_TELEGRAM_SETTINGS,
        ...parsed,
        botToken: parsed.botToken || DEFAULT_TELEGRAM_SETTINGS.botToken,
        chatId: parsed.chatId || DEFAULT_TELEGRAM_SETTINGS.chatId,
      };
    }
  } catch (e) {
    console.error('Error reading telegram settings:', e);
  }
  return DEFAULT_TELEGRAM_SETTINGS;
}

export function saveTelegramSettings(settings: TelegramSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving telegram settings:', e);
  }
}

/**
 * Sends a message via Telegram Bot API using HTML format and inline buttons.
 */
export async function sendTelegramMessage(
  token: string,
  chatId: string,
  htmlText: string,
  replyMarkup?: { inline_keyboard: Array<Array<{ text: string; url?: string; callback_data?: string }>> }
): Promise<{ success: boolean; message?: string }> {
  if (!token.trim() || !chatId.trim()) {
    return { success: false, message: "Bot token va Chat ID kiritilmagan." };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: htmlText,
        parse_mode: 'HTML',
        reply_markup: replyMarkup,
      }),
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true, message: "Xabar Telegramga muvaffaqiyatli yetkazildi!" };
    } else {
      return { success: false, message: data.description || "Telegram API xatoligi yuz berdi." };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Tarmoq xatosi: ${errorMsg}` };
  }
}

/**
 * Message template: 28-September Cash Gap Warning
 */
export function formatCashGapTelegramMessage(
  gapDate: string = '28-sentabr',
  deficitAmount: string = '4,200,000',
  totalMandatoryOutflow: string = '32,000,000'
): string {
  return `⚠️ <b>iNazorat AI — KASSA UZILISHI OGOHLANTIRISHI!</b>

Hurmatli rahbar, kelgusi <b>${gapDate}</b> kuni kassangizda <b>-${deficitAmount} UZS defitsit</b> (kassa uzilishi) kutilmoqda.

📊 <b>Xavf omillari:</b>
• Rejalashtirilgan chiqimlar: <b>${totalMandatoryOutflow} UZS</b> (Oylik va ijara to'lovlari)
• Kassa uzilish sanasi: <b>${gapDate}</b>
• Xavf darajasi: 🔴 <b>Kritik (Kassa yetishmovchiligi)</b>

💡 <b>AI Prescriptive Tavsiyasi:</b>
1. <b>"Artel MChJ"</b> (9,500,000 UZS) va <b>"Samarqand Savdo"</b> (4,700,000 UZS) nasiyalarini 26-sentabrgacha undirishni jadallashtirish.
2. 1 ta rejalashtirilgan xomashyo xaridini (5,000,000 UZS) 5 kunga kechiktirish.

<i>Natija: Kassa balansi +10,300,000 UZS xavfsiz holatga keladi.</i>`;
}

/**
 * Message template: Statistical Anomaly (Logistics Expense Spike)
 */
export function formatAnomalyTelegramMessage(
  title: string,
  category: string,
  paidAmount: number,
  historicalAvg: number,
  spikePercent: number
): string {
  return `🚨 <b>iNazorat AI — ANOMAL XARAJAT ANIQLANDI!</b>

Kompaniya tranzaksiyalari tahlilida statistik chegaradan chetga chiqqan shubhali to'lov qayd etildi:

📌 <b>To'lov tafsilotlari:</b>
• Xarajat nomi: <b>${title}</b>
• Toifa: <b>${category}</b>
• To'langan summa: <b>${paidAmount.toLocaleString()} UZS</b>
• Odatdagi o'rtacha: <b>${historicalAvg.toLocaleString()} UZS</b>
• Spayk og'ishi: 🔴 <b>+${spikePercent}% (${(paidAmount / (historicalAvg || 1)).toFixed(1)}x barobar yuqori)</b>

🔍 <b>AI Tahlil:</b> Oxirgi 90 kunlik Z-score ko'rsatkichi 2.5σ chegarasidan oshgan. Shartnoma shartlarini va haydovchi tariflarini darhol tekshirish tavsiya etiladi.`;
}

/**
 * Message template: Daily Financial Health Digest
 */
export function formatDailyDigestTelegramMessage(
  healthScore: number = 72,
  status: string = "O'rtacha",
  risksCount: number = 3,
  currentBalance: string = "31,850,000"
): string {
  return `📈 <b>iNazorat AI — KUNLIK MOLIYAVIY XULOSA</b>

🗓 <b>Sana:</b> ${new Date().toLocaleDateString('uz-UZ')}
💰 <b>Kassa umumiy qoldig'i:</b> ${currentBalance} UZS
🩺 <b>Moliyaviy Salomatlik Indeksi:</b> <b>${healthScore}/100</b> (${status})

⚠️ <b>Faol xavflar:</b> ${risksCount} ta
1. 28-sentabr kassa uzilishi xavfi (-4.2M UZS)
2. Logistika xarajatlarida +625% anomaliya
3. 2 ta yirik mijozdan to'lovlar kechikishi (14.2M UZS)

<i>Barcha tahlillarni ko'rish uchun iNazorat AI boshqaruv paneliga kiring.</i>`;
}
