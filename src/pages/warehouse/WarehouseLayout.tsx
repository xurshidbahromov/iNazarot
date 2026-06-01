import { Outlet, Link, useLocation} from'react-router-dom';
import { cn} from'../../utils/cn';

const tabs = [
  { name:'Mahsulotlar', href:'/warehouse/products'},
  { name:'Omborlar', href:'/warehouse/locations'},
  { name:'Inventarizatsiya', href:'/warehouse/inventory'},
  { name:"Ichki ko'chirish", href:'/warehouse/transfers'},
];

export default function WarehouseLayout() {
  const location = useLocation();

  return (
    <div className="space-y-6 pb-8">
      <div className="border-b border-slate-200 dark:border-transparent bg-white dark:bg-white/[0.08] px-2 sm:px-6 rounded-t-2xl">
        <nav className="-mb-px flex space-x-6">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href || location.pathname.startsWith(tab.href +'/');
            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={cn(
                  isActive
                    ?'border-primary-600 text-primary-600'
                    :'border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:border-transparent hover:text-slate-700 dark:text-slate-300','whitespace-nowrap border-b-2 py-4 px-2 text-[14px] font-semibold transition-colors'
                )}
              >
                {tab.name}
              </Link>
            );})}
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );}
