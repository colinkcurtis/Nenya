import { Budget } from '@/types/budget';

interface Props {
  budget: Budget;
}

export default function BudgetSummary({ budget }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Income</span>
            <span className="text-green-600">${budget.total_income}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Expenses</span>
            <span className="text-red-600">${budget.total_expenses}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Net Income</span>
            <span className={budget.net_income >= 0 ? 'text-green-600' : 'text-red-600'}>
              ${budget.net_income}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-semibold mb-2">Income Breakdown</h3>
        {Object.entries(budget.income_sources).map(([source, amount]) => (
          <div key={source} className="flex justify-between text-sm">
            <span>{source}</span>
            <span>${amount}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-semibold mb-2">Expense Breakdown</h3>
        {Object.entries(budget.expenses).map(([category, amount]) => (
          <div key={category} className="flex justify-between text-sm">
            <span>{category}</span>
            <span>${amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
