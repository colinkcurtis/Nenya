'use client';

import { IncomeSource, Expense } from '@/types/financial';

interface Props {
  incomeSources: IncomeSource[];
  expenses: Expense[];
}

export default function FinancialSummary({ incomeSources, expenses }: Props) {
  const totalMonthlyIncome = incomeSources.reduce((total, source) => {
    const monthlyAmount = source.frequency === 'annual' 
      ? source.amount / 12 
      : source.amount;
    return total + monthlyAmount;
  }, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Total Monthly Income</div>
        <div className="text-2xl text-green-600">
          ${totalMonthlyIncome.toLocaleString()}
        </div>
      </div>
    </div>
  );
}