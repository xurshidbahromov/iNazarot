import * as XLSX from 'xlsx';

/**
 * Ma'lumotlarni qabul qilib uni Excel (.xlsx) formatida yuklab beruvchi universal funksiya.
 * @param data Excelga yoziladigan JSON ma'lumotlar massivi
 * @param fileName Yuklanadigan fayl nomi (masalan: "Hisobot")
 */
export function exportToExcel(data: unknown[], fileName: string) {
  if (!data || data.length === 0) {
    alert("Yuklash uchun ma'lumot topilmadi!");
    return;
  }

  // 1. JSON ma'lumotni Excel ishchi varag'iga (worksheet) o'tkazish
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 2. Yangi ishchi kitobi (workbook) yaratish
  const workbook = XLSX.utils.book_new();

  // 3. Varag'ni kitobga qo'shish
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hisobot');

  // 4. Joriy sana bilan fayl nomini shakllantirish
  const dateStr = new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date()).replace(/\//g, '.');

  const finalFileName = `${fileName}_${dateStr}.xlsx`;

  // 5. Kitobni kompyuterga saqlash (yuklab olish)
  XLSX.writeFile(workbook, finalFileName);
}
