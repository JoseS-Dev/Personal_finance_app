<script setup lang="ts">
    import FormFr from './FormFr.vue';
    import Graphics from './Graphics.vue';
    import { MONTHS, YEARS } from '../Utils';
    import { ref, computed, watch } from 'vue';
    import { useInstructionStore } from '../ContextStore/Instruction';
    const month_select = ref(MONTHS[new Date().getMonth()]);
    const year_select = ref('2025');
    const user = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    let expense_month = ref(0);
    let income_month = ref(0);
    const isNewUser = Number(JSON.parse(localStorage.getItem('user') || '{}').data?.is_new) || 0;
    const instructionStore = useInstructionStore();
    const show2 = ref(instructionStore.tip2);
    watch(() => instructionStore.tip2, (val) => {
        show2.value = val;
    });
    const show3 = ref(JSON.parse(localStorage.getItem('show3') || 'false'));
    const show4 = ref(JSON.parse(localStorage.getItem('show4') || 'false'));
    const showManualTip1 = ref(false);
    const showManualTip2 = ref(false);
    const showManualTip3 = ref(false);
    
    const formattedDate = computed(() => {
        if (!month_select.value || !year_select.value) {
            return '';
        }
        const monthIndex = MONTHS.indexOf(month_select.value) + 1;
        const date = new Date(`${year_select.value}-${monthIndex}-01`);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    })
    
    watch([showManualTip1, showManualTip2, showManualTip3], ([tip1, tip2, tip3]) => {
        if (tip1 && tip2 && tip3) {
            show3.value = true;
            localStorage.setItem('show3', JSON.stringify(true));
        }
    });
    watch(show4, (val) => {
      localStorage.setItem('show4', JSON.stringify(val));
    });
      watch(show3, (val) => {
      localStorage.setItem('show1', JSON.stringify(val));
    });
    
    // Function que llama a la api para obtener el mes y el año seleccionados
    const fetchDataForSelectedMonth = async () => {
        if (!formattedDate.value) {
            console.error('Invalid date format');
            return;
        }
        income_month.value = 0;
        expense_month.value = 0;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Finances/date/${formattedDate.value}/${user}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const finances = await response.json();
            console.log('Finances for the selected month:', finances);
            // Obtenemos la data y la procesamos para obtener los gastos y ingresos de ese mes
            finances.data.forEach((finance: any) => {
                if (finance.type_finance === 'Ingreso') {
                    income_month.value += finance.amount_finance;
                } else if (finance.type_finance === 'Gasto') {
                    expense_month.value += finance.amount_finance;
                }
            });
            
            console.log('Expenses for the month:', expense_month);
            console.log('Income for the month:', income_month);
        }
        catch (error) {
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

    <div v-if="!show3 && isNewUser === 1 || !show4 && isNewUser === 1" class="fixed inset-0  z-40 pointer-events-auto"></div>
    <section class="w-full h-2/3 flex items-center justify-around" :class="{'pointer-events-none': !show3 && isNewUser === 1 || isNewUser === 1 && !show4}">
        <article class="w-4/5 h-full p-3 flex flex-col gap-2.5">
            <div class="flex items-center justify-between px-3">
                <h3 class="text-2xl tracking-wide font-semibold">Estadisticas del {{ month_select }} del {{ year_select
                    }}</h3>
                <div class=" w-1/4 h-10 flex items-center justify-between gap-1.5">
                    <div v-if="!showManualTip1 && show2 && isNewUser === 1 && !show3"
                        class="absolute left-148 top-63 bg-green-500 text-white px-1 py-2 rounded shadow-lg text-sm z-50 flex flex-col items-start gap-1 pointer-events-auto">
                        <!-- Permitir interacción solo en este span -->
                        <span>Selecciona el mes que desee visualizar.</span>
                        <span @click="showManualTip1 = true" class="text-xs mt-1 cursor-pointer z-50 pointer-events-auto">(Haz clic para cerrar)</span>
                    </div>
                    <select
                        :class="['w-1/2 border-black border-2 rounded-3xl text-lg h-10 px-0.5 font-semibold hover:cursor-pointer', show2 && !show3 && isNewUser === 1? 'border-green-600 border-5' : 'bg-white']"
                        id="month_select" v-model="month_select">
                        <option v-for="month in MONTHS" :key="month" :value="month">{{ month }}</option>
                    </select>
                    <select
                        :class="['w-1/2 border-black border-2 rounded-3xl text-lg h-10 px-0.5 font-semibold hover:cursor-pointer', show2 && !show3 && isNewUser === 1 ? 'border-green-600 border-5' : 'bg-white']"
                        id="year_select" v-model="year_select">
                        <option v-for="year in YEARS" :key="year" :value="year">{{ year }}</option>
                        
                    </select>
                </div>

                <div v-if="!showManualTip2 && show2 && isNewUser === 1 && !show3"
                    class="absolute right-30 top-63 bg-green-500 text-white px-1 py-2 rounded shadow-lg text-sm z-50 flex flex-col items-start gap-1 pointer-events-auto">
                    
                    <span>Selecciona el año que desee visualizar.</span>
                    <span @click="showManualTip2 = true" class="cursor-pointer text-xs mt-1 z-50 pointer-events-auto">(Haz clic para cerrar)</span>
                </div>
            </div>
            <div v-if="income_month == 0 || expense_month == 0" class="flex items-center justify-center h-full" :class="{'border-5 border-green-500': show2 && !show3 && isNewUser === 1}">
                <p class="text-2xl font-semibold">Registre sus primeros Ingresos o gastos para mostrar las graficas</p>
            </div>
            <Graphics :class="show2 && !show3 && isNewUser === 1 ? 'border-[5px] border-green-500 rounded-2xl' : 'bg-white'" v-else
                :incomes="income_month" :expenses="expense_month" />
            <div v-if="!showManualTip3 && show2 && isNewUser === 1 && !show3"
                class="absolute right-10 top-155 bg-green-500 text-white px-1 py-4 rounded shadow-lg text-sm z-50 flex flex-col items-start gap-1 pointer-events-auto">
                <span>Área de gráficos, recopila la información registrada de tus gastos y la analiza.</span>
                <span @click="showManualTip3 = true" class="cursor-pointer text-xs mt-1 z-50 pointer-events-auto">(Haz clic para cerrar)</span>
            </div>
        </article>
        <div v-if="!show4 && show3"      >
            <div class="absolute top-110 right-90 bg-green-500 text-white px-1 py-2 rounded shadow-lg text-sm z-50 flex flex-col items-start gap-1 pointer-events-auto" style="min-width:220px;">
                <span>Ingresa tus movimientos financieros en este panel</span>
                <span @click="show4 = true" class="text-xs ml-2 cursor-pointer pointer-events-auto">(Haz clic para cerrar)</span>
            </div>
            
        </div>
        <article class="w-1/4 h-full p-3 flex flex-col items-center" >
           
            <FormFr :class="['', show3 && !show4 ? 'border-[5px] border-green-500 rounded-2xl' : 'bg-white']"
                @financeAdded="handleFinanceAdded" />
        </article>
    </section>
</template>
