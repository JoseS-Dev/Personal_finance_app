<script setup lang="ts">
    import AccountAtIcon from '../assets/Icons/AccountAtIcon.vue';
    import IncomeIcon from '../assets/Icons/IncomeIcon.vue';
    import ExpenseIcon from '../assets/Icons/ExpenseIcon.vue';
    import GoalIcons from '../assets/Icons/GoalIcons.vue';
    import { StoreFinance } from '../ContextStore/financeStore';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    const useFinanceStore = StoreFinance();
    const { initializeStore } = useFinanceStore;
    onMounted(() => {
        initializeStore();
    })
    const { accountBalance, incomes, expenses, meta } = storeToRefs(useFinanceStore);

    import { ref, computed } from 'vue';
    const currency = ref(localStorage.getItem('selectedCurrency') || 'USD');
    const bcvPrice = ref(Number(localStorage.getItem('bcvPrice')) || 1);

    // Actualizar cuando cambie localStorage
    window.addEventListener('storage', () => {
        currency.value = localStorage.getItem('selectedCurrency') || 'USD';
        bcvPrice.value = Number(localStorage.getItem('bcvPrice')) || 1;
    });

    const displayAccountBalance = computed(() => currency.value === 'VES' ? Number(accountBalance.value) * bcvPrice.value : Number(accountBalance.value));
    const displayIncomes = computed(() => currency.value === 'VES' ? Number(incomes.value) * bcvPrice.value : Number(incomes.value));
    const displayExpenses = computed(() => currency.value === 'VES' ? Number(expenses.value) * bcvPrice.value : Number(expenses.value));
    const displayMeta = computed(() => currency.value === 'VES' ? Number(meta.value) * bcvPrice.value : Number(meta.value));
    const currencySymbol = computed(() => currency.value === 'VES' ? 'Bs.' : '$');


</script>

<template>
    <section class="w-full h-1/4 flex items-center justify-around">
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-green-400  hover:text-white transition-colors">
            <AccountAtIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Cuenta Actual</span>
                <span class="text-2xl font-bold">{{ displayAccountBalance }} {{ currencySymbol }}</span>
            </div>
        </article>
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-blue-400  hover:text-white transition-colors">
            <IncomeIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Ingresos</span>
                <span class="text-2xl  font-bold">{{ displayIncomes }} {{ currencySymbol }}</span>
            </div>
        </article>
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-red-400  hover:text-white transition-colors">
            <ExpenseIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Gastos</span>
                <span class="text-2xl text-red-600 font-bold">{{ displayExpenses }} {{ currencySymbol }}</span>
            </div>
        </article>
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-orange-400  hover:text-white transition-colors">
            <GoalIcons/>
            <div class="flex flex-col items-center">
                <span class="text-md">Meta</span>
                <span class="text-2xl text-orange-600 font-bold">{{ displayMeta }} {{ currencySymbol }}</span>
            </div>
        </article>
    </section>
</template>

<style scoped>
    article:nth-child(1):hover svg{
        stroke: #4F8B31;
        background-color: #fff;
    }
    article:nth-child(2):hover svg{
        stroke: #1E3A8A;
        background-color: #fff;
    }
    article:nth-child(3):hover svg{
        stroke: #B91C1C;
        background-color: #fff;
    }
    article:nth-child(4):hover svg{
        stroke: #C2410C;
        background-color: #fff;
    }
    article:nth-child(1) span:nth-child(2){
        color: #4F8B31;
    }
    article:nth-child(2) span:nth-child(2){
        color: #1E3A8A;
    }
    article:nth-child(3) span:nth-child(3){
        color: #B91C1C;
    }
    article:nth-child(4) span:nth-child(4){
        color: #C2410C;
    }
    article:hover span:nth-child(2){
        color: #fff;
    }
    article:hover span:nth-child(3){
        color: #fff;
    }
    article:hover span:nth-child(4){
        color: #fff;
    }
</style>