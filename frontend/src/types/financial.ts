export interface IncomeSource {
    name: string;
    amount: number;
    frequency: 'monthly' | 'annual';
  }

  export interface Expense {
    name: string;
    amount: number;
    category: 'essential' | 'non-essential';
  }
