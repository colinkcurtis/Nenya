'use client';

import { useState } from 'react';
import FinancialForm from '@/components/FinancialForm';
import FinancialSummary from '@/components/FinancialSummary';
import { IncomeSource, Expense } from '@/types/financial';

export default function BudgetPage() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Monthly Budget</h1>
      <p className="text-gray-600 mb-8">
        Track your monthly financial snapshot here.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <FinancialForm
          incomeSources={incomeSources}
          expenses={expenses}
          onUpdateIncome={setIncomeSources}
          onUpdateExpenses={setExpenses}
        />
        <FinancialSummary
          incomeSources={incomeSources}
          expenses={expenses}
        />
      </div>
    </div>
  );
}
