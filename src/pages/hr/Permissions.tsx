import { useState } from 'react';
import { 
  Shield, Check, X, Plus, Save, ChevronDown, ChevronUp,
  LayoutDashboard, ShoppingCart, Users, Package, RefreshCw, DollarSign, Layers, Settings 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface Permission {
  module: string;
  icon: React.ElementType;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

interface Role {
  id: number;
  name: string;
  color: string;
  bg: string;
  description: string;
  permissions: Permission[];
}

const modules = [
  { key: 'dashboard', label: 'Asosiy panel', icon: LayoutDashboard, iconColor: 'text-indigo-500', bg: 'bg-indigo-50' },
  { key: 'pos', label: 'Savdo (POS)', icon: ShoppingCart, iconColor: 'text-emerald-500', bg: 'bg-emerald-50' },
  { key: 'crm', label: 'Mijozlar (CRM)', icon: Users, iconColor: 'text-blue-500', bg: 'bg-blue-50' },
  { key: 'warehouse', label: 'Ombor', icon: Package, iconColor: 'text-amber-500', bg: 'bg-amber-50' },
  { key: 'supply', label: "Ta'minot", icon: RefreshCw, iconColor: 'text-purple-500', bg: 'bg-purple-50' },
  { key: 'finance', label: 'Moliya', icon: DollarSign, iconColor: 'text-rose-500', bg: 'bg-rose-50' },
  { key: 'hr', label: 'HR', icon: Layers, iconColor: 'text-teal-500', bg: 'bg-teal-50' },
  { key: 'settings', label: 'Sozlamalar', icon: Settings, iconColor: 'text-slate-500', bg: 'bg-slate-50' },
];

const defaultPermissions = (all: boolean): Permission[] =>
  modules.map(m => ({
    module: m.key,
    icon: m.icon,
    actions: { view: all, create: all, edit: all, delete: all },
  }));

const initialRoles: Role[] = [
  {
    id: 1,
    name: 'Admin',
    color: 'text-violet-700',
    bg: 'bg-violet-100',
    description: "Tizimning to'liq boshqaruvchisi",
    permissions: defaultPermissions(true),
  },
  {
    id: 2,
    name: 'Kassir',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    description: 'Savdo va kassa operatsiyalari',
    permissions: modules.map(m => ({
      module: m.key,
      icon: m.icon,
      actions: {
        view: ['dashboard', 'pos', 'crm', 'warehouse'].includes(m.key),
        create: ['pos'].includes(m.key),
        edit: false,
        delete: false,
      },
    })),
  },
  {
    id: 3,
    name: 'Omborchi',
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    description: "Ombor va mahsulotlarni boshqaruvchi",
    permissions: modules.map(m => ({
      module: m.key,
      icon: m.icon,
      actions: {
        view: ['dashboard', 'warehouse', 'supply'].includes(m.key),
        create: ['warehouse', 'supply'].includes(m.key),
        edit: ['warehouse', 'supply'].includes(m.key),
        delete: false,
      },
    })),
  },
  {
    id: 4,
    name: 'Hisobchi',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    description: 'Moliyaviy hisobot va tahlil',
    permissions: modules.map(m => ({
      module: m.key,
      icon: m.icon,
      actions: {
        view: ['dashboard', 'finance', 'crm'].includes(m.key),
        create: ['finance'].includes(m.key),
        edit: ['finance'].includes(m.key),
        delete: false,
      },
    })),
  },
];

const actionLabels: Record<string, string> = {
  view: "Ko'rish",
  create: 'Qo\'shish',
  edit: 'Tahrirlash',
  delete: "O'chirish",
};
const actionColors: Record<string, string> = {
  view: 'text-sky-600',
  create: 'text-emerald-600',
  edit: 'text-amber-600',
  delete: 'text-red-500',
};

export default function Permissions() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role>(initialRoles[0]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleModule = (moduleKey: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleKey) ? prev.filter(m => m !== moduleKey) : [...prev, moduleKey]
    );
  };

  const togglePermission = (moduleKey: string, action: keyof Permission['actions']) => {
    setSelectedRole(prev => {
      const updated = {
        ...prev,
        permissions: prev.permissions.map(p =>
          p.module === moduleKey
            ? { ...p, actions: { ...p.actions, [action]: !p.actions[action] } }
            : p
        ),
      };
      return updated;
    });
    setHasChanges(true);
  };

  const toggleAllForModule = (moduleKey: string, value: boolean) => {
    setSelectedRole(prev => ({
      ...prev,
      permissions: prev.permissions.map(p =>
        p.module === moduleKey
          ? { ...p, actions: { view: value, create: value, edit: value, delete: value } }
          : p
      ),
    }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    setRoles(prev => prev.map(r => (r.id === selectedRole.id ? selectedRole : r)));
    setHasChanges(false);
  };

  const getModuleLabel = (key: string) => modules.find(m => m.key === key)?.label || key;
  const getModuleIcon = (key: string) => {
    const mod = modules.find(m => m.key === key);
    if (mod) {
      const Icon = mod.icon;
      return (
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", mod.bg)}>
          <Icon className={cn("w-5 h-5", mod.iconColor)} strokeWidth={1.6} />
        </div>
      );
    }
    return null;
  };

  const totalEnabled = selectedRole.permissions.reduce(
    (acc, p) => acc + Object.values(p.actions).filter(Boolean).length,
    0
  );
  const totalActions = selectedRole.permissions.length * 4;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            Rollar va Ruxsatlar
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Har bir rol uchun modullarga kirish huquqlarini sozlang
          </p>
        </div>
        {hasChanges && (
          <button
            onClick={saveChanges}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Saqlash
          </button>
        )}
      </div>

      <div className="flex gap-6 items-start">
        {/* Roles Sidebar */}
        <div className="w-64 flex-shrink-0 sticky top-0 max-h-[calc(100vh-130px)] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1 mb-3">Rollar</p>
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedRole(role);
                setHasChanges(false);
              }}
              className={cn(
                'w-full text-left px-4 py-3.5 rounded-2xl border transition-all',
                selectedRole.id === role.id
                  ? 'bg-white border-violet-200 shadow-md shadow-violet-100'
                  : 'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold', role.bg, role.color)}>
                  {role.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className={cn('font-semibold text-sm', selectedRole.id === role.id ? 'text-violet-700' : 'text-slate-800')}>
                    {role.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{role.description}</p>
                </div>
              </div>
            </button>
          ))}

          <button className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl border border-dashed border-slate-300 text-slate-400 hover:border-violet-400 hover:text-violet-600 text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Yangi rol
          </button>
        </div>

        {/* Permissions Panel */}
        <div className="flex-1 space-y-3">
          {/* Role stats */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-3">
                <span className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold', selectedRole.bg, selectedRole.color)}>
                  {selectedRole.name.charAt(0)}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{selectedRole.name}</h4>
                  <p className="text-sm text-slate-500">{selectedRole.description}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{totalEnabled}<span className="text-base text-slate-400">/{totalActions}</span></div>
              <p className="text-xs text-slate-500">ruxsat faol</p>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-2 ml-auto">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all"
                  style={{ width: `${(totalEnabled / totalActions) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Module Permissions */}
          {selectedRole.permissions.map(perm => {
            const isExpanded = expandedModules.includes(perm.module);
            const activeCount = Object.values(perm.actions).filter(Boolean).length;
            const allActive = activeCount === 4;

            return (
              <div key={perm.module} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toggleModule(perm.module)}
                >
                  <div className="flex items-center gap-3">
                    {getModuleIcon(perm.module)}
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{getModuleLabel(perm.module)}</p>
                      <p className="text-xs text-slate-400">{activeCount}/4 ruxsat faol</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quick toggles visible in collapsed state */}
                    {!isExpanded && (
                      <div className="flex gap-1.5">
                        {(Object.keys(perm.actions) as Array<keyof typeof perm.actions>).map(action => (
                          <button
                            key={action}
                            onClick={e => { e.stopPropagation(); togglePermission(perm.module, action); }}
                            title={actionLabels[action]}
                            className={cn(
                              'w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all',
                              perm.actions[action]
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-red-100 hover:text-red-600'
                                : 'bg-slate-100 text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
                            )}
                          >
                            {perm.actions[action] ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* All / None toggle */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleAllForModule(perm.module, !allActive); }}
                      className={cn(
                        'text-xs font-medium px-2.5 py-1 rounded-lg transition-colors',
                        allActive ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      )}
                    >
                      {allActive ? 'Barchani o\'chir' : 'Barchasini yoq'}
                    </button>

                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(Object.keys(perm.actions) as Array<keyof typeof perm.actions>).map(action => (
                      <button
                        key={action}
                        onClick={() => togglePermission(perm.module, action)}
                        className={cn(
                          'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all',
                          perm.actions[action]
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                        )}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-xl flex items-center justify-center',
                          perm.actions[action] ? 'bg-emerald-200' : 'bg-slate-200'
                        )}>
                          {perm.actions[action]
                            ? <Check className="w-4 h-4 text-emerald-700" />
                            : <X className="w-4 h-4 text-slate-400" />
                          }
                        </div>
                        <span className={cn('text-xs font-semibold', actionColors[action])}>
                          {actionLabels[action]}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
