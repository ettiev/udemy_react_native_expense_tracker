import axios from 'axios';
    // npm install axios

export function storeExpense(expenseData) {
    const apiUrl = process.env.EXPO_PUBLIC_DATA_URL
    axios.post(apiUrl, expenseData)
}