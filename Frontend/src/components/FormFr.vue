<script setup lang="ts">
    import {TYPES, CATEGORYS} from '../Utils'
    import { ref } from 'vue';
    import { StoreFinance } from '../ContextStore/financeStore';
    import { defineEmits } from 'vue';
    import sweetalert from 'sweetalert2';
    const userID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    const Type_finance = ref('Gasto');
    const description_finance = ref('');
    const amount_finance = ref(0);
    const category_finance = ref('Salidas');
    const date_finance = ref(new Date().toISOString().split('T')[0]);
    const financeStore = StoreFinance();
    const emits = defineEmits(['financeAdded']);
    const { addBalance, accountBalance } = financeStore

    // Funcion para mandar el formulario para registrar una finanza
    const submitFinance = async(event:Event) => {
        event.preventDefault();
        const financeData = {
            type_finance: Type_finance.value,
            description_finance: description_finance.value,
            amount_finance: amount_finance.value,
            category_finance: category_finance.value,
            date_finance: date_finance.value,
        }
        // Validar que el saldo sea suficiente para registrar un gasto
        if(accountBalance < 0 && Type_finance.value === 'Gasto'){
            await sweetalert.fire({
                title: 'Saldo insuficiente',
                text: 'No puedes registrar un gasto si tu saldo es cero o negativo.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/finances/create/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(financeData),
            })
            if(!response.ok){
                throw new Error('Error al registrar la finanza');
            }
            const data = await response.json();
            localStorage.setItem('finances', JSON.stringify(data));
            console.log(localStorage.getItem('finances'));
            financeStore.type_finance = data.data.type_finance;
            financeStore.amount_finance = data.data.amount_finance;
            addBalance();
            emits('financeAdded', data.data);
            await sweetalert.fire({
                title: 'Finanza registrada exitosamente',
                text: `Tipo: ${data.data.type_finance}, Monto: ${data.data.amount_finance}`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
             
        }
        catch(error){
            console.error('Error al registrar la finanza:', error);
            await sweetalert.fire({
                title: 'Error',
                text: 'No se pudo registrar la finanza. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            // Limpiar los campos del formulario
            Type_finance.value = 'Gasto';
            description_finance.value = '';
            amount_finance.value = 0;
            category_finance.value = 'Salidas';
            date_finance.value = new Date().toISOString().split('T')[0];
            window.location.reload();
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