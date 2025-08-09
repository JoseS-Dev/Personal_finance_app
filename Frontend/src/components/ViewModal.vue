<script setup lang="ts">
    import { ref, defineProps, watch} from 'vue';
    
    const props = defineProps<{
        finance: {
            id_finance: number;
            description_finance: string;
            amount_finance: number;
            type_finance: string;
            category_finance: string;
            date_finance: string;
        };
    }>();
    const { finance } = props;
    console.log('Finance data:', finance);
    const description_finance = ref('');
    const amount_finance = ref(0);
    const type_finance = ref('Gastos');
    const category_finance = ref('Salidas');
    const date_finance = ref(new Date().toISOString().split('T')[0]);

    watch(() => finance, (newFinance) => {
        if (newFinance) {
            description_finance.value = newFinance.description_finance;
            amount_finance.value = newFinance.amount_finance;
            type_finance.value = newFinance.type_finance;
            category_finance.value = newFinance.category_finance;
            date_finance.value = newFinance.date_finance.split('T')[0];
        }
    }, { immediate: true });


    // Function para actualizar la finanza
    
</script>

<template>
    <div class=" w-full h-full flex flex-col items-center gap-1.5">
        <h2 class="text-2xl font-semibold tracking-wide text-white border-b-2 border-green-600 w-4/5 text-center">Actualización de Finanzas</h2>
        <form class="flex flex-col w-full h-full items-center gap-2">
            <div class="flex w-full justify-center h-3/10 ">
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label class="text-lg font-semibold text-white">Descripción:</label>
                    <div class="text-md text-white border-b-2 border-r-2 border-gray-400 h-14 px-3 flex items-center">{{ finance.description_finance }}</div>
                </div>
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label class="text-lg font-semibold text-white">Monto en dolares:</label>
                    <div class="text-md text-white border-b-2 border-r-2 border-gray-400 h-14 px-3 flex items-center">{{ finance.amount_finance }}</div>
                </div>
            </div>
            <div class="flex w-full justify-center h-3/10 ">
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label class="text-lg font-semibold text-white">Tipo de finanza</label>
                    <div class="text-md text-white border-b-2 border-r-2 border-gray-400 h-14 px-3 flex items-center">{{ finance.type_finance }}</div>
                </div>
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label class="text-lg font-semibold text-white">Categoría</label>
                    <div class="text-md text-white border-b-2 border-r-2 border-gray-400 h-14 px-3 flex items-center">{{ finance.category_finance }}</div>
                </div>
            </div>
            <div class="flex w-full justify-center items-center h-1/5 gap-1.5">
                <label class="text-lg font-semibold text-white">Fecha:</label>
                <div class="text-md text-white border-b-2 border-r-2 border-gray-400 w-3/5 h-14 px-3 flex items-center">{{ finance.date_finance.split('T')[0] }}</div>
            </div>
            <button type="button" class="outline-none w-3/5 h-12 rounded-3xl text-lg tracking-wide bg-green-600 text-white font-semibold hover:bg-green-700 cursor-pointer hover:text-white transition-colors">
                Volver
            </button>
            </form>

    </div>
</template>