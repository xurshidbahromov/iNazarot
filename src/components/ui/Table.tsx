import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TableProps<T> {
  columns: { key: string; label: string; className?: string }[];
  data: T[];
  renderRow: (item: T) => ReactNode;
  className?: string;
  variant?: 'standalone' | 'nested';
}

export function Table<T extends Record<string, unknown> | { id?: string | number }>({ columns, data, renderRow, className, variant = 'standalone' }: TableProps<T>) {
  return (
    <div className={cn(
      variant === 'standalone'
        ? "overflow-hidden border border-slate-200 bg-white rounded-xl shadow-sm"
        : "overflow-hidden bg-white",
      className
    )}>
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.map((item, index) => (
            <tr key={(item as { id?: string | number }).id || index} className="hover:bg-slate-50 transition-colors">
              {renderRow(item)}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-sm text-slate-500">
                Ma'lumot topilmadi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
