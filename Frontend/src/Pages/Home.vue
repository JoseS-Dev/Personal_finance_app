<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const account_balance_user = ref('');
    const meta_user = ref('');
    const userID = JSON.parse(localStorage.getItem('user') || '{}').data.id_user;
    console.log(userID);

    // Function to handle the form submission
    const handleFormSubmit = async (event: Event) => {
        event.preventDefault();
        const formData = {
            account_balance_user: parseFloat(account_balance_user.value),
            meta_user: parseFloat(meta_user.value)
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Users/update/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(!response.ok) throw new Error('Error al actualizar los datos del usuario');
            const user = await response.json();
            alert(`Bienvenido a GIGI, ${user.data.name_user}!`);
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/admin');
        }
        catch(error){
            console.error('Error al entrar:', error);
            alert('Error al entrar. Por favor, inténtalo de nuevo.');
        } finally {
            // Clear the input fields
            account_balance_user.value = '';
            meta_user.value = '';
        }
    }

</script>

<template>
    <main class=" w-full h-screen flex items-center justify-center">
        <form @submit="handleFormSubmit" class="shadow-lg shadow-gray-500 border-2 border-black rounded-2xl w-1/3 h-2/3 flex flex-col items-center py-5 px-10 gap-2.5 bg-gray-700">
            <div class="border-b-2 border-gray-400 w-full h-20 flex flex-col justify-center items-center">
                <h1 class="text-3xl text-white tracking-wider">Bienvenido a <span class="text-green-400 font-semibold">GIGI</span></h1>
                <p class="text-lg text-gray-300">Tu sistema de gestión financiera</p>
            </div>
            <div class="w-full h-4/5 flex flex-col items-center gap-1.5">
                <p class="text-lg text-center text-gray-200">Antes de empezar necesitamos que ingrese los siguientes Datos:</p>
                <div class="border-b-2 border-gray-400 w-full h-3/10 flex flex-col justify-center px-5">
                    <label class="text-md text-white tracking-wider" for="account_balance_user">Saldo Actual:</label>
                    <input 
                        v-model="account_balance_user"
                        class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors"
                        type="text"
                        id="account_balance_user"
                        name="account_balance_user"
                        placeholder="Ingresa tu saldo actual"
                        required
                    />
                </div>
                <div class="border-b-2 border-gray-400 w-full h-3/10 flex flex-col justify-center px-5">
                    <label class="text-md text-white tracking-wider" for="meta_user">Meta:</label>
                    <input
                        v-model="meta_user"
                        class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors"
                        type="text"
                        id="meta_user"
                        name="meta_user"
                        placeholder="Ingresa tu meta a cumplir"
                        required
                    />
                </div>
                <button class="border-black border-2 w-4/5 mt-4 h-12 rounded-3xl text-lg tracking-wide bg-green-500 text-white font-semibold hover:bg-black cursor-pointer hover:text-white transition-colors" type="submit">Ingresar</button>
            </div>
        </form>
    </main>
</template>