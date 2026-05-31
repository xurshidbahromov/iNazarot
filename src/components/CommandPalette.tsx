import { useState} from'react';
import { Command} from'cmdk';
import { useNavigate} from'react-router-dom';
import {
  Search, LayoutDashboard, ShoppingCart, Users, Package, DollarSign, Settings, LogOut, FileText, X} from'lucide-react';
import { useAuthStore} from'../store/useAuthStore';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;}

export function CommandPalette({ open, setOpen}: CommandPaletteProps) {
  const navigate = useNavigate();
  const { logout} = useAuthStore();
  const [value, setValue] = useState('');

  // Close the command palette after navigation
  const runCommand = (command: () => void) => {
    setOpen(false);
    command();};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 animate-fade-in-scale">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-[20px] shadow-2xl overflow-hidden ring-1 ring-slate-200">
        <Command
          value={value}
          onValueChange={setValue}
          className="w-full bg-transparent flex flex-col"
          loop
        >
          <div className="flex items-center px-4 py-3 border-b border-slate-200">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" strokeWidth={1.8} />
            <Command.Input 
              autoFocus
              placeholder="Nima kerak? Qidiring yoki buyruq bering..." 
              className="flex-1 bg-transparent border-0 outline-none text-slate-800 placeholder:text-slate-400 text-[15px]"
            />
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
            <Command.Empty className="py-10 text-center text-sm text-slate-500">
              Hech qanday natija topilmadi.
            </Command.Empty>

            <Command.Group heading="Asosiy menyu" className="text-xs font-semibold text-slate-500 px-2 py-1.5 [&_[cmdk-group-items]]:mt-1">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Boshqaruv paneli (Dashboard)
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/pos'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Savdo (POS) moduli
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Mijozlar (CRM)" className="text-xs font-semibold text-slate-500 px-2 py-1.5 [&_[cmdk-group-items]]:mt-1">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/crm/clients'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <Users className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Mijozlar ro'yxati
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/crm/orders'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Buyurtmalar tarixi
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Ombor" className="text-xs font-semibold text-slate-500 px-2 py-1.5 [&_[cmdk-group-items]]:mt-1">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/warehouse/products'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <Package className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Barcha mahsulotlar
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/warehouse/inventory'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Inventarizatsiya qilish
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Moliya" className="text-xs font-semibold text-slate-500 px-2 py-1.5 [&_[cmdk-group-items]]:mt-1">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/finance/cashbox'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <DollarSign className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Kassa (Kirim-chiqim)
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Tizim" className="text-xs font-semibold text-slate-500 px-2 py-1.5 [&_[cmdk-group-items]]:mt-1">
              <Command.Item 
                onSelect={() => runCommand(() => navigate('/settings'))}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-slate-700 data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-700 transition-colors"
              >
                <Settings className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Sozlamalar
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => {
                  logout();
                  navigate('/login');})}
                className="flex items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm text-red-600 data-[selected=true]:bg-red-50 data-[selected=true]:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3 shrink-0" strokeWidth={1.8} />
                Tizimdan chiqish
              </Command.Item>
            </Command.Group>

          </Command.List>
        </Command>
      </div>
    </div>
  );}
