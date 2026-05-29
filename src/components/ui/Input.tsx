import { forwardRef, type InputHTMLAttributes} from'react';
import { cn} from'../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props}, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn('flex h-11 w-full rounded-xl border-2 border-[#f1f2f4]/60 bg-white/50 backdrop-blur-sm px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]',
            error &&'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );}
);
Input.displayName ='Input';

export { Input};
