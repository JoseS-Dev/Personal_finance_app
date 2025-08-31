<script setup lang="ts">
    import DeleteIcons from '../assets/Icons/DeleteIcons.vue';
    import ModifiedIcon from '../assets/Icons/ModifiedIcon.vue';
    import ViewFinanceIcon from '../assets/Icons/ViewFinanceIcon.vue';
    import UpdateModal from './UpdateModal.vue';
    import ViewModal from './ViewModal.vue';
    import { ref, onMounted, watch, computed } from 'vue';
    import { StoreFinance } from '../ContextStore/financeStore';
    import FormFr from './FormFr.vue';
    import sweetalert from 'sweetalert2';
    const userID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    const isNewUser = Number(JSON.parse(localStorage.getItem('user') || '{}').data?.is_new) || 0;
    const ListFinances = ref<any[]>([]);
    const currency = ref(localStorage.getItem('selectedCurrency') || 'USD');
    const bcvPrice = ref(Number(localStorage.getItem('bcvPrice')) || 1);
    const currencySymbol = computed(() => currency.value === 'VES' ? 'Bs.' : '$');

    // Computed para mostrar el monto convertido por cada finance
    const displayFinanceAmount = (amount: number) => {
        return currency.value === 'VES' ? Number(amount) * bcvPrice.value : Number(amount);
    };
    const selectedFinance = ref<any>(null);
    const financeStore = StoreFinance();
    const { deleteBalance } = financeStore;

    const show4 = ref(JSON.parse(localStorage.getItem('show4') || 'false'));
    const show5 = ref(JSON.parse(localStorage.getItem('show5') || 'false'));
    
    watch(show5, (val) => {
        localStorage.setItem('show5', JSON.stringify(val));
    });
    
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Finances/delete/${financeID}`, {
                method: 'DELETE',
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
    // Funcion para abir la ventana modal
    const openModal = (finance: any) => {
        selectedFinance.value = finance;
        console.log('Selected finance:', selectedFinance.value);
        const modal = document.getElementById('modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        } else {
            console.error('Modal element not found');
        }

    };
    const openModal2 = (finance: any) => {
        selectedFinance.value = finance;
        console.log('Selected finance:', selectedFinance.value);
        const modal = document.getElementById('modal2') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        } else {
            console.error('Modal element not found');
        }
    };

    // Funcion para cerrar la ventana modal
    const handleBackdropClick = (event: MouseEvent) => {
        const modal = document.getElementById('modal') as HTMLDialogElement;
        if (event.target === modal) {
            selectedFinance.value = null;
            modal.close();
        }
    };
    

    // Cierra la modal de vista y limpia la selección
    const closeViewModal = () => {
        const modal = document.getElementById('modal2') as HTMLDialogElement;
        selectedFinance.value = null;
        if (modal) {
            modal.close();
        }
    };
    onMounted(() => {
        fetchFinances();
    });

</script>

<template>
    <div v-if="show4 && !show5 && isNewUser === 1" class="fixed inset-0 z-40  pointer-events-auto"></div>
    <section class="w-full h-2/3 flex items-center justify-around" :class="{ 'pointer-events-none': show4 && !show5 && isNewUser === 1 }">
        <article class="w-4/5 h-full p-3 flex flex-col gap-2.5">
            <div v-if="ListFinances.length === 0" class="flex items-center justify-center h-full" :class="{ 'border-2 border-green-600': show4 && !show5 && isNewUser === 1 }">
                <h3 class="text-2xl font-semibold tracking-wide">No hay Finanzas registradas</h3>
            </div>
            <table v-if="ListFinances.length > 0" :class="['border-gray-600 border-1 w-full h-auto overflow-y-auto', show4 && !show5 && isNewUser === 1? 'border-green-600 border-5 border-radius-10 ' : '']">
                <thead class="border-gray-600 border-1 w-full">
                    <tr class="w-full h-10 text-lg font-semibold">
                        <th class="border-r-2 border-gray-600">Descripción</th>
                        <th class="border-r-2 border-gray-600">Tipo</th>
                        <th class="border-r-2 border-gray-600">Categoria</th>
                        <th class="border-r-2 border-gray-600">Fecha</th>
                        <th class="border-r-2 border-gray-600">Monto</th>
                        <th class="border-r-2 border-gray-600">Acciones</th>
                    </tr>
                </thead>
                <tbody class="w-full">
                    <tr v-for="finance in ListFinances" :key="finance.id_finance" class="w-full h-10 text-md border-b-2 border-gray-500">
                        <td class="border-r-2 border-gray-600 text-center">{{ finance.description_finance }}</td>
                        <td class="border-r-2 border-gray-600 text-center">{{ finance.type_finance }}</td>
                        <td class="border-r-2 border-gray-600 text-center">{{ finance.category_finance }}</td>
                        <td class="border-r-2 border-gray-600 text-center">{{ finance.date_finance }}</td>
                        <td class="border-r-2 border-gray-600 text-center">{{ displayFinanceAmount(finance.amount_finance) }} {{ currencySymbol }}</td>
                        <td class="pt-2 flex items-center justify-evenly">
                            <DeleteIcons 
                                class="cursor-pointer hover:stroke-red-500 hover:p-0.5 transition-all"
                                @click="handleFinanceDeleted(finance.description_finance, finance.type_finance, finance.amount_finance, finance.id_finance)"
                            />
                            <ModifiedIcon @click="openModal(finance)" class="cursor-pointer hover:stroke-blue-500 hover:p-0.5 transition-all"/>
                            <ViewFinanceIcon @click="openModal2(finance)" class="cursor-pointer hover:stroke-green-700 hover:p-0.5 transition-all"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>
        <div v-if="show4 && !show5 && isNewUser === 1" class="absolute top-45 left-110 z-50 pointer-events-auto">
            <div class="bg-green-600 text-white px-1 py-2 rounded shadow-lg text-sm flex flex-col items-start gap-1 pointer-events-auto" style="min-width:220px;">
                <span>Aqui se mostrara el historial de ingresos financieros</span>
                <span @click="show5 = true" class="text-xs ml-2 cursor-pointer pointer-events-auto">(Haz clic para cerrar)</span>
            </div>
        </div>
        <article class="w-1/4 h-full p-3 flex flex-col items-center">
            <FormFr @financeAdded="handleFinanceAdded"/>
        </article>
    </section>
    <dialog id="modal" @click="handleBackdropClick" class="w-2/5 h-3/5 absolute left-3/10 top-1/5 p-4 bg-gray-600 rounded-2xl">
        <UpdateModal v-if="selectedFinance" :finance="selectedFinance"/>
    </dialog>
    <dialog id="modal2" @click="closeViewModal" class="w-2/5 h-3/5 absolute left-3/10 top-1/5 p-4 bg-gray-600 rounded-2xl">
        <ViewModal v-if="selectedFinance" :finance="selectedFinance" />
    </dialog>
</template>

<style scoped>
    dialog[open]{
    animation: openModal 0.5s forwards;
    animation: openModal2 0.5s forwards; 
    }
    /* Animación para abrir el modal */
    @keyframes openModal {
        0% {
        transform: scale(0.9);
        opacity: 0;
        }
        100% {
        transform: scale(1);
        opacity: 1;
        }
    }
    @keyframes openModal2 {
        0% {
        transform: scale(0.9);
        opacity: 0;
        }
        100% {
        transform: scale(1);
        opacity: 1;
        }
    }
</style>
