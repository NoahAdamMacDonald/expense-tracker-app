import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Expense } from "../types/expense";
import { ExpenseContextType } from "@/types/expenseContext";

const ExpensesContext = createContext<ExpenseContextType | null>(null);

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    //add expense
    const addExpense = useCallback((expense : Expense) => {
        setExpenses((previous)=>[...previous, expense]);
    }, []);

    //retrieve single expense
    const getExpenseById = useCallback(
        (id:string)=>expenses.find((expense) => expense.id === id),
        [expenses]
    );

    //prevent re-rendering entire component
    const value = useMemo(
        () => ({
            expenses,
            addExpense,
            getExpenseById,
        }),
        [expenses, addExpense, getExpenseById]
    );

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export function useExpenses() {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error("useExpenses must be used within a ExpensesProvider");
    }
    return context;
}
