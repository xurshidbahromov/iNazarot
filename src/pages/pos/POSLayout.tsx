import { Outlet } from 'react-router-dom';

export default function POSLayout() {
  return (
    <div className="h-screen w-screen bg-slate-100 dark:bg-[#0b0f19] overflow-hidden text-slate-800 dark:text-slate-200 font-sans relative">
       {/* Global Background for POS (matches DashboardLayout) */}
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50/50 to-emerald-50/10 dark:from-[#0b0f19] dark:via-[#0d1323] dark:to-[#0f172a]/20">
         <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-emerald-200/5 dark:bg-emerald-500/4 blur-[140px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-300/5 dark:bg-emerald-400/4 blur-[150px]" />
       </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
