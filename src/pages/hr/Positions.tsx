import { Plus, Award} from'lucide-react';
import { Button} from'../../components/ui/Button';
import { Table} from'../../components/ui/Table';

const mockPositions = [
  { id: 1, name: 'Sotuvchi-maslahatchi', department: "Savdo bo'limi", baseSalary: '3,200,000 UZS' },
  { id: 2, name: 'Kassir', department: "Savdo bo'limi", baseSalary: '3,500,000 UZS' },
  { id: 3, name: 'Bosh buxgalter', department: "Moliya bo'limi", baseSalary: '8,000,000 UZS' },
  { id: 4, name: 'Ombor mudiri', department: 'Ombor', baseSalary: '5,000,000 UZS' },
  { id: 5, name: 'Kuryer (Yetkazib beruvchi)', department: 'Logistika', baseSalary: '4,000,000 UZS' },
];

export default function Positions() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary-600" />
            Lavozimlar
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Kompaniyadagi mavjud lavozimlar va ularning oylik stavkalari.
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" /> Lavozim qo'shish
        </Button>
      </div>

      <Table
        columns={[
          { key:'name', label:'Lavozim nomi'},
          { key:'department', label:"Tegishli bo'lim"},
          { key:'salary', label:'Baza oylik maoshi'},
        ]}
        data={mockPositions}
        renderRow={(pos) => (
          <>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
              {pos.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{pos.department}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{pos.baseSalary}</td>
          </>
        )}
      />
    </div>
  );}
