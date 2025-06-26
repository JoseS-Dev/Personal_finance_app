<script setup lang="ts">
    import {TYPES, CATEGORYS} from '../Utils'
    import { ref } from 'vue';
    import { useFinanceStore } from '../ContextStore/financeStore';
    const userID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    const Type_finance = ref('Gasto');
    const description_finance = ref('');
    const amount_finance = ref('');
    const category_finance = ref('Salidas');
    const date_finance = ref(new Date().toISOString().split('T')[0]);

    // Funcion para mandar el formulario para registrar una finanza
    const submitFinance = async(event:Event) => {
        event.preventDefault();
        const financeData = {
            type_finance: Type_finance.value,
            description_finance: description_finance.value,
            amount_finance: parseFloat(amount_finance.value),
            category_finance: category_finance.value,
            date_finance: date_finance.value,
        }
        try{
            await useFinanceStore().fetchFinances(userID, financeData);
            alert('Finanza registrada exitosamente');   
        }
        catch(error){
            console.error('Error al registrar la finanza:', error);
            alert('Error al registrar la finanza. Por favor, inténtalo de nuevo.');
        } finally {
            // Limpiar los campos del formulario
            Type_finance.value = 'Gasto';
            description_finance.value = '';
            amount_finance.value = '';
            category_finance.value = 'Salidas';
            date_finance.value = new Date().toISOString().split('T')[0];
        }
    }
</script>
<template>
    <form @submit="submitFinance" class="flex flex-col items-center h-full w-full px-2 gap-1 border-gray-600 border-1 rounded-2xl">
        <h2 class="font-semibold text-lg mt-2">Registrar Finanzas</h2>
        <div class=" flex flex-col w-full h-18 px-1 gap-0.5">
            <label class="text-md tracking-wide" for="Type_finance">Tipo</label>
            <select
                class="border-2 border-black h-10 w-full rounded-lg px-2 focus:border-gray-700 focus:outline-none transition-colors"
                v-model="Type_finance"
                id="Type_finance"
                name="Type_finance"
            >
                <option v-for="type in TYPES" :key="type" :value="type">{{ type }}</option>
            </select>
        </div>
        <div class=" flex flex-col w-full h-18 px-1 gap-0.5">
            <label class="text-md tracking-wide" for="description_finance">Descripción</label>
            <input
                class="placeholder:text-black border-2 border-black h-10 w-full rounded-lg px-2 focus:border-gray-700 focus:outline-none transition-colors"
                v-model="description_finance"
                type="text"
                id="description_finance"
                name="description_finance"
                placeholder="Descripción del gasto"
            />
        </div>
        <div class=" flex flex-col w-full h-18 px-1 gap-0.5">
            <label class="text-md tracking-wide" for="amount_finance">Monto</label>
            <input
                class="placeholder:text-black border-2 border-black h-10 w-full rounded-lg px-2 focus:border-gray-700 focus:outline-none transition-colors"
                v-model="amount_finance"
                type="number"
                id="amount_finance"
                name="amount_finance"
                placeholder="Monto del gasto"
            />
        </div>
        <div class=" flex flex-col w-full h-18 px-1 gap-0.5">
            <label class="text-md tracking-wide" for="category_finance">Categoría</label>
            <select
                class="border-2 border-black h-10 w-full rounded-lg px-2 focus:border-gray-700 focus:outline-none transition-colors"
                v-model="category_finance"
                id="category_finance"
                name="category_finance"
            >
                <option v-for="category in CATEGORYS" :key="category" :value="category">{{ category }}</option>
            </select>
        </div>
        <div class=" flex flex-col w-full h-18 px-1 gap-0.5">
            <label class="text-md tracking-wide" for="date_finance">Fecha</label>
            <input
                class="border-2 border-black h-10 w-full rounded-lg px-2 focus:border-gray-700 focus:outline-none transition-colors"
                v-model="date_finance"
                type="date"
                id="date_finance"
                name="date_finance"
            />
        </div>
        <button class="mb-2 mt-1 cursor-pointer w-4/5 border-2 border-black h-10 rounded-3xl text-lg tracking-widest font-bold bg-purple-700 text-white hover:bg-gray-800 transition-colors">Guardar</button>
    </form>
</template>