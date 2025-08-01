<script setup lang="ts">
    import AccountAtIcon from '../assets/Icons/AccountAtIcon.vue';
    import IncomeIcon from '../assets/Icons/IncomeIcon.vue';
    import ExpenseIcon from '../assets/Icons/ExpenseIcon.vue';
    import GoalIcons from '../assets/Icons/GoalIcons.vue';
    import { StoreFinance } from '../ContextStore/financeStore';
    import { storeToRefs } from 'pinia';
    import { onMounted, ref, computed, watch } from 'vue';
    
    const useFinanceStore = StoreFinance();
    const { initializeStore } = useFinanceStore;
    onMounted(() => {
        initializeStore();
    })
    const { accountBalance, incomes, expenses, meta } = storeToRefs(useFinanceStore);

    const currency = ref(localStorage.getItem('selectedCurrency') || 'USD');
    const bcvPrice = ref(Number(localStorage.getItem('bcvPrice')) || 1);
    const show1 = ref(JSON.parse(localStorage.getItem('show1') || 'false'));
    const newUser = Number(JSON.parse(localStorage.getItem('user') || '{}').data?.is_new) || 0;
    const show2 = ref(JSON.parse(localStorage.getItem('show2') || 'false'));
    console.log('New user status:', newUser);
    // Actualizar cuando cambie localStorage
    window.addEventListener('storage', () => {
        currency.value = localStorage.getItem('selectedCurrency') || 'USD';
        bcvPrice.value = Number(localStorage.getItem('bcvPrice')) || 1;
        show1.value = JSON.parse(localStorage.getItem('show1') || 'false');
    });
    watch(show1, (val) => {
  localStorage.setItem('show1', JSON.stringify(val));
});
    // Función para cerrar el mensaje verde
    const closeInfoMessage = () => {
        show2.value = true;
        localStorage.setItem('show2', JSON.stringify(true));
        
    };
   

    const displayAccountBalance = computed(() => currency.value === 'VES' ? Number(accountBalance.value) * bcvPrice.value : Number(accountBalance.value));
    const displayIncomes = computed(() => currency.value === 'VES' ? Number(incomes.value) * bcvPrice.value : Number(incomes.value));
    const displayExpenses = computed(() => currency.value === 'VES' ? Number(expenses.value) * bcvPrice.value : Number(expenses.value));
    const displayMeta = computed(() => currency.value === 'VES' ? Number(meta.value) * bcvPrice.value : Number(meta.value));
    const currencySymbol = computed(() => currency.value === 'VES' ? 'Bs.' : '$');
   

</script>

<template>
    <section class='w-full h-1/4 flex items-center justify-around'>
        <article :class="['cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-green-400 hover:text-white transition-colors', show1 && !show2 && newUser === 1 ? 'article-blur' : '']">
            <AccountAtIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Cuenta Actual</span>
                <span class="text-2xl font-bold">{{ displayAccountBalance }} {{ currencySymbol }}</span>
            </div>
        </article>
        <article :class="['cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-blue-400 hover:text-white transition-colors', show1 && !show2 && newUser === 1 ? 'article-blur' : '']">
            <IncomeIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Ingresos</span>
                <span class="text-2xl  font-bold">{{ displayIncomes }} {{ currencySymbol }}</span>
            </div>
        </article>
        <article :class="['cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-red-400 hover:text-white transition-colors', show1 && !show2 && newUser === 1 ? 'article-blur' : '']">
            <ExpenseIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Gastos</span>
                <span class="text-2xl text-red-600 font-bold">{{ displayExpenses }} {{ currencySymbol }}</span>
            </div>
        </article>
        <article :class="['cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-orange-400 hover:text-white transition-colors', show1 && !show2 && newUser === 1 ? 'article-blur' : '']">
            <GoalIcons/>
            <div class="flex flex-col items-center">
                <span class="text-md">Meta</span>
                <span class="text-2xl text-orange-600 font-bold">{{ displayMeta }} {{ currencySymbol }}</span>
            </div>
        </article>
    </section>
    <!-- Overlay bloquea la página mientras el mensaje está abierto -->
    <div v-if="show1 && !show2 && newUser === 1">
        <div class="fixed inset-0  z-40"></div>
        <div class="w-full flex justify-center mt-4 fixed top-1/3 left-0 z-50">
            <div class="bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold text-center relative" style="max-width:600px;">
                Recopilacion de datos registrados, cuentas actuales, ingresos, gastos y metas
                <span @click="closeInfoMessage" class="absolute right-4 bottom-2 text-white text-xs cursor-pointer bg-green-600 px-2 py-1 rounded">(Haz clic para cerrar)</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .article-blur {
        border: 5px solid green;
        pointer-events: none;
    }
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