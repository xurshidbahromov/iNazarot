import { Outlet } from 'react-router-dom';

export default function POSLayout() {
  return (
    <div className="h-screen w-screen bg-slate-100 overflow-hidden text-slate-800 font-sans relative">
      {/* Global Background for POS */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-slate-100 via-white to-blue-50/30">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
