import { useState } from 'react';
import { Plus, Search, Building2, MapPin, Phone, Mail, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Supplier {
  id: number;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  totalOrders: number;
}

const mockSuppliers: Supplier[] = [
  { id: 1, name: 'Global Foods LLC', category: 'Oziq-ovqat', contactPerson: 'Alisher Qodirov', phone: '+998 90 123 45 67', email: 'info@globalfoods.uz', address: 'Toshkent sh., Yunusobod t.', status: 'active', totalOrders: 156 },
  { id: 2, name: 'Tech Supply Co.', category: 'Elektronika', contactPerson: 'Malika To\'rayeva', phone: '+998 93 987 65 43', email: 'sales@techsupply.uz', address: 'Toshkent sh., Chilonzor t.', status: 'active', totalOrders: 42 },
  { id: 3, name: 'Fresh Market UZ', category: 'Oziq-ovqat', contactPerson: 'Jasur Karimov', phone: '+998 99 111 22 33', email: 'contact@freshmarket.uz', address: 'Samarqand sh., Ulug\'bek k.', status: 'active', totalOrders: 89 },
  { id: 4, name: 'Office Depot', category: 'Kanselyariya', contactPerson: 'Otabek Aliyev', phone: '+998 71 200 30 40', email: 'uz@officedepot.com', address: 'Toshkent sh., Mirzo Ulug\'bek t.', status: 'inactive', totalOrders: 12 },
  { id: 5, name: 'Clothing Hub', category: 'Kiyim-kechak', contactPerson: 'Dilnoza Umarova', phone: '+998 97 555 66 77', email: 'hello@clothinghub.uz', address: 'Farg\'ona sh., Markaz', status: 'active', totalOrders: 64 },
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
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            Yetkazib beruvchilar
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">Hamkorlar va ta'minotchilarni boshqarish</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button className="flex items-center gap-2 h-10 px-4 bg-primary-600 text-white rounded-xl text-[14px] font-semibold hover:bg-primary-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Yangi hamkor
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.6} />
        <input
          type="text"
          placeholder="Kompaniya, vakil yoki toifa bo'yicha qidiring..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all shadow-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(supplier => (
          <div key={supplier.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center font-bold text-lg">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 line-clamp-1" title={supplier.name}>{supplier.name}</h4>
                  <span className="text-[12px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 mt-1 inline-block">
                    {supplier.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative group">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-colors">
                    <MoreVertical className="w-5 h-5" strokeWidth={1.6} />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 text-left">
                      <Edit2 className="w-4 h-4" strokeWidth={1.8} /> Tahrirlash
                    </button>
                    <button 
                      onClick={() => deleteSupplier(supplier.id)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 text-left"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.8} /> O'chirish
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600">
                <div className="w-5 flex justify-center"><Building2 className="w-4 h-4 text-slate-400" strokeWidth={1.6} /></div>
                <span>{supplier.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600">
                <div className="w-5 flex justify-center"><Phone className="w-4 h-4 text-slate-400" strokeWidth={1.6} /></div>
                <span className="font-mono">{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600">
                <div className="w-5 flex justify-center"><Mail className="w-4 h-4 text-slate-400" strokeWidth={1.6} /></div>
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600">
                <div className="w-5 flex justify-center mt-0.5"><MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" strokeWidth={1.6} /></div>
                <span className="line-clamp-2">{supplier.address}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={cn(
                'flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full border',
                supplier.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
              )}>
                <span className={`w-1.5 h-1.5 rounded-full ${supplier.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                {supplier.status === 'active' ? 'Faol' : 'Nofaol'}
              </span>
              
              <span className="text-[12px] font-medium text-slate-500">
                <strong className="text-slate-900 font-bold">{supplier.totalOrders}</strong> buyurtma
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" strokeWidth={1.6} />
          <p className="font-medium text-slate-500">Yetkazib beruvchilar topilmadi</p>
        </div>
      )}
    </div>
  );
}
