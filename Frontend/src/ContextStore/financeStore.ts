import {defineStore} from 'pinia';
import { ref } from 'vue';
import confetti from 'canvas-confetti';

export const StoreFinance = defineStore('financeStore', () => {
    const accountBalance = ref(0);
    // Removemos USERID como constante y lo obtenemos dinámicamente
    const getUserId = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.data?.id_user || null;
    };
    
    const incomes = ref(0);
    const expenses = ref(0);
    const meta = ref(0);
    const amount_finance = ref(0);
    const type_finance = ref('');
    
    // Función para verificar y reiniciar la meta si se alcanza
    const checkAndResetGoal = () => {
        if (meta.value > 0 && accountBalance.value >= meta.value) {
            // Lanzar confeti para celebrar
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            console.log('¡Meta alcanzada! Reiniciando meta a cero.');
            meta.value = 0;
            
            // Actualizar en localStorage
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.data) {
                user.data.meta_user = 0;
                localStorage.setItem('user', JSON.stringify(user));
            }
            
            return true;
        }
        return false;
    };
    
    // inicialization of the store
    const initializeStore = () => {
        const storedFinances = JSON.parse(localStorage.getItem('finances') || '{}');
        const storeUser = JSON.parse(localStorage.getItem('user') || '{}');
        const currentUserId = getUserId();
        
        if(currentUserId){
            // Para usuarios nuevos, inicializar en 0 en lugar de valores por defecto
            const isNewUser = storeUser.data?.is_new || false;
            
            if (isNewUser) {
                incomes.value = JSON.parse(localStorage.getItem(`incomes_${currentUserId}`) || '0');
                expenses.value = JSON.parse(localStorage.getItem(`expenses_${currentUserId}`) || '0');
            } else {
                // Usuario existente - cargar sus datos
                incomes.value = JSON.parse(localStorage.getItem(`incomes_${currentUserId}`) || '0');
                expenses.value = JSON.parse(localStorage.getItem(`expenses_${currentUserId}`) || '0');
            }
            
            if(storedFinances.data){
                accountBalance.value = storeUser.data.account_balance_user || 0;
                meta.value = storeUser.data.meta_user || 0;
                amount_finance.value = storedFinances.data.amount_finance || 0;
                type_finance.value = storedFinances.data.type_finance || '';
            }
            
            // Verificar si ya se alcanzó la meta al inicializar
            checkAndResetGoal();
        }
    }

    // Function to add balance
    const addBalance = () => {
        const currentUserId = getUserId();
        if (!currentUserId) return; // Si no hay usuario, no hacer nada
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if(type_finance.value === 'Ingreso') {
            accountBalance.value += amount_finance.value;
            incomes.value += amount_finance.value;
            // No reducir la meta para ingresos regulares
        }
        else if(type_finance.value === 'Gasto') {
            accountBalance.value -= amount_finance.value;
            expenses.value += amount_finance.value;
            // No afectar la meta para gastos regulares
        }
        else if(type_finance.value === 'Meta'){
            meta.value += amount_finance.value;
        }
        
        // Verificar y reiniciar la meta si se alcanza
        checkAndResetGoal();
        
        // Asegurar que los valores no sean negativos
        if(accountBalance.value <= 0) accountBalance.value = 0;
        if(incomes.value <= 0) incomes.value = 0;
        if(expenses.value <= 0) expenses.value = 0;
        if(meta.value <= 0) meta.value = 0;

        // Update local storage
        user.data.account_balance_user = accountBalance.value;
        user.data.meta_user = meta.value;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem(`incomes_${currentUserId}`, JSON.stringify(incomes.value));
        localStorage.setItem(`expenses_${currentUserId}`, JSON.stringify(expenses.value));
        saveBalance();
    }
    
    // Function para eliminar el balance
    const deleteBalance = () => {
        const currentUserId = getUserId();
        if (!currentUserId) return;
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(type_finance.value === 'Ingreso') {
            accountBalance.value -= amount_finance.value;
            incomes.value -= amount_finance.value;
        }
        else if(type_finance.value === 'Gasto') {
            accountBalance.value += amount_finance.value; // Sumar en lugar de restar
            expenses.value -= amount_finance.value;
        }
        else if(type_finance.value === 'Meta'){
            if(meta.value - amount_finance.value < 0){
                meta.value = 0;
            } else {
                meta.value -= amount_finance.value;
            }
        }
        
        // Verificar si después de eliminar aún se mantiene la meta alcanzada
        checkAndResetGoal();
        
        if(accountBalance.value <= 0) accountBalance.value = 0;
        if(incomes.value <= 0) incomes.value = 0;
        if(expenses.value <= 0) expenses.value = 0;
        if(meta.value <= 0) meta.value = 0;
        
        // Update local storage
        user.data.account_balance_user = accountBalance.value;
        user.data.meta_user = meta.value;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem(`incomes_${currentUserId}`, JSON.stringify(incomes.value));
        localStorage.setItem(`expenses_${currentUserId}`, JSON.stringify(expenses.value));
        saveBalance();
    }
    
    // Function para guardar los valores de saldo actual y meta en el backend
    const saveBalance = async () => {
        try{
            const currentUserId = getUserId();
            if (!currentUserId) return;
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Users/Update/${currentUserId}`,{
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
        incomes.value = 0;
        expenses.value = 0;
    }
    
    return { 
        accountBalance, 
        incomes, 
        expenses, 
        meta, 
        amount_finance, 
        type_finance, 
        initializeStore, 
        addBalance, 
        deleteBalance, 
        saveBalance, 
        resetStore,
        checkAndResetGoal 
    };
});