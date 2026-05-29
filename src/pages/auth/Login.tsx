import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, LayoutDashboard, ShoppingCart, Users, Wallet } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const features = [
  { icon: LayoutDashboard, title: 'Yagona boshqaruv', desc: 'Barcha jarayonlarni bitta joydan nazorat qiling' },
  { icon: ShoppingCart, title: 'POS va Savdo', desc: 'Chakana va ulgurji savdolarni oson boshqaring' },
  { icon: Wallet, title: 'Moliya va Kassa', desc: 'Kirim-chiqimlarni aniq va ishonchli hisoblang' },
  { icon: Users, title: 'HR va CRM', desc: 'Xodimlar va mijozlar bilan ishlashni avtomatlashtiring' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: 'admin@inazorat.uz', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email va parolni kiriting');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (form.email === 'admin@inazorat.uz' && form.password === 'admin123') {
        login({ id: '1', name: 'Admin User', email: form.email, role: 'Administrator' });
        navigate('/');
      } else {
        setError("Login yoki parol noto'g'ri. admin@inazorat.uz / admin123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">

          <div className="flex items-center mb-10">
            <div className="relative flex items-center pr-3">
              <span className="text-[40px] font-bold tracking-tight text-slate-800 leading-none" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                iNazorat
              </span>
              
              {/* Double Chevron Growth Arrow (Elevate logo style representing scale & automation) */}
              <svg 
                className="w-[22px] h-[22px] text-[#20c997] absolute top-[-1px] -right-[10px] drop-shadow-sm" 
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Xush kelibsiz 👋</h2>
            <p className="mt-2 text-sm text-slate-500">
              Tizimga kirish uchun ma'lumotlaringizni kiriting
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">Parol</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
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

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-slate-600">Eslab qolish</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Parolni unutdingizmi?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Right Feature Side */}
      <div className="hidden lg:flex flex-1 bg-slate-50 border-l border-slate-200 p-12 items-center justify-center relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        
        <div className="max-w-lg w-full relative z-10">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-slate-900">Biznesingizni yagona tizimda boshqaring</h3>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Barcha bo'limlarni bitta platformaga birlashtirish orqali vaqtingizni tejab, samaradorlikni oshiring.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-600" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{feature.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
