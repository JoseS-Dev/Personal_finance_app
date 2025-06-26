import {defineStore} from 'pinia';

// Define the store
export const useFinanceStore = defineStore('finances', {
    state: () => ({
        balance: JSON.parse(localStorage.getItem('user') || '{}').data.account_balance_user || 0,
        incomes: JSON.parse(localStorage.getItem('incomes') || "0"),
        expenses: JSON.parse(localStorage.getItem('expenses') || "0"),
        transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
    }),
    actions: {
        async fetchFinances(userID:any ,transactions: any){
            // Actualizar el balance
            if(transactions.type_finance === 'Ingreso'){
                this.balance += transactions.amount_finance;
                this.incomes += transactions.amount_finance;
            }
            else if(transactions.type_finance === 'Gasto'){
                this.balance -= transactions.amount_finance;
                this.expenses += transactions.amount_finance;
            }

            localStorage.setItem('user', JSON.stringify({
                data: {
                    account_balance_user: this.balance,
                    id_user: JSON.parse(localStorage.getItem('user') || '{}').data.id_user
                }
            }))
            localStorage.setItem('incomes', JSON.stringify(this.incomes));
            localStorage.setItem('expenses', JSON.stringify(this.expenses));

            // Enviamos la transacción al servidor
            try{
                const response = await fetch(`http://localhost:5000/finances/create/${userID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(transactions)
                });

                if (!response.ok) {
                    throw new Error('Error al crear la transacción');
                }

                const data = await response.json();
                this.transactions.push(data);
                localStorage.setItem('transactions', JSON.stringify(this.transactions));
            }
            catch (error) {
                console.error('Error al enviar la transacción:', error);
            }
        }
    }
})