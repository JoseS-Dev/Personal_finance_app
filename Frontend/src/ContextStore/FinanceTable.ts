import { defineStore } from "pinia";
import { ref } from "vue";

export const StoreTableFinance = defineStore('financeTable', () => {
    const ListFinances = ref<any[]>([]);

    // Function to fetch finances from the backend
    const fetchFinances = async (userID:number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Finances/user/${userID}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const finances = await response.json();
            console.log("Data fetched:", finances);
            ListFinances.value.push(...finances.data);
        } catch (error) {
            console.error("Error fetching finances:", error);
        }
    };
    // agregar la finanza al array
    const addFinance = (finance: any) => {
        ListFinances.value.push(finance);
    }
    // Function para eliminar una finanza
    

    return { ListFinances, fetchFinances, addFinance };
});