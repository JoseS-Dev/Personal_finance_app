<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { StoreFinance } from '../../ContextStore/financeStore';
    import sweetalert from 'sweetalert2';
    const userEmail = JSON.parse(localStorage.getItem('user') || '{}').data.email_user;
    console.log("Email del usuario:", userEmail);
    const financeData = StoreFinance();
    const { resetStore } = financeData;
    const router = useRouter();
    
    // Function to handle logout
    const handleLogout = async(event:Event) => {
        event.preventDefault();
        const formData = {
            email_user: userEmail
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error('Error al cerrar sesión');
            }
            await sweetalert.fire({
                title: 'Éxito',
                text: `Sesión cerrada exitosamente`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            resetStore();
            localStorage.removeItem('user');
            router.push('/');
        }
        catch(error){
            console.error('Error al cerrar sesión:', error);
            await sweetalert.fire({
                title: 'Error',
                text: 'Al cerrar la sesión',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }
</script>

<template>
    <svg @click="handleLogout" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="lucide lucide-log-out-icon lucide-log-out cursor-pointer hover:py-1 transition-all">
        <path d="m16 17 5-5-5-5"/>
        <path d="M21 12H9"/>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    </svg>
</template>