import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, Settings, ShoppingCart,
  DollarSign, RefreshCw, Layers, Bell, LogOut, ChevronDown,
  Search, Command, User, Shield, ChevronRight, HelpCircle, BarChart2,
  AlertTriangle, Info, XCircle, X, Moon, Sun } from 'lucide-react';
import { cn} from'../utils/cn';
import { useAuthStore} from'../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { CommandPalette} from'../components/CommandPalette';
import { getSystemAlerts } from'../utils/posUtils';
import { useWarehouseStore } from '../store/useWarehouseStore';
import { useFinanceStore } from '../store/useFinanceStore';
import { reports } from '../data/reportsData';

type NavItem = {
  name: string;
  href?: string;
  icon: React.ElementType;
  badge?: { value: number; color: string};
  children?: { name: string; href: string; badge?: { value: number; color: string}}[];};

const navigation: NavItem[] = [
  { name:'Asosiy', href:'/', icon: LayoutDashboard},
  { name:'Savdo (POS)', href:'/pos', icon: ShoppingCart},
  { name:'Hisobotlar', href:'/reports', icon: BarChart2 },
  { 
    name:'Mijozlar', 
    icon: Users,
    children: [
      { name:"Mijozlar ro'yxati", href:'/crm/clients'},
      { name:'Buyurtmalar', href:'/crm/orders'},
      { name:'Kategoriyalar', href:'/crm/categories'}
    ]},
  {
    name:'Ombor',
    icon: Package,
    children: [
      { name:'Mahsulotlar', href:'/warehouse/products'},
      { name:'Qoralamalar', href:'/warehouse/drafts', badge: { value: 3, color:'bg-orange-200 text-orange-800'}},
      { name:'Rejalashtirilgan', href:'/warehouse/scheduled', badge: { value: 8, color:'bg-emerald-200 text-emerald-800'}},
      { name:'Omborlar', href:'/warehouse/locations'},
      { name:'Inventarizatsiya', href:'/warehouse/inventory'},
      { name:"Ichki ko'chirish", href:'/warehouse/transfers'}
    ]},
  { 
    name:"Ta'minot", 
    icon: RefreshCw,
    children: [
      { name:'Xaridlar', href:'/supply/purchases'},
      { name:'Yetkazib beruvchilar', href:'/supply/suppliers'},
      { name:"Sotib olish so'rovlari", href:'/supply/requests'},
      { name:'Qaytarishlar', href:'/supply/returns'}
    ]},
  { 
    name:'Moliya', 
    icon: DollarSign,
    children: [
      { name:'Kassa (Kirim-chiqim)', href:'/finance/cashbox'},
      { name:'Xarajatlar', href:'/finance/expenses'},
      { name:'Valyuta', href:'/finance/currency'}
    ]},
  { 
    name:'HR', 
    icon: Layers,
    children: [
      { name:'Xodimlar', href:'/hr/employees'},
      { name:"Bo'limlar", href:'/hr/departments'},
      { name:'Lavozimlar', href:'/hr/positions'},
      { name:'Ruxsatlar', href:'/hr/permissions'}
    ]},
  { name:'Sozlamalar', href:'/settings', icon: Settings},
  { name:"Qo'llanma", href:'/help', icon: HelpCircle},
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout} = useAuthStore();
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach(item => {
      if (item.children && item.children.some(c => location.pathname.startsWith(c.href))) {
        initial[item.name] = true;}});
    return initial;});
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  
  const [cmdOpen, setCmdOpen] = useState(false);

  const { products } = useWarehouseStore();
  const { transactions } = useFinanceStore();
  const alerts = getSystemAlerts(products, transactions);
  const alertCount = alerts.length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (alertsRef.current && !alertsRef.current.contains(e.target as Node)) {
        setShowAlerts(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);}, []);

  // Handle Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key ==='k') {
        e.preventDefault();
        setCmdOpen((open) => !open);}};
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);}, []);

  const toggleMenu = (name: string) => {
    if (!isCollapsed) {
      setOpenMenus(prev => ({ ...prev, [name]: !prev[name]}));}};

  const handleMenuHoverEnter = (name: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;}
    setHoveredMenu(name);};

  const handleMenuHoverLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);}, 150);};

  const handleLogout = () => {
    logout();
    navigate('/login');};

  // Helper to find the current active page name for the header
  let currentPageName ='Boshqaruv paneli';
  navigation.forEach(item => {
    if (item.href === location.pathname) currentPageName = item.name;
    if (item.children) {
      item.children.forEach(child => {
        if (child.href === location.pathname || location.pathname.startsWith(child.href + '/')) currentPageName = child.name;});}});

  if (location.pathname.startsWith('/reports/')) {
    const reportId = Number(location.pathname.split('/').pop());
    const report = reports.find(r => r.id === reportId);
    if (report) {
      currentPageName = `Hisobotlar > ${report.name}`;
    } else {
      currentPageName = 'Hisobotlar';
    }
  }

  const getBreadcrumbPath = (part: string): string | null => {
    if (part === 'Hisobotlar') return '/reports';
    for (const item of navigation) {
      if (item.name === part && item.href) return item.href;
      if (item.children) {
        for (const child of item.children) {
          if (child.name === part) return child.href;
        }
      }
    }
    return null;
  };

  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Blur Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50/50 to-emerald-50/10 dark:from-[#0b0f19] dark:via-[#0d1323] dark:to-[#0f172a]/20">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-emerald-200/5 dark:bg-emerald-500/4 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-300/5 dark:bg-emerald-400/4 blur-[150px]" />
      </div>

      {/* Sidebar - Collapsible design */}
      <div className={cn(
        "bg-[var(--bg-sidebar)] backdrop-blur-2xl flex flex-col flex-shrink-0 relative z-30 py-6 px-4 border-r border-[var(--border-sidebar)] shadow-[4px_0_30px_rgba(0,0,0,0.03)] dark:shadow-[4px_0_30px_rgba(0,0,0,0.3)] transition-all duration-300",
        isCollapsed ?"w-20" :"w-64"
      )}>
        {/* Logo */}
        <div className={cn("flex items-center px-1.5 mb-8 overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ?"justify-center" :"gap-3 justify-between"
        )}>
          <div className={cn("relative flex items-center transition-all duration-300 ease-in-out",
            isCollapsed ?"pr-1.5" :"pr-2"
          )}>
            <span className={cn("font-bold tracking-tight text-slate-800 dark:text-slate-100 leading-none transition-all duration-300 ease-in-out",
              isCollapsed ?"text-[32px]" :"text-[40px]"
            )} style={{ fontFamily:"'Quicksand', sans-serif"}}>
              i
              <span className={cn("inline-flex transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap align-baseline",
                isCollapsed ?"max-w-0 opacity-0" :"max-w-[200px] opacity-100"
              )}>
                Nazorat
              </span>
            </span>
            
            {/* Double Chevron Growth Arrow (Elevate logo style representing scale & automation) */}
            <svg 
              className={cn("text-[#20c997] absolute transition-all duration-300 ease-in-out drop-shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]",
                isCollapsed ?"w-[16px] h-[16px] top-[2px] -right-[6px]" :"w-[22px] h-[22px] top-[9px] -right-[12px]"
              )} 
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

        {/* Nav */}
        <nav className={cn("flex-1 space-y-1", isCollapsed ?"overflow-visible" :"overflow-y-auto custom-scrollbar pr-1")}>
          {navigation.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenus[item.name] && !isCollapsed;
            const isDirectActive = item.href && (location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(`${item.href}/`)));
            const isChildActive = hasChildren && item.children!.some(c => location.pathname === c.href || location.pathname.startsWith(`${c.href}/`));
            const isActive = isDirectActive || (isChildActive && !hasChildren);
            const isHovered = hoveredMenu === item.name;

            return (
              <div
                key={item.name}
                className="mb-1 relative"
                onMouseEnter={() => isCollapsed && hasChildren && handleMenuHoverEnter(item.name)}
                onMouseLeave={() => isCollapsed && hasChildren && handleMenuHoverLeave()}
              >
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={cn('group w-full flex items-center justify-between px-3 py-3 text-[15px] font-semibold rounded-[16px] transition-all',
                        (isChildActive && !isOpen) || (isCollapsed && isChildActive)
                          ?'text-slate-900 dark:text-white bg-white dark:bg-white/[0.06] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]'
                          :'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10',
                        isCollapsed &&'justify-center px-0'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 stroke-[1.6] transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                        {!isCollapsed && <span>{item.name}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown 
                          className={cn("w-4 h-4 stroke-[1.6] transition-transform duration-300 ease-in-out",
                            isOpen &&"rotate-180"
                          )} 
                        />
                      )}
                    </button>

                    {/* Expanded: normal accordion sub-menu with smooth slide transition */}
                    {!isCollapsed && (
                      <div 
                        className={cn("grid transition-all duration-300 ease-in-out ml-6 border-l-2 border-slate-200/60 dark:border-slate-700/40 pl-4",
                          isOpen ?"opacity-100 mt-1 py-1" :"opacity-0 pointer-events-none"
                        )}
                        style={{ gridTemplateRows: isOpen ?'1fr' :'0fr'}}
                      >
                        <div className="overflow-hidden space-y-1 relative">
                          {item.children!.map((child) => {
                            const isChildLinkActive = location.pathname === child.href;
                            return (
                              <div key={child.name} className="relative flex items-center">
                                <div className="absolute -left-4 w-3 h-0.5 bg-slate-200/60 top-1/2 -translate-y-1/2"></div>
                                <Link
                                  to={child.href}
                                  className={cn('flex-1 flex items-center justify-between px-3 py-2.5 text-[14px] font-medium rounded-[16px] transition-all',
                                    isChildLinkActive
                                      ?'bg-white dark:bg-white/[0.06] text-slate-900 dark:text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]'
                                      :'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                                  )}
                                >
                                  <span>{child.name}</span>
                                  {child.badge && (
                                    <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-md', child.badge.color)}>
                                      {child.badge.value}
                                    </span>
                                  )}
                                </Link>
                              </div>
                            );})}
                        </div>
                      </div>
                    )}

                    {/* Collapsed: hover floating popover sub-menu */}
                    {isCollapsed && isHovered && (
                      <div
                        className="absolute left-full top-0 w-64 z-50 pl-3"
                        onMouseEnter={() => handleMenuHoverEnter(item.name)}
                        onMouseLeave={() => handleMenuHoverLeave()}
                      >
                        <div className="bg-white dark:bg-[#0b0f19] rounded-[16px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 py-2.5 px-2.5 ml-1 animate-fade-in-scale">
                          <div className="px-3 py-1.5 mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {item.name}
                          </div>
                          <div className="space-y-0.5">
                            {item.children!.map((child) => {
                              const isChildLinkActive = location.pathname === child.href;
                              return (
                                <Link
                                  key={child.name}
                                  to={child.href}
                                  onClick={() => setHoveredMenu(null)}
                                  className={cn('flex items-center justify-between px-3 py-2 text-[13px] font-medium rounded-xl transition-all',
                                    isChildLinkActive
                                      ?'bg-slate-100 dark:bg-white/[0.06] text-slate-900 dark:text-white shadow-sm'
                                      :'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                                  )}
                                >
                                  <span>{child.name}</span>
                                  {child.badge && (
                                    <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', child.badge.color)}>
                                      {child.badge.value}
                                    </span>
                                  )}
                                </Link>
                              );})}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    title={isCollapsed ? item.name : undefined}
                    className={cn('group flex items-center gap-3 px-3 py-3 text-[15px] font-semibold rounded-[16px] transition-all',
                      isActive
                        ?'bg-white dark:bg-white/[0.06] text-slate-900 dark:text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]'
                        :'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10',
                      isCollapsed &&'justify-center px-0'
                    )}
                  >
                    <item.icon className="w-5 h-5 stroke-[1.6] transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )}
              </div>
            );})}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10 transition-colors duration-300">
        
        {/* Premium Top Header */}
        <header className="h-[68px] flex items-center justify-between px-6 lg:px-8 bg-slate-50/35 dark:bg-[#0b0f19]/45 backdrop-blur-3xl border-b border-slate-200/60 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-none flex-shrink-0 z-20">

          {/* Left — Toggle & Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="group p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300 active:scale-95 flex items-center justify-center relative overflow-hidden"
              title={isCollapsed ?"Menyuni yozish" :"Menyuni yig'ish"}
            >
              <div className="w-5 h-5 relative flex items-center justify-center">
                {/* Outer Frame */}
                <div className="absolute inset-0 border-[1.8px] border-slate-400 dark:border-slate-500 group-hover:border-slate-600 dark:group-hover:border-slate-300 rounded-[5px] transition-colors duration-300" />
                
                {/* Animated Sidebar Panel Background */}
                <div className={cn("absolute top-0 bottom-0 left-0 bg-slate-400 group-hover:bg-slate-600 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  isCollapsed ?"w-[3px] rounded-l-[3.5px] opacity-60" :"w-[7px] rounded-l-[3.5px] opacity-100"
                )} />
                
                {/* Animated Arrow/Chevron */}
                <svg
                  className={cn("w-3 h-3 absolute transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isCollapsed 
                      ?"left-[6px] rotate-0 text-slate-500 dark:text-slate-400 group-hover:translate-x-[2px] group-hover:text-slate-700 dark:group-hover:text-slate-200" 
                      :"left-[8px] rotate-180 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:-translate-x-[2px]"
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-slate-400 dark:text-slate-500 font-medium select-none">iNazorat</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" strokeWidth={1.6} />
                <div key={location.pathname} className="flex items-center gap-1.5 animate-fade-in-scale">
                  {currentPageName.split(' > ').map((part, index, array) => {
                    const isLast = index === array.length - 1;
                    const path = isLast ? null : getBreadcrumbPath(part);
                    return (
                      <span key={index} className="flex items-center gap-1.5">
                        {path ? (
                          <Link
                            to={path}
                            className="text-slate-400 dark:text-slate-500 font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200"
                          >
                            {part}
                          </Link>
                        ) : (
                          <span className={cn(
                            "transition-colors duration-200",
                            isLast 
                              ? "font-semibold text-slate-800 dark:text-slate-200" 
                              : "text-slate-400 dark:text-slate-500 font-medium"
                          )}>
                            {part}
                          </span>
                        )}
                        {!isLast && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" strokeWidth={1.6} />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCmdOpen(true)}
              className="hidden md:flex items-center relative transition-all duration-300 w-56 hover:w-64 group"
            >
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-colors group-hover:text-slate-900 dark:group-hover:text-white"
                strokeWidth={1.6}
              />
              <div
                className="w-full flex items-center justify-between pl-10 pr-3 h-9 rounded-xl border-2 border-[#f1f2f4] dark:border-white/5 bg-slate-50 dark:bg-white/5 text-sm text-slate-400 dark:text-slate-500 group-hover:bg-white dark:group-hover:bg-white/10 group-hover:border-slate-300 dark:group-hover:border-white/30 group-hover:text-slate-900 dark:group-hover:text-white transition-all cursor-pointer overflow-hidden"
              >
                <span className="whitespace-nowrap truncate mr-2">Qidiruv yoki buyruqlar...</span>
                <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.04] border border-[#f1f2f4] dark:border-white/5 rounded px-1.5 py-0.5 font-mono group-hover:border-slate-300 dark:group-hover:border-white/30 group-hover:bg-slate-50 dark:group-hover:bg-white/10 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex-shrink-0">
                  <Command className="w-2.5 h-2.5" strokeWidth={1.6} />K
                </kbd>
              </div>
            </button>

            {/* Divider */}
            <div className="w-px h-7 bg-slate-200 dark:bg-white/10 mx-1 hidden md:block" />

            {/* Direct One-Click Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group flex items-center justify-center p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-amber-400 transition-all duration-200 active:scale-95"
              title={theme === 'light' ? "Tungi rejimga o'tish" : "Yorug' rejimga o'tish"}
            >
              {theme === 'light' ? (
                <Moon className="w-[18px] h-[18px] stroke-[1.6]" />
              ) : (
                <Sun className="w-[18px] h-[18px] stroke-[1.6]" />
              )}
            </button>

            {/* Notification bell */}
            <div className="relative" ref={alertsRef}>
              <button
                onClick={() => setShowAlerts(p => !p)}
                className="group relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200"
              >
                <Bell className={cn("w-[18px] h-[18px] transition-transform duration-300", showAlerts ? "rotate-12 text-slate-700 dark:text-slate-200" : "group-hover:rotate-12")} strokeWidth={1.6} />
                {/* Badge showing real alert count */}
                {alertCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-[9px] font-black items-center justify-center">{Math.min(alertCount, 9)}</span>
                  </span>
                )}
              </button>

              {/* Alerts Dropdown */}
              {showAlerts && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-[#0b0f19] rounded-[16px] shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200/70 dark:border-white/5 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-slate-800/40">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-slate-600 dark:text-slate-400" strokeWidth={2} />
                      <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Ogohlantirishlar</span>
                      {alertCount > 0 && (
                        <span className="text-[10px] font-black bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full">{alertCount}</span>
                      )}
                    </div>
                    <button onClick={() => setShowAlerts(false)} className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors">
                      <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Alert list */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-white/5">
                    {alerts.length === 0 ? (
                      <div className="py-10 text-center">
                        <Bell className="w-8 h-8 text-slate-200 dark:text-slate-700 mx-auto mb-2" strokeWidth={1.5} />
                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500">Hech qanday ogohlantirish yo'q</p>
                      </div>
                    ) : (
                      alerts.map(alert => (
                        <Link
                          key={alert.id}
                          to={alert.href}
                          onClick={() => setShowAlerts(false)}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                            alert.type === 'error' ? 'bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400' :
                            alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400' :
                            'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-200'
                          )}>
                            {alert.type === 'error' ? <XCircle className="w-4 h-4" strokeWidth={2} /> :
                             alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" strokeWidth={2} /> :
                             <Info className="w-4 h-4" strokeWidth={2} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "text-[12px] font-bold leading-tight",
                              alert.type === 'error' ? 'text-red-700 dark:text-red-400' :
                              alert.type === 'warning' ? 'text-amber-700 dark:text-amber-400' :
                              'text-slate-800 dark:text-slate-200'
                            )}>{alert.title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{alert.body}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" strokeWidth={2} />
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-7 bg-slate-200 dark:bg-white/10 mx-1" />

            {/* User profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`group flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-200 ${
                  showUserMenu ?'bg-slate-100 dark:bg-white/[0.06]' :'hover:bg-slate-50 dark:hover:bg-white/10'}`}
              >
                {/* Avatar with gradient */}
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-2 ring-white dark:ring-slate-800">
                  {user?.name?.charAt(0)?.toUpperCase() ||'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">{user?.name ||'Admin'}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">Administrator</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    showUserMenu ?'rotate-180' :''}`}
                  strokeWidth={1.6}
                />
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-3 w-68 bg-white dark:bg-[#0b0f19] rounded-[16px] shadow-[0_20px_50px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200/70 dark:border-white/5 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200" style={{ width: '280px' }}>
                  
                  {/* User info header — dark gradient */}
                  <div className="relative px-4 py-4 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-lg font-bold text-white shadow-lg flex-shrink-0">
                        {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-white truncate leading-tight">{user?.name || 'Admin User'}</p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{user?.email || 'admin@inazorat.uz'}</p>
                      </div>
                    </div>
                    <div className="mt-3 relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        <Shield className="w-3 h-3" strokeWidth={2} />
                        Administrator
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-150 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center justify-center transition-all duration-200 flex-shrink-0">
                        <User className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white leading-tight">Profil sozlamalari</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">Shaxsiy ma'lumotlar</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-150 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center justify-center transition-all duration-200 flex-shrink-0">
                        <Settings className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white leading-tight">Tizim sozlamalari</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">Kassa va global sozlamalar</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="mx-2 mb-2 mt-0">
                    <div className="h-px bg-slate-100 dark:bg-white/[0.06] mb-2" />
                    <button
                      onClick={handleLogout}
                      className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 text-red-500 flex items-center justify-center transition-all duration-200 flex-shrink-0">
                        <LogOut className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[13px] font-semibold text-red-500 leading-tight">Tizimdan chiqish</p>
                        <p className="text-[11px] text-red-400/70 leading-tight mt-0.5">Seansni xavfsiz yakunlash</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 relative z-10">
          <Outlet />
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </div>
  );}
