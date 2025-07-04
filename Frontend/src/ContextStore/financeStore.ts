import {defineStore} from 'pinia';
import { ref } from 'vue';
import confetti from 'canvas-confetti';

export const StoreFinance = defineStore('financeStore', () => {
    const accountBalance = ref(0);
    const USERID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    const incomes = ref(parseFloat(localStorage.getItem(`incomes_${USERID}`) || '0'));
    const expenses = ref(parseFloat(localStorage.getItem(`expenses_${USERID}`) || '0'));
    const meta = ref(0);
    const amount_finance = ref(0);
    const type_finance = ref('');
    
    // inicialization of the store
    const initializeStore = () => {
        const storedFinances = JSON.parse(localStorage.getItem('finances') || '{}');
        const storeUser = JSON.parse(localStorage.getItem('user') || '{}');
        if(storedFinances.data && storeUser.data){
            accountBalance.value = storeUser.data.account_balance_user;
            amount_finance.value = storedFinances.data.amount_finance;
            meta.value = storeUser.data.meta_user || 0;
            type_finance.value = storedFinances.data.type_finance;
            incomes.value = parseFloat(localStorage.getItem(`incomes_${USERID}`) || '0');
            expenses.value = parseFloat(localStorage.getItem(`expenses_${USERID}`) || '0');
        }


    }

    // Function to add balance
    const addBalance = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(type_finance.value === 'Ingreso') {
            accountBalance.value += amount_finance.value;
            incomes.value += amount_finance.value;
            meta.value -= amount_finance.value;
            if(meta.value < 0) meta.value = 0;
            localStorage.setItem(`incomes_${USERID}`, JSON.stringify(incomes.value));
        }
        else if(type_finance.value === 'Gasto') {
            accountBalance.value -= amount_finance.value;
            expenses.value += amount_finance.value;
            if(!expenses.value) expenses.value = 0;
            localStorage.setItem(`expenses_${USERID}`, JSON.stringify(expenses.value));
        }
        else if(type_finance.value === 'Meta'){
            meta.value += amount_finance.value;
            user.data.meta_user = meta.value;
            localStorage.setItem('user', JSON.stringify(meta.value));
        }

        if(accountBalance.value >= meta.value && meta.value > 0) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        // Update local storage
        user.data.account_balance_user = accountBalance.value;
        user.data.meta_user = meta.value;
        localStorage.setItem('user', JSON.stringify(user));
        saveBalance();

    }
    // Function para eliminar el balance
    const deleteBalance = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(type_finance.value === 'Ingreso') {
            accountBalance.value -= amount_finance.value;
            incomes.value -= amount_finance.value;
            if(incomes.value < 0) incomes.value = 0;
            if(!meta.value) meta.value = 0;
            localStorage.setItem(`incomes_${USERID}`, JSON.stringify(incomes.value));
        }
        else if(type_finance.value === 'Gasto') {
            accountBalance.value -= amount_finance.value;
            expenses.value -= amount_finance.value;
            if(expenses.value < 0) expenses.value = 0;
            localStorage.setItem(`expenses_${USERID}`, JSON.stringify(expenses.value));
        }
        else if(type_finance.value === 'Meta'){
            if(meta.value - amount_finance.value < 0){
                meta.value = 0;
            }
            meta.value -= amount_finance.value;
        }
        // Update local storage
        user.data.account_balance_user = accountBalance.value;
        user.data.meta_user = meta.value;
        localStorage.setItem('user', JSON.stringify(user));
        saveBalance();
    }
    // Function para guardar los valores de saldo actual y meta en el backend
    const saveBalance = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Users/Update/${USERID}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_balance_user: accountBalance.value,
                    meta_user: meta.value
                })
            });
            if(!response.ok) throw new Error('Error al actualizar el saldo del usuario');
            await response.json();

        }
        catch(error) {
            console.error('Error al guardar el balance:', error);
        }
    }
    // Function to reset the store
    const resetStore = () => {
        accountBalance.value = 0;
        meta.value = 0;
        amount_finance.value = 0;
        type_finance.value = '';
        Logout();
    }
    // Funcion que mantiene los valores de ingresos y gastos actualizados cuando cierro sesión
    const Logout = () => {
        localStorage.setItem(`incomes_${USERID}`, JSON.stringify(incomes.value));
        localStorage.setItem(`expenses_${USERID}`, JSON.stringify(expenses.value));
    }
    return { accountBalance, incomes, expenses, meta, amount_finance, type_finance, initializeStore, addBalance,deleteBalance, saveBalance, resetStore };
});