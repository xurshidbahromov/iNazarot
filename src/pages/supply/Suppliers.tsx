import { useState, type ChangeEvent} from 'react';
import { Plus, Search, Building2, MapPin, Phone, Mail, MoreVertical, Edit2, Trash2} from 'lucide-react';
import { cn} from '../../utils/cn';
import { Input} from '../../components/ui/Input';

interface Supplier {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  status:'active' |'inactive';
  totalOrders: number;}

const mockSuppliers: Supplier[] = [
  { id: 1, name:'Global Foods LLC', category:'Oziq-ovqat', contactPerson:'Alisher Qodirov', phone:'+998 90 123 45 67', email:'info@globalfoods.uz', address:'Toshkent sh., Yunusobod t.', status:'active', totalOrders: 156},
  { id: 2, name:'Tech Supply Co.', category:'Elektronika', contactPerson:'Malika To\'rayeva', phone:'+998 93 987 65 43', email:'sales@techsupply.uz', address:'Toshkent sh., Chilonzor t.', status:'active', totalOrders: 42},
  { id: 3, name:'Fresh Market UZ', category:'Oziq-ovqat', contactPerson:'Jasur Karimov', phone:'+998 99 111 22 33', email:'contact@freshmarket.uz', address:'Samarqand sh., Ulug\'bek k.', status:'active', totalOrders: 89},
  { id: 4, name:'Office Depot', category:'Kanselyariya', contactPerson:'Otabek Aliyev', phone:'+998 71 200 30 40', email:'uz@officedepot.com', address:'Toshkent sh., Mirzo Ulug\'bek t.', status:'inactive', totalOrders: 12},
  { id: 5, name:'Clothing Hub', category:'Kiyim-kechak', contactPerson:'Dilnoza Umarova', phone:'+998 97 555 66 77', email:'hello@clothinghub.uz', address:'Farg\'ona sh., Markaz', status:'active', totalOrders: 64},
];

export default function Suppliers() {
  const [search, setSearch] = useState('');
  const [suppliers, setSuppliers] = useState(mockSuppliers);

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  const deleteSupplier = (id: number) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#20c997]" />
            Yetkazib beruvchilar
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Hamkorlar va ta'minotchilarni boshqarish</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button className="flex items-center gap-2 h-10 px-4 bg-primary-600 text-white rounded-xl text-[14px] font-semibold hover:bg-primary-700 transition-colors shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Yangi hamkor
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
          <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} />
        </div>
        <Input
          className="pl-10 pr-4 py-2 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-full transition-all h-10 shadow-sm"
          placeholder="Kompaniya, vakil yoki toifa bo'yicha qidiring..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(supplier => (
          <div key={supplier.id} className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/60 dark:border-white/5 rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center font-bold text-lg">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1" title={supplier.name}>{supplier.name}</h4>
                  <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-white/5 mt-1 inline-block">
                    {supplier.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative group">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500 hover:text-primary-600 transition-colors">
                    <MoreVertical className="w-5 h-5" strokeWidth={1.6} />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 text-left">
                      <Edit2 className="w-4 h-4" strokeWidth={1.8} /> Tahrirlash
                    </button>
                    <button 
                      onClick={() => deleteSupplier(supplier.id)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.8} /> O'chirish
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
                <div className="w-5 flex justify-center"><Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /></div>
                <span>{supplier.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
                <div className="w-5 flex justify-center"><Phone className="w-4 h-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /></div>
                <span className="font-mono">{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
                <div className="w-5 flex justify-center"><Mail className="w-4 h-4 text-slate-400 dark:text-slate-500" strokeWidth={1.6} /></div>
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400">
                <div className="w-5 flex justify-center mt-0.5"><MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" strokeWidth={1.6} /></div>
                <span className="line-clamp-2">{supplier.address}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-transparent flex items-center justify-between">
              <span className={cn('flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full border',
                supplier.status === 'active' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/30' 
                  : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-white/5'
              )}>
                <span className={`w-1.5 h-1.5 rounded-full ${supplier.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                {supplier.status === 'active' ? 'Faol' : 'Nofaol'}
              </span>
              
              <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-slate-100 font-bold">{supplier.totalOrders}</strong> buyurtma
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[20px] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" strokeWidth={1.6} />
          <p className="font-medium text-slate-500 dark:text-slate-400">Yetkazib beruvchilar topilmadi</p>
        </div>
      )}
    </div>
  );}
