import { useState} from'react';
import { Globe, Shield, Wallet, Bell, Smartphone, Box, Package, Save, Building, Mail, Phone, MapPin, Settings} from'lucide-react';
import { cn} from'../../utils/cn';

const categories = [
  { id:'general', name:'Umumiy', icon: Globe, description:"Tashkilot ma'lumotlari, valyuta"},
  { id:'payment', name:"To'lov usuli", icon: Wallet, description:'Kassa va terminal sozlamalari'},
  { id:'check', name:'Chek sozlamalari', icon: Box, description:"Chek ko'rinishi va logotipi"},
  { id:'device', name:'Qurilmalar', icon: Smartphone, description:'Faol qurilmalar va ruxsatlar'},
  { id:'sales', name:'Savdo', icon: Package, description:'Keshbek, soliq va chegirmalar'},
  { id:'notifications', name:'Xabarnomalar', icon: Bell, description:'Eslatmalar va bot sozlamalari'},
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#20c997]" />
            Tizim sozlamalari
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Tizimning barcha asosiy parametrlarini va tashkilot ma'lumotlarini boshqarish.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-1.5">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn('w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] text-left transition-all border duration-200',
                  isActive 
                    ?'bg-white dark:bg-white/[0.08] border-slate-250 dark:border-white/10 text-primary-600 dark:text-primary-400 shadow-sm' 
                    :'bg-transparent border-transparent hover:bg-white dark:hover:bg-white/[0.08] hover:border-slate-200 dark:hover:border-transparent text-slate-600 dark:text-slate-400'
                )}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                  isActive ?'bg-primary-50 dark:bg-primary-950/30 text-primary-600' :'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-450'
                )}>
                  <Icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <p className={cn('text-[14px] font-bold', isActive ?'text-primary-750 dark:text-primary-400' :'text-slate-700 dark:text-slate-300')}>
                    {category.name}
                  </p>
                  <p className="text-[12px] text-slate-450 dark:text-slate-400 font-medium mt-0.5 line-clamp-1">{category.description}</p>
                </div>
              </button>
            );})}
        </div>
 
        {/* Content Area */}
        <div className="flex-1 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/60 dark:border-white/5 rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          {activeTab ==='general' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-transparent pb-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Umumiy sozlamalar</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kompaniya profilini tahrirlash</p>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Building className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Kompaniya nomi
                  </label>
                  <input type="text" defaultValue="iNazorat LLC" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Globe className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Asosiy valyuta
                  </label>
                  <select className="w-full h-11 px-4 bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm">
                    <option value="UZS">O'zbek so'mi (UZS)</option>
                    <option value="USD">AQSh dollari (USD)</option>
                    <option value="EUR">Yevro (EUR)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Phone className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Telefon raqam
                  </label>
                  <input type="text" defaultValue="+998 90 123 45 67" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <Mail className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Elektron pochta
                  </label>
                  <input type="email" defaultValue="info@inazorat.uz" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-slate-450" strokeWidth={1.6} />
                    Manzil
                  </label>
                  <input type="text" defaultValue="Toshkent sh., Chilonzor tumani, 1-mavze" className="w-full h-11 px-4 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-slate-100 shadow-sm" />
                </div>
              </div>
 
              <div className="pt-4 flex justify-end">
                <button className="flex items-center gap-2 h-10 px-5 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all text-white text-sm font-semibold rounded-xl">
                  <Save className="w-4 h-4" strokeWidth={2} />
                  Saqlash
                </button>
              </div>
            </div>
          )}
 
          {activeTab !=='general' && (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400">
              <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-[20px] flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-transparent">
                <Shield className="w-8 h-8 text-slate-350" strokeWidth={1.6} />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Tez kunda</h4>
              <p className="text-sm mt-1.5 font-medium text-slate-500 dark:text-slate-400">Bu bo'lim ustida ishlanmoqda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );}
