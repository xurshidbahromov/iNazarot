import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email va parolni kiriting');
      return;}
    setLoading(true);
    setTimeout(() => {
      if (form.email ==='admin@inazorat.uz' && form.password ==='admin123') {
        login({ id:'1', name:'Admin User', email: form.email, role:'Administrator'});
        navigate('/');} else {
        toast.error("Login yoki parol noto'g'ri");
        setLoading(false);}}, 800);};

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans relative overflow-hidden">
      
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-[100px] rotate-45 bg-gradient-to-br from-emerald-100/60 to-teal-100/30 blur-3xl opacity-80" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-slate-200/40 blur-3xl opacity-60" />
      </div>

      {/* Left Form Side */}
      <div className="flex-[0.8] lg:flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 relative z-20">
        <div className="mx-auto w-full max-w-sm">

          <div className="flex items-center mb-10">
            <div className="relative flex items-center pr-3">
              <span className="text-[40px] font-bold tracking-tight text-slate-800 leading-none" style={{ fontFamily:"'Quicksand', sans-serif"}}>
                iNazorat
              </span>
              <svg 
                className="w-[22px] h-[22px] text-[#20c997] absolute top-[-1px] -right-[10px] drop-shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M11 5 H 19 V 13" />
                <path d="M5 11 H 13 V 19" />
              </svg>
            </div>
          </div>

          <div className="mb-10 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/80 border border-slate-200/60 shadow-sm mb-6">
               <div className="w-2 h-2 rounded-full bg-emerald-500 relative">
                 <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
               </div>
               <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
                 iNazorat Boshqaruv Tizimi
               </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-[42px] mb-3 leading-tight">
              Xush kelibsiz.
            </h1>
            
            <p className="text-[15px] text-slate-500 font-medium leading-relaxed max-w-sm">
              Tizimga xavfsiz kirish uchun elektron pochta va parolingizni kiriting.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Elektron pochta</label>
              <input
                id="email"
                type="email"
                placeholder="admin@inazorat.uz"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value})}
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50/50 backdrop-blur-sm border-2 border-slate-200/60 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all hover:bg-slate-50/80"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">Parol</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ?'text' :'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value})}
                  autoComplete="current-password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 bg-slate-50/50 backdrop-blur-sm border-2 border-slate-200/60 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all hover:bg-slate-50/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" strokeWidth={1.6} />
                    : <Eye className="w-4 h-4" strokeWidth={1.6} />}
                </button>
              </div>
            </div>



            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm text-slate-600">Eslab qolish</span>
              </label>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                Parolni unutdingizmi?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Kirilmoqda...
                </>
              ) : (
                <>
                  Tizimga kirish
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-200" strokeWidth={1.6} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-xs text-center text-slate-400">
            Test: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">admin@inazorat.uz</span> / <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">admin123</span>
          </p>
        </div>
      </div>

      {/* Right Feature Side - Abstract CSS Illustration */}
      <div className="hidden lg:flex flex-1 relative z-10 items-center justify-center p-10 xl:p-20">
        
        {/* Main Floating Dashboard Container */}
        <div className="relative w-full max-w-[750px] aspect-[16/10] bg-white/70 backdrop-blur-3xl border-2 border-white/80 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex overflow-hidden group hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.1)] transition-all duration-700">
          
          {/* Dashboard Sidebar */}
          <div className="w-[64px] bg-slate-50/50 border-r border-slate-200/50 flex flex-col items-center py-6 gap-5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20" />
            <div className="w-6 h-6 rounded-lg bg-slate-200" />
            <div className="w-6 h-6 rounded-lg bg-slate-200" />
            <div className="w-6 h-6 rounded-lg bg-slate-200" />
          </div>

          {/* Dashboard Main Content Area */}
          <div className="flex-1 p-8 flex flex-col gap-6">
            
            {/* Top row - Charts */}
            <div className="flex gap-6 h-[180px]">
              {/* Bar Chart Block */}
              <div className="flex-1 bg-white/60 rounded-[20px] border border-white/60 p-5 flex items-end justify-between gap-4 relative overflow-hidden shadow-sm">
                <div className="absolute top-5 left-5 w-24 h-3 rounded-full bg-slate-200" />
                <div className="w-full bg-emerald-200/60 rounded-t-lg h-[40%] transition-all duration-1000 group-hover:h-[60%]" />
                <div className="w-full bg-teal-400/80 rounded-t-lg h-[70%] transition-all duration-1000 group-hover:h-[80%]" />
                <div className="w-full bg-slate-200 rounded-t-lg h-[30%] transition-all duration-1000 group-hover:h-[40%]" />
                <div className="w-full bg-emerald-500 rounded-t-lg h-[90%] transition-all duration-1000 group-hover:h-[95%]" />
                <div className="w-full bg-slate-300/80 rounded-t-lg h-[50%] transition-all duration-1000 group-hover:h-[65%]" />
              </div>

              {/* Pie Chart Block */}
              <div className="w-[180px] flex-shrink-0 bg-white/60 rounded-[20px] border border-white/60 p-5 flex items-center justify-center shadow-sm relative">
                <div className="absolute top-5 left-5 w-16 h-3 rounded-full bg-slate-200" />
                 {/* CSS Pie Chart */}
                 <div className="w-28 h-28 rounded-full transform rotate-12" style={{ background: 'conic-gradient(#10b981 0% 35%, #6ee7b7 35% 75%, #e2e8f0 75% 100%)' }} />
              </div>
            </div>

            {/* Bottom row - Lists and Stats */}
            <div className="flex-1 flex gap-6">
               <div className="flex-1 space-y-4">
                 <div className="h-12 bg-white/60 rounded-xl border border-white/60 flex items-center px-4 shadow-sm">
                   <div className="w-8 h-8 rounded bg-emerald-100 mr-4" />
                   <div className="w-32 h-2 rounded-full bg-slate-200" />
                 </div>
                 <div className="h-12 bg-white/60 rounded-xl border border-white/60 flex items-center px-4 shadow-sm">
                   <div className="w-8 h-8 rounded bg-teal-100 mr-4" />
                   <div className="w-24 h-2 rounded-full bg-slate-200" />
                 </div>
               </div>
               <div className="w-[200px] bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-[20px] border border-emerald-500/20 p-5 shadow-sm">
                 <div className="w-20 h-3 rounded-full bg-emerald-500/40 mb-5" />
                 <div className="w-full h-2.5 rounded-full bg-emerald-500/20 mb-3" />
                 <div className="w-3/4 h-2.5 rounded-full bg-emerald-500/20 mb-3" />
                 <div className="w-5/6 h-2.5 rounded-full bg-emerald-500/20" />
               </div>
            </div>
          </div>
        </div>

        {/* Floating Abstract Decorative Elements */}
        
        {/* Floating Ring/Pie Piece */}
        <div className="absolute top-10 left-10 lg:left-0 xl:left-10 w-28 h-28 bg-white/50 backdrop-blur-xl border-2 border-white/80 rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{ animationDuration: '6s' }}>
           <div className="w-16 h-16 rounded-full border-[12px] border-emerald-400 border-t-transparent border-l-transparent rotate-45" />
        </div>

        {/* Floating Stats Card */}
        <div className="absolute bottom-12 right-10 lg:-right-4 xl:right-10 w-40 bg-white/80 backdrop-blur-2xl border-2 border-white/80 rounded-[20px] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
           <div className="w-16 h-2 rounded-full bg-slate-200 mb-4" />
           <div className="flex items-end justify-between gap-2 h-14">
             <div className="w-full bg-slate-200 rounded-sm h-[30%]" />
             <div className="w-full bg-emerald-300 rounded-sm h-[60%]" />
             <div className="w-full bg-emerald-500 rounded-sm h-[100%]" />
             <div className="w-full bg-slate-200 rounded-sm h-[50%]" />
           </div>
        </div>

        {/* Glowing Orb */}
        <div className="absolute top-1/4 right-20 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 shadow-[0_0_40px_rgba(52,211,153,0.6)] animate-pulse" />

      </div>
    </div>
  );
}
