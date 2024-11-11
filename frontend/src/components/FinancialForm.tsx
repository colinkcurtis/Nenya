'use client';

import { IncomeSource, Expense } from '@/types/financial';

interface Props {
  incomeSources: IncomeSource[];
  expenses: Expense[];
  onUpdateIncome: (sources: IncomeSource[]) => void;
  onUpdateExpenses: (expenses: Expense[]) => void;
}

export default function FinancialForm(props: Props) {
  const addIncomeSource = () => {
    const name = prompt('Income source name:');
    const amount = parseFloat(prompt('Monthly amount:') || '0');
    const frequency = prompt('Frequency (monthly/annual):') as 'monthly' | 'annual';

    if (name && amount && frequency) {
      props.onUpdateIncome([...props.incomeSources, { name, amount, frequency }]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Monthly Income</h2>
        {props.incomeSources.map((source, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{source.name}</span>
            <span className="text-green-600">
              ${source.amount.toLocaleString()}/{source.frequency}
            </span>
          </div>
        ))}
        <button
          onClick={addIncomeSource}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Income Source
        </button>
      </div>
    </div>
  );
}
