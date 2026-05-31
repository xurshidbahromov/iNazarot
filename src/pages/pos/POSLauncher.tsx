import { MonitorPlay, ShieldCheck, ArrowRight, Wifi, Battery, ReceiptText, ShoppingCart, CreditCard, ScanBarcode } from 'lucide-react';

export default function POSLauncher() {
  const launchTerminal = () => {
    window.open('/pos/terminal', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-full flex font-sans relative overflow-hidden">



      {/* ── LEFT: Text & Actions ── */}
      <div className="flex-[0.8] lg:flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 relative z-20">
        <div className="mx-auto w-full max-w-md">

          {/* Heading */}
          <div className="mb-10 select-none">
            <h1 className="text-[40px] font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 leading-tight">
              Hamma savdo —<br />
              <span className="text-emerald-600">bir joyda.</span>
            </h1>

            <p className="text-[16px] text-slate-500 font-medium leading-relaxed max-w-sm">
              Tezkor, ishonchli va to'liq ekranli kassa terminali. Savdolaringizni ushbu terminal orqali boshqaring — hech qanday kechikishsiz.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {[
              { icon: ScanBarcode, label: 'Shtrix-kod' },
              { icon: CreditCard, label: 'Karta & Naqd' },
              { icon: ReceiptText, label: 'Chek chiqarish' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 border border-slate-200/60 rounded-full shadow-sm text-[13px] font-semibold text-slate-600">
                <Icon className="w-4 h-4 text-emerald-500" />
                {label}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={launchTerminal}
            className="group w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-[15px] font-bold rounded-xl hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3)] active:scale-[0.98]"
          >
            <MonitorPlay className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Yangi oynada ishga tushirish
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" strokeWidth={2} />
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>PIN-kod orqali himoyalangan kirish</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: CSS-drawn POS Terminal Visual ── */}
      <div className="hidden lg:flex flex-1 relative z-10 items-center justify-center p-10 xl:p-16">

        {/* ── Main POS Terminal Device ── */}
        <div className="relative w-full max-w-[500px] group">

          {/* Terminal Body */}
          <div className="relative bg-white/70 backdrop-blur-3xl border-2 border-white/80 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.12)] transition-all duration-700 p-6">

            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="w-20 h-2.5 bg-slate-800 rounded-full mb-1.5" />
                  <div className="w-14 h-2 bg-slate-200 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Wifi className="w-4 h-4 text-emerald-500" />
                <Battery className="w-4 h-4" />
                <div className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                  14:38
                </div>
              </div>
            </div>

            {/* Product List + Cart Preview */}
            <div className="flex gap-4">
              {/* Products Grid */}
              <div className="flex-1 grid grid-cols-2 gap-3">
                {[
                  { label: "Mahsulot A", price: "45 000", color: "bg-emerald-50 border-emerald-100" },
                  { label: "Mahsulot B", price: "12 500", color: "bg-teal-50 border-teal-100" },
                  { label: "Mahsulot C", price: "89 000", color: "bg-slate-50 border-slate-100" },
                  { label: "Mahsulot D", price: "32 000", color: "bg-emerald-50 border-emerald-100" },
                ].map((item, i) => (
                  <div key={i} className={`${item.color} border rounded-xl p-3 hover:shadow-md transition-all cursor-default`}>
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm mb-2 flex items-center justify-center">
                      <div className="w-4 h-4 rounded bg-slate-200" />
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full mb-1.5" />
                    <div className="w-2/3 h-2 bg-slate-200 rounded-full mb-2" />
                    <div className="text-[11px] font-bold text-emerald-600">{item.price}</div>
                  </div>
                ))}
              </div>

              {/* Cart Side */}
              <div className="w-[150px] flex flex-col bg-slate-50/80 border border-slate-100 rounded-xl p-3 gap-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Savat</div>
                {[
                  { w: "w-full", color: "bg-emerald-100" },
                  { w: "w-4/5", color: "bg-teal-100" },
                  { w: "w-full", color: "bg-slate-200" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 bg-white rounded-lg p-2 border border-slate-100`}>
                    <div className={`w-5 h-5 rounded ${item.color} flex-shrink-0`} />
                    <div className={`${item.w} h-1.5 bg-slate-200 rounded-full`} />
                  </div>
                ))}
                <div className="mt-auto pt-2 border-t border-slate-100">
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mb-1.5" />
                  <div className="text-[12px] font-black text-slate-800">166 500</div>
                  <div className="text-[9px] text-slate-400 font-medium">UZS</div>
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-200">
                    <div className="w-3 h-3 rounded-sm bg-white/40" />
                  </div>
                  <div className="h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Floating: Receipt Card ── */}
          <div
            className="absolute -bottom-8 -left-10 w-44 bg-white/85 backdrop-blur-2xl border-2 border-white/80 rounded-[20px] p-4 shadow-2xl"
            style={{ animation: 'float 7s ease-in-out infinite' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ReceiptText className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="w-16 h-2 bg-slate-200 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="w-16 h-1.5 bg-slate-200 rounded-full" />
                <div className="w-10 h-1.5 bg-emerald-200 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                <div className="w-8 h-1.5 bg-emerald-200 rounded-full" />
              </div>
              <div className="border-t border-dashed border-slate-200 pt-1.5 mt-1.5 flex justify-between items-center">
                <div className="w-10 h-2 bg-slate-300 rounded-full" />
                <div className="w-14 h-2 bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* ── Floating: NFC Payment Badge ── */}
          <div
            className="absolute -top-6 -right-8 w-28 h-28 bg-white/80 backdrop-blur-xl border-2 border-white/80 rounded-full flex flex-col items-center justify-center shadow-xl gap-1"
            style={{ animation: 'float 5s ease-in-out infinite 1s' }}
          >
            <div className="w-14 h-14 rounded-full border-[6px] border-emerald-400 border-t-transparent border-l-transparent rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-emerald-500" />
            </div>
          </div>

          {/* ── Floating: Glowing Orb ── */}
          <div className="absolute top-1/2 -right-16 w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 shadow-[0_0_35px_rgba(52,211,153,0.6)] animate-pulse" />

          {/* ── Floating: Barcode Scan indicator ── */}
          <div
            className="absolute -bottom-4 right-10 bg-white/80 backdrop-blur-xl border-2 border-white/80 rounded-xl p-2.5 shadow-xl flex items-center gap-2"
            style={{ animation: 'float 6s ease-in-out infinite 2s' }}
          >
            <ScanBarcode className="w-5 h-5 text-emerald-500" />
            <div className="space-y-1">
              <div className="w-16 h-1.5 bg-slate-200 rounded-full" />
              <div className="w-10 h-1.5 bg-emerald-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
