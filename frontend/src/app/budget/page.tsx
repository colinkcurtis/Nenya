export default function BudgetPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Monthly Budget</h1>
      <p className="text-gray-600 mb-4">
        Track your monthly income and expenses here.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {/* We'll add MonthlyBudgetForm and BudgetSummary components here later */}
        <div className="bg-white p-6 rounded-lg shadow">
          Budget Form coming soon...
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          Budget Summary coming soon...
        </div>
      </div>
    </div>
  )
}