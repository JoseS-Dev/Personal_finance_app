<script setup lang="ts">
    import DeleteIcons from '../assets/Icons/DeleteIcons.vue';
    import ModifiedIcon from '../assets/Icons/ModifiedIcon.vue';
    import ViewFinanceIcon from '../assets/Icons/ViewFinanceIcon.vue';
    import { ref, onMounted } from 'vue';
    import { StoreFinance } from '../ContextStore/financeStore';
    import FormFr from './FormFr.vue';
    import sweetalert from 'sweetalert2';
    const userID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    const ListFinances = ref<any[]>([]);
    const financeStore = StoreFinance();
    const { deleteBalance } = financeStore;
    
    const fetchFinances = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/finances/user/${userID}`);
            if (response.ok) {
                const data = await response.json();
                ListFinances.value = data.data || [];
            } else {
                throw new Error(`Error fetching finances: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching finances:', error);
        }
    };
    
    const handleFinanceAdded = (finance: any) => {
        ListFinances.value.push(finance);
    };
    
    const handleFinanceDeleted = async (description: string, type_finance:string, amount_finance:number, financeID:number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Finances/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_finance: financeID,
                    description_finance: description,
                }),
            });
            if (response.ok) {
                await response.json();
                await sweetalert.fire({
                    title: '¿Seguro que desea eliminar esta finanza?',
                    text: `Descripción: ${description}, Tipo: ${type_finance}, Monto: ${amount_finance}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                }).then((response) => {
                    if(response.isConfirmed){
                        ListFinances.value = ListFinances.value.filter(finance =>
                            finance.id_finance !== financeID
                        )
                        deleteBalance();
                        sweetalert.fire({
                            title: 'Finanza eliminada',
                            text: `Descripción: ${description}, Tipo: ${type_finance}, Monto: ${amount_finance}`,
                            icon: 'success',
                        });
                    }
                    else {
                        sweetalert.fire({
                            title: 'Operación cancelada',
                            text: 'La finanza no fue eliminada',
                            icon: 'info',
                        });
                    }
                })
            
            } else {
                throw new Error(`Error deleting finance`);
            }
        } catch (error) {
            console.error('Error deleting finance:', error);
        }
    };
    onMounted(() => {
        fetchFinances();
    });

</script>

<template>
    <section class="w-full h-2/3 flex items-center justify-around">
        <article class="w-4/5 h-full p-3 flex flex-col gap-2.5">
            <div v-if="ListFinances.length === 0" class="flex items-center justify-center h-full">
                <h3 class="text-2xl font-semibold tracking-wide">No hay Finanzas registradas</h3>
            </div>
            <table v-if="ListFinances.length > 0" class="border-gray-600 border-1 w-full h-auto overflow-y-auto">
                <thead class="border-gray-600 border-1 w-full">
                    <tr class="w-full h-10 text-lg font-semibold">
                        <th class="border-r-2 border-gray-800">Descripción</th>
                        <th class="border-r-2 border-gray-800">Tipo</th>
                        <th class="border-r-2 border-gray-800">Categoria</th>
                        <th class="border-r-2 border-gray-800">Fecha</th>
                        <th class="border-r-2 border-gray-800">Monto</th>
                        <th class="border-r-2 border-gray-800">Acciones</th>
                    </tr>
                </thead>
                <tbody class="w-full">
                    <tr v-for="finance in ListFinances" :key="finance.id_finance" class="w-full h-10 text-md border-b-2 border-gray-500">
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.description_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.type_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.category_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.date_finance }}</td>
                        <td class="border-r-2 border-gray-800 text-center">{{ finance.amount_finance }}</td>
                        <td class="pt-2 flex items-center justify-evenly">
                            <DeleteIcons 
                                class="cursor-pointer hover:stroke-red-500 hover:p-0.5 transition-all"
                                @click="handleFinanceDeleted(finance.description_finance, finance.type_finance, finance.amount_finance, finance.id_finance)"
                            />
                            <ModifiedIcon class="cursor-pointer hover:stroke-blue-500 hover:p-0.5 transition-all"/>
                            <ViewFinanceIcon class="cursor-pointer hover:stroke-green-500 hover:p-0.5 transition-all"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>
        <article class="w-1/4 h-full p-3 flex flex-col items-center">
            <FormFr @financeAdded="handleFinanceAdded"/>
        </article>
    </section>
</template>
