<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import sweetalert from 'sweetalert2';
    
    const router = useRouter();
    const email_user = ref('');
    const password_user = ref('');
    

    // Function to handle the login form submission
    const handleLogin = async (event: Event) => {
        event.preventDefault();
        const formData = {
            email_user: email_user.value,
            password_user: password_user.value
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Users/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(!response.ok) throw new Error('Error al iniciar sesión');
            const user = await response.json();
            if(user.data.account_balance_user >= 0 && user.data.meta_user >= 0){
                localStorage.setItem('user', JSON.stringify(user));
                await sweetalert.fire({
                    title: 'Éxito',
                    text: `Bienvenido de vuelta ${user.data.name_user}`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                console.log('User data:', user);
                router.push('/admin/reportes');
            }
            else{
                localStorage.setItem('user', JSON.stringify(user));
                await sweetalert.fire({
                    title: 'Éxito',
                    text: `Inicio de sesión exitoso, pero no tienes saldo o meta configurada.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                router.push('/Home');
            }
        }
        catch(error){
            console.error('Error al iniciar sesión:', error);
            await sweetalert.fire({
                title: 'Error',
                text: 'Correo o contraseña incorrectos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            // Clear the input fields
            email_user.value = '';
            password_user.value = '';
        }
    }
</script>

<template>
    <main class="h-screen w-full flex items-center justify-center">
        <form @submit="handleLogin" class="shadow-lg shadow-gray-500 rounded-2xl border-2 border-black w-1/4 h-3/5 flex flex-col items-center p-5 bg-gray-700 gap-3">
            <div class="border-b-2 border-gray-400 w-full h-10 flex items-center justify-center gap-7 pb-3 text-2xl">
                <img src="../../public/Logo.png" alt="Logo" class="w-10 h-10"/>
                <h2 class="text-white font-bold">Iniciar Sesión</h2>
            </div>
            <div class="border-b-2 border-gray-400 w-full h-3/10 flex flex-col justify-center px-4 gap-1.5">
                <label class="text-md text-white tracking-widest" for="email_user">Correo:</label>
                <input
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors"
                    v-model="email_user"
                    type="email"
                    id="email_user"
                    name="email_user"
                    placeholder="Ingresa tu correo electrónico"
                    required
                />
            </div>
            <div class="border-b-2 border-gray-400 w-full h-3/10 flex flex-col justify-center px-4 gap-1.5">
                <label class="text-md text-white tracking-widest" for="password_user">Contraseña:</label>
                <input
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors"
                    v-model="password_user"
                    type="password"
                    id="password_user"
                    name="password_user"
                    placeholder="Ingresa tu contraseña"
                    required
                />
            </div>
            <div class="w-full h-2/5  flex flex-col items-center justify-center py-5 gap-1.5">
                <a href="/Register" class="text-white text-md mb-3">¿No tienes Cuenta? Registrate</a>
                <button class="outline-none w-4/5 h-12 rounded-3xl text-lg tracking-wide bg-green-500 text-white font-semibold hover:bg-black cursor-pointer hover:text-white transition-colors" type="submit">Iniciar Sesión</button>
            </div>
        </form>
    </main>
</template>