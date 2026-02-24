import { Expense } from "./expense";

export type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  getExpenseById: (id: string) => Expense | undefined;
  budget: number;
  setBudget: (budget: number) => void;
};
