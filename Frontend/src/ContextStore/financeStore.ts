import {defineStore} from 'pinia';
import { ref } from 'vue';

export const StoreFinance = defineStore('financeStore', () => {
    const accountBalance = ref(0);
    const incomes = ref(0);
    const expenses = ref(0);
    const amount_finance = ref(0);
    const type_finance = ref('');
    
    // inicialization of the store
    const initializeStore = () => {
        const storedFinances = JSON.parse(localStorage.getItem('finances') || '{}');
        const storeUser = JSON.parse(localStorage.getItem('user') || '{}');
        if(storedFinances.data && storeUser.data){
            accountBalance.value = storeUser.data.account_balance_user;
            amount_finance.value = storedFinances.data.amount_finance;
            type_finance.value = storedFinances.data.type_finance;
            incomes.value = parseFloat(localStorage.getItem('incomes') || '0');
            expenses.value = parseFloat(localStorage.getItem('expenses') || '0');
        }


    }

    // Function to add balance
    const addBalance = () => {
        if(type_finance.value === 'Ingreso') {
            accountBalance.value += amount_finance.value;
            incomes.value += amount_finance.value;
            localStorage.setItem('incomes', JSON.stringify(incomes.value));
        }
        else if(type_finance.value === 'Gasto') {
            accountBalance.value -= amount_finance.value;
            expenses.value += amount_finance.value;
            localStorage.setItem('expenses', JSON.stringify(expenses.value));
        }
        // Update local storage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.data.account_balance_user = accountBalance.value;
        localStorage.setItem('user', JSON.stringify(user));

    }
    // Function to reset the store
    const resetStore = () => {
        accountBalance.value = 0;
        incomes.value = 0;
        expenses.value = 0;
        amount_finance.value = 0;
        type_finance.value = '';
    }
    return { accountBalance, incomes, expenses, amount_finance, type_finance, initializeStore, addBalance, resetStore };
});