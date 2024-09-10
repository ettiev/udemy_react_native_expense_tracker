import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

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

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={ DUMMY_EXPENSES } periodName={ expensesPeriod }/>
            <ExpensesList expenses={ DUMMY_EXPENSES } />
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    }
})