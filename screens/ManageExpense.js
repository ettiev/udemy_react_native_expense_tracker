import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);
    
    const editedExpenseId = route.params?.expenseId;
    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSending(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Expense could not be deleted!');
            setIsSending(false);   
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSending(true);
        try {
            if (isEditing) {
                await updateExpense(editedExpenseId, expenseData);
                expensesCtx.updateExpense(editedExpenseId, expenseData);    
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError('Expense could save data!');
            setIsSending(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    if (error && !isSending) {
        return <ErrorOverlay
            message={error}
            onConfirm={errorHandler}
        />;
    }

    if (isSending) {
        return <LoadingOverlay />;
    }

    return (
        <View style={ styles.container }>
            <ExpenseForm 
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={ styles.deleteContainer }>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={ deleteExpenseHandler } 
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})