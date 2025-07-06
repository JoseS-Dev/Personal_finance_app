<script setup lang="ts">
    import { ref, defineProps, watch} from 'vue';
    import {TYPES, CATEGORYS} from '../Utils'
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
    const updateFinance = async () => {
        const formData = {
            description_finance: description_finance.value,
            amount_finance: amount_finance.value,
            type_finance: type_finance.value,
            category_finance: category_finance.value,
            date_finance: date_finance.value
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Finances/update/${finance.id_finance}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                await response.json();
                alert('Finanza actualizada exitosamente');
            }
        }
        catch (error) {
            console.error('Error al actualizar la finanza:', error);
            alert('Error al actualizar la finanza. Por favor, inténtelo de nuevo.');
        }
        finally {
            // LImpiar los campos del formulario
            description_finance.value = '';
            amount_finance.value = 0;
            type_finance.value = 'Gastos';
            category_finance.value = 'Salidas';
            date_finance.value = new Date().toISOString().split('T')[0];
        }
    }
</script>

<template>
    <div class=" w-full h-full flex flex-col items-center gap-1.5">
        <h2 class="text-2xl font-semibold tracking-wide text-white border-b-2 border-green-500 w-4/5 text-center">Actualización de Finanzas</h2>
        <form @submit="updateFinance" class="flex flex-col w-full h-full items-center gap-2">
            <div class="flex w-full justify-center h-3/10 ">
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label for="description_finance" class="text-lg font-semibold text-white">Descripción:</label>
                    <input 
                        type="text" 
                        id="description_finance" 
                        class="placeholder:text-white border-b-2 border-r-2 border-gray-400 outline-none h-14 px-3 text-md text-white focus:border-green-600 focus:text-white hover:bg-gray-700 transition-colors" 
                        v-model="description_finance"
                        placeholder="Ingrese la descripción"
                        required 
                    />
                </div>
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label for="amount_finance" class="text-lg font-semibold text-white">Monto:</label>
                    <input 
                        type="number" 
                        id="amount_finance" 
                        class="placeholder:text-white border-b-2 border-r-2 text-white border-gray-400 outline-none h-14 px-3 text-md focus:border-green-600 hover:bg-gray-700 focus:text-white transition-colors" 
                        v-model="amount_finance"
                        placeholder="Ingrese el monto"
                        required 
                    />
                </div>
            </div>
            <div class="flex w-full justify-center h-3/10 ">
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label for="type_finance" class="text-lg font-semibold text-white">Tipo de finanza</label>
                    <select id="type_finance" class="placeholder:text-white border-b-2 border-r-2 border-gray-400 text-white outline-none h-14 px-3 text-md focus:border-green-600 hover:bg-gray-700 focus:text-white transition-colors" v-model="type_finance" required>
                        <option  v-for="type in TYPES" :key="type" :value="type">{{ type }}</option>
                    </select>
                </div>
                <div class="flex flex-col w-1/2 h-full px-3 justify-center">
                    <label for="category_finance" class="text-lg font-semibold text-white">Categoría</label>
                    <select id="category_finance" class="border-b-2 border-r-2 border-gray-400 outline-none h-14 text-white px-3 text-md focus:border-green-600 hover:bg-gray-700 focus:text-white transition-colors" v-model="category_finance" required>
                        <option v-for="category in CATEGORYS" :key="category" :value="category">{{ category }}</option>
                    </select>
                </div>
            </div>
            <div class="flex w-full justify-center items-center h-1/5 gap-1.5">
                <label for="date_finance" class="text-lg font-semibold text-white">Fecha:</label>
                <input 
                    type="date" 
                    id="date_finance"
                    class="border-b-2 border-r-2 border-gray-400 w-3/5 text-white outline-none h-14 px-3 text-md focus:border-green-600 hover:bg-gray-700 focus:text-white transition-colors" 
                    v-model="date_finance"
                    required 
                />
            </div>
            <button class="outline-none w-3/5 h-12 rounded-3xl text-lg tracking-wide bg-green-500 text-white font-semibold hover:bg-black cursor-pointer hover:text-white transition-colors">Actualizar Finanza</button>
        </form>
    </div>
</template>