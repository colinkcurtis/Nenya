export interface Budget {
    id?: number;
    income_sources: Record<string, number>;
    expenses: Record<string, number>;
    total_income?: number;
    total_expenses?: number;
    net_income?: number;
    month?: string;
  }
