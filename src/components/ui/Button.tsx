import { forwardRef, type ButtonHTMLAttributes} from'react';
import { cn} from'../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:'primary' |'secondary' |'outline' |'ghost' |'danger';
  size?:'sm' |'md' |'lg';}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant ='primary', size ='md', ...props}, ref) => {
    return (
      <button
        ref={ref}
        className={cn('inline-flex items-center justify-center rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]',
          {'bg-primary-600 text-white hover:bg-primary-700': variant ==='primary','bg-slate-100 dark:bg-white/[0.06] text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:bg-white/10': variant ==='secondary','border-2 border-[#f1f2f4] dark:border-transparent bg-white dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-white/5': variant ==='outline','bg-transparent hover:bg-slate-100 dark:bg-white/[0.06]': variant ==='ghost','bg-red-600 text-white hover:bg-red-700': variant ==='danger','h-9 px-3 text-sm': size ==='sm','h-10 px-4 py-2': size ==='md','h-11 px-8 text-lg': size ==='lg',},
          className
        )}
        {...props}
      />
    );}
);
Button.displayName ='Button';

export { Button};
