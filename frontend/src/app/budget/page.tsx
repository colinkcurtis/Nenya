'use client';

import FinancialTable from '@/components/FinancialTable';

export default function BudgetPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Monthly Budget</h1>
      <p className="text-gray-600 mb-8">
        Track your monthly financial snapshot here.
      </p>
      <FinancialTable />
    </div>
  );
}
