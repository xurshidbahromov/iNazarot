import { useState} from'react';
import { Plus, Trash2, Edit, Building2} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Input} from'../../components/ui/Input';
import { Table} from'../../components/ui/Table';
import { Modal} from'../../components/ui/Modal';
import { useHRStore} from'../../store/useHRStore';

export default function Departments() {
  const { departments, addDepartment} = useHRStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name:'', manager:'', employeeCount: 0});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartment(form);
    setForm({ name:'', manager:'', employeeCount: 0});
    setIsModalOpen(false);};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#20c997]" />
            Bo'limlar
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tashkilotning tarkibiy bo'linmalari va ularning ma'lumotlari.
          </p>
        </div>
        <Button 
          className="rounded-xl h-10 px-4 bg-primary-600 hover:bg-primary-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all text-white text-sm font-semibold flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" strokeWidth={2} /> Bo'lim yaratish
        </Button>
      </div>

      <Table
        columns={[
          { key:'name', label: "Bo'lim nomi" },
          { key:'manager', label: 'Rahbar' },
          { key:'count', label: 'Xodimlar soni' },
          { key:'actions', label: '' },
        ]}
        data={departments}
        renderRow={(dept) => (
          <>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 dark:text-slate-100 sm:pl-6">
              {dept.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">{dept.manager}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                {dept.employeeCount} ta xodim
              </span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-red-50 dark:bg-red-950/50 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </>
        )}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yangi bo'lim yaratish">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Bo'lim nomi"
            placeholder="Savdo bo'limi"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value})}
            required
          />
          <Input
            label="Rahbar (F.I.SH)"
            placeholder="Aziz Rahimov"
            value={form.manager}
            onChange={(e) => setForm({ ...form, manager: e.target.value})}
            required
          />
          <Input
            label="Xodimlar soni"
            type="number"
            placeholder="0"
            value={form.employeeCount ||''}
            onChange={(e) => setForm({ ...form, employeeCount: Number(e.target.value)})}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );}
