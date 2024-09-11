import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Shoes',
        amount: 120.50,
        date: new Date('2024-09-10')
    },
    {
        id: 'e2',
        description: 'Movie',
        amount: 225.85,
        date: new Date('2024-09-09')
    },
    {
        id: 'e3',
        description: 'McDonalds',
        amount: 94.95,
        date: new Date('2024-09-03')
    },
    {
        id: 'e4',
        description: 'Games',
        amount: 300.00,
        date: new Date('2024-09-01')
    },
    {
        id: 'e5',
        description: 'Temu Order',
        amount: 2005.72,
        date: new Date('2024-08-29')
    },
    {
        id: 'e6',
        description: 'Shoes',
        amount: 120.50,
        date: new Date('2024-09-10')
    },
    {
        id: 'e7',
        description: 'Movie',
        amount: 225.85,
        date: new Date('2024-09-09')
    },
    {
        id: 'e8',
        description: 'McDonalds',
        amount: 94.95,
        date: new Date('2024-09-03')
    },
    {
        id: 'e9',
        description: 'Games',
        amount: 300.00,
        date: new Date('2024-09-01')
    },
    {
        id: 'e10',
        description: 'Temu Order',
        amount: 2005.72,
        date: new Date('2024-08-29')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date} ) => {}
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString(); 
            return [{ ...action.payload, id: id }, ...state ]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData} });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContextProvider value={value}>{ children }</ExpensesContextProvider>
}

export default ExpensesContextProvider;