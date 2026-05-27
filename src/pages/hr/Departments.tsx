import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { useHRStore } from '../../store/useHRStore';

export default function Departments() {
  const { departments, addDepartment } = useHRStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', manager: '', employeeCount: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartment(form);
    setForm({ name: '', manager: '', employeeCount: 0 });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-slate-900">Bo'limlar</h3>
          <p className="mt-1 text-sm text-slate-500">
            Tashkilotning tarkibiy bo'linmalari va ularning ma'lumotlari.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Bo'lim yaratish
        </Button>
      </div>

      <Table
        columns={[
          { key: 'name', label: "Bo'lim nomi" },
          { key: 'manager', label: 'Rahbar' },
          { key: 'count', label: 'Xodimlar soni' },
          { key: 'actions', label: '' },
        ]}
        data={departments}
        renderRow={(dept) => (
          <>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
              {dept.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{dept.manager}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                {dept.employeeCount} ta xodim
              </span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
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
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Rahbar (F.I.SH)"
            placeholder="Aziz Rahimov"
            value={form.manager}
            onChange={(e) => setForm({ ...form, manager: e.target.value })}
            required
          />
          <Input
            label="Xodimlar soni"
            type="number"
            placeholder="0"
            value={form.employeeCount || ''}
            onChange={(e) => setForm({ ...form, employeeCount: Number(e.target.value) })}
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
  );
}
