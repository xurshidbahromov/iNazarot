import { useState, useMemo, type ReactNode} from'react';
import { ChevronUp, ChevronDown} from'lucide-react';
import { cn} from'../../utils/cn';

export interface TableColumn {
  key: string;
  label: string;
  className?: string;
  sortable?: boolean;}

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  renderRow: (item: T, isSelected?: boolean, toggleSelection?: () => void) => ReactNode;
  className?: string;
  variant?:'standalone' |'nested';
  selectable?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;}

export function Table<T extends Record<string, unknown> | { id?: string | number}>({
  columns,
  data,
  renderRow,
  className,
  variant ='standalone',
  selectable = false,
  onSelectionChange}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction:'asc' |'desc'} | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const handleSort = (key: string) => {
    let direction:'asc' |'desc' ='asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction ==='asc') {
      direction ='desc';}
    setSortConfig({ key, direction});};

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortConfig.key];
      const bValue = (b as any)[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction ==='asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction ==='asc' ? 1 : -1;
      return 0;});}, [data, sortConfig]);

  const toggleAll = () => {
    if (selectedIds.size === data.length && data.length > 0) {
      setSelectedIds(new Set());
      onSelectionChange?.([]);} else {
      const allIds = data.map((item, index) => (item as any).id ?? index);
      setSelectedIds(new Set(allIds));
      onSelectionChange?.(allIds);}};

  const toggleSelection = (id: string | number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);} else {
      newSet.add(id);}
    setSelectedIds(newSet);
    onSelectionChange?.(Array.from(newSet));};

  return (
    <div className={cn(
      variant ==='standalone'
        ?"overflow-hidden border-2 border-[#f1f2f4] bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
        :"overflow-hidden bg-white/70",
      className
    )}>
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50/80">
          <tr>
            {selectable && (
              <th scope="col" className="w-12 px-4 py-3.5 text-center">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-600 transition-colors cursor-pointer w-4 h-4"
                  checked={data.length > 0 && selectedIds.size === data.length}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                onClick={() => col.sortable && handleSort(col.key)}
                className={cn("py-3.5 px-4 text-left text-[13px] font-semibold text-slate-600 uppercase tracking-wider select-none",
                  col.sortable &&"cursor-pointer hover:bg-slate-100  :bg-slate-800 transition-colors",
                  col.className,
                  !selectable && col === columns[0] &&"pl-6"
                )}
              >
                <div className="flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && (
                    <div className="flex flex-col opacity-50">
                      <ChevronUp className={cn("w-3 h-3 -mb-1", sortConfig?.key === col.key && sortConfig.direction ==='asc' &&"opacity-100 text-primary-600 stroke-[3]")} />
                      <ChevronDown className={cn("w-3 h-3", sortConfig?.key === col.key && sortConfig.direction ==='desc' &&"opacity-100 text-primary-600 stroke-[3]")} />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white/40">
          {sortedData.map((item, index) => {
            const id = (item as any).id ?? index;
            const isSelected = selectedIds.has(id);
            return (
              <tr 
                key={id} 
                className={cn("transition-colors group",
                  isSelected ?"bg-primary-50/50" :"hover:bg-slate-50/70 :bg-slate-800/50"
                )}
              >
                {selectable && (
                  <td className="w-12 px-4 py-3 text-center align-middle whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-600 transition-colors cursor-pointer w-4 h-4"
                      checked={isSelected}
                      onChange={() => toggleSelection(id)}
                    />
                  </td>
                )}
                {renderRow(item, isSelected, () => toggleSelection(id))}
              </tr>
            );})}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center text-sm text-slate-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 border border-slate-100">
                    <div className="w-5 h-5 border-2 border-slate-300 rounded" />
                  </div>
                  <p className="font-medium text-slate-600">Ma'lumot topilmadi</p>
                  <p className="text-xs text-slate-400  mt-0.5">Jadval hozircha bo'sh</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );}
