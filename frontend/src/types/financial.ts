export interface IncomeSource {
    name: string;
    amount: number;
    frequency: 'monthly' | 'annual';  // we can expand this later
  }
  
  export interface Expense {
    name: string;
    amount: number;
    category: 'essential' | 'non-essential';  // simple categorization to start
  }
  
  export interface FinancialSnapshot {
    income: IncomeSource[];
    expenses: Expense[];
    month: string;  // YYYY-MM format
  }
  
  export interface FinancialMetrics {
    totalMonthlyIncome: number;
    totalMonthlyExpenses: number;
    netMonthlyCashflow: number;
    savingsRate: number;
  }