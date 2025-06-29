<script setup lang="ts">
    import DeleteIcons from '../assets/Icons/DeleteIcons.vue';
    import ModifiedIcon from '../assets/Icons/ModifiedIcon.vue';
    import ViewFinanceIcon from '../assets/Icons/ViewFinanceIcon.vue';
    import { ref, onMounted } from 'vue';
    import { StoreTableFinance } from '../ContextStore/FinanceTable';
    import FormFr from './FormFr.vue';
    const userID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    const dataLoaded = ref(false);
    console.log("User ID:", userID);
    const userFinances = StoreTableFinance();
    const { ListFinances, fetchFinances, addFinance } = userFinances;

    onMounted(() => {
        if(!dataLoaded.value){
            fetchFinances(userID)
            dataLoaded.value = true;
        }
    });
    // Function to handle finance addition
    const handleFinanceAdded = (finance:any) => {
        addFinance(finance);
    };
    

</script>

<template>
    <section class="w-full h-2/3 flex items-center justify-around">
        <article class="w-4/5 h-full p-3 flex flex-col gap-2.5">
            <div v-if="ListFinances.length === 0" class="flex items-center justify-center h-full">
                <h3 class="text-2xl font-semibold tracking-wide">No hay Finanzas registradas</h3>
            </div>
            <table v-else class="border-gray-600 border-1 w-full h-full overflow-y-auto">
                <thead class="border-gray-600 border-1 w-full">
                    <tr class="w-full h-10 text-lg font-semibold">
                        <th class="border-r-2 border-gray-800">ID</th>
                        <th class="border-r-2 border-gray-800">Descripción</th>
                        <th class="border-r-2 border-gray-800">Tipo</th>
                        <th class="border-r-2 border-gray-800">Categoria</th>
                        <th class="border-r-2 border-gray-800">Fecha</th>
                        <th class="border-r-2 border-gray-800">Monto</th>
                        <th class="border-r-2 border-gray-800">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="finance in ListFinances" :key="finance.id_finance" class="w-full h-5 text-md border-b-2 border-gray-500">
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.id_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.description_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.type_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.category_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.date_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.amount_finance }}</td>
                        <td class=" pt-2 flex items-center justify-evenly">
                            <DeleteIcons class="cursor-pointer hover:stroke-red-500 hover:p-0.5 transition-all"/>
                            <ModifiedIcon class="cursor-pointer hover:stroke-blue-500 hover:p-0.5 transition-all"/>
                            <ViewFinanceIcon class="cursor-pointer hover:stroke-green-500 hover:p-0.5 transition-all"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>
        <article class="w-1/4 h-full p-3 flex flex-col items-center">
            <FormFr @finance-added="handleFinanceAdded"/>
        </article>
    </section>
</template>
