<script setup lang="ts">
    import ExpenseIcon from '../Icons/ExpenseIcon.vue';
    import IncomeIcon from '../Icons/IncomeIcon.vue';
    import AccountAtIcon from '../Icons/AccountAtIcon.vue';
    import GoalIcons from '../Icons/GoalIcons.vue';
    const userMeta = JSON.parse(localStorage.getItem('user') || '{}').data.meta_user || 0;
    import { useFinanceStore } from '../ContextStore/financeStore';
    import { storeToRefs } from 'pinia';
    const financeStore = useFinanceStore();
    const { balance, incomes, expenses } = storeToRefs(financeStore);
</script>

<template>
    <section class="w-full h-1/4 flex items-center justify-around">
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-green-400  hover:text-white transition-colors">
            <AccountAtIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Cuenta Actual</span>
                <span class="text-2xl font-bold">{{ balance }} $</span>
            </div>
        </article>
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-blue-400  hover:text-white transition-colors">
            <IncomeIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Ingresos</span>
                <span class="text-2xl  font-bold">{{ incomes }} $</span>
            </div>
        </article>
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-red-400  hover:text-white transition-colors">
            <ExpenseIcon/>
            <div class="flex flex-col items-center">
                <span class="text-md">Gastos</span>
                <span class="text-2xl text-red-600 font-bold">{{ expenses }} $</span>
            </div>
        </article>
        <article class="cursor-pointer flex flex-col items-center justify-center border-1 border-gray-600 rounded-2xl w-1/5 h-3/4 gap-1 hover:bg-orange-400  hover:text-white transition-colors">
            <GoalIcons/>
            <div class="flex flex-col items-center">
                <span class="text-md">Meta</span>
                <span class="text-2xl text-orange-600 font-bold">{{ userMeta }} $</span>
            </div>
        </article>
    </section>
</template>

<style>
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