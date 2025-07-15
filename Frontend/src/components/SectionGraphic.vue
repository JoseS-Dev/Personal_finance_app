<script setup lang="ts">
    import FormFr from './FormFr.vue';
    import Graphics from './Graphics.vue';
    import { MONTHS, YEARS } from '../Utils';
    import { ref, computed, watch } from 'vue';
    const month_select = ref(MONTHS[new Date().getMonth()]);
    const year_select = ref('2025');
    const user = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    let expense_month = ref(0);
    let income_month = ref(0);


    const formattedDate = computed(() => {
        if(!month_select.value || !year_select.value) {
            return '';
        }
        const monthIndex = MONTHS.indexOf(month_select.value) + 1;
        const date = new Date(`${year_select.value}-${monthIndex}-01`);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    })
    
    // Function que llama a la api para obtener el mes y el año seleccionados
    const fetchDataForSelectedMonth = async () => {
        if(!formattedDate.value) {
            console.error('Invalid date format');
            return;
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Finances/date/${formattedDate.value}/${user}`);
            if(!response.ok) throw new Error('Network response was not ok');
            const finances = await response.json();
            console.log('Finances for the selected month:', finances);
            // Obtenemos la data y la procesamos para obtener los gastos y ingresos de ese mes
            finances.data.forEach((finance: any) => {
                if(finance.type_finance === 'Ingreso') {
                    income_month.value += finance.amount_finance;
                } else if(finance.type_finance === 'Gasto') {
                    expense_month.value += finance.amount_finance;
                }
            });
            if(parseInt(year_select.value) < 2025) {
                income_month.value = 0;
                expense_month.value = 0;
            }
            console.log('Expenses for the month:', expense_month);
            console.log('Income for the month:', income_month);
        }
        catch(error) {
            console.error('Error fetching data:', error);
        }
        finally {

        }
    }
    console.log('income_month:', income_month);
    console.log('expense_month:', expense_month);

    watch([month_select, year_select], () => {
        fetchDataForSelectedMonth();
    }, { immediate: true });

    const handleFinanceAdded = (newFinance: any) => {
        if (newFinance.type_finance === 'Ingreso') {
            income_month.value += newFinance.amount_finance;
        } else if (newFinance.type_finance === 'Gasto') {
            expense_month.value += newFinance.amount_finance;
        }
    }

</script>

<template>
    <section class="w-full h-2/3 flex items-center justify-around">
        <article class="w-4/5 h-full p-3 flex flex-col gap-2.5">
            <div class="flex items-center justify-between px-3">
                <h3 class="text-2xl tracking-wide font-semibold">Estadisticas del {{ month_select }} del {{ year_select }}</h3>
                <div class=" w-1/4 h-10 flex items-center justify-between gap-1.5">
                    <select
                        class="w-1/2 border-black border-2 rounded-3xl text-lg h-10 px-0.5 font-semibold hover:cursor-pointer"
                        id="month_select"
                        v-model="month_select"
                    >
                        <option v-for="month in MONTHS" :key="month" :value="month">{{ month }}</option>
                    </select>
                    <select
                        class="w-1/2 border-black border-2 rounded-3xl text-lg h-10 px-0.5 font-semibold hover:cursor-pointer"
                        id="year_select"
                        v-model="year_select">
                        <option v-for="year in YEARS" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
            <div v-if="income_month == 0 || expense_month == 0" class="flex items-center justify-center h-full">
                <p class="text-2xl font-semibold">Registre sus primeros Ingresos o gastos para mostrar las graficas</p>
            </div>
            <Graphics v-else :incomes="income_month" :expenses="expense_month"/>
        </article>
        <article class="w-1/4 h-full p-3 flex flex-col items-center">
            <FormFr @financeAdded="handleFinanceAdded"/>
        </article>
    </section>
</template>
