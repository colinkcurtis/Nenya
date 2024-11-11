'use client';

'use client';

import SpreadsheetTable from '@/components/SpreadsheetTable.tsx';

export default function BudgetPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Financial Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <SpreadsheetTable />
      </div>
    </div>
  );
}
