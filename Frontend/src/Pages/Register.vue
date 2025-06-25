<script lang="ts" setup>
    import {ref} from 'vue';
    import {useRouter} from 'vue-router';
    
    const router = useRouter();
    const name_user = ref('');
    const lastName_user = ref('');
    const email_user = ref('');
    const password_user = ref('');
    console.log(name_user, lastName_user, email_user, password_user);

    // Funcion para manejar el envio del formulario para registrar un usuario
    const handleRegister = async (event: Event) => {
        event.preventDefault();
        const formData = {
            name_user: name_user.value,
            lastName_user: lastName_user.value,
            email_user: email_user.value,
            password_user: password_user.value
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(!response.ok) throw new Error('Error al registrar el usuario');
            const data = await response.json();
            console.log('Usuario registrado:', data);
            alert('Usuario registrado exitosamente. Por favor, inicia sesión.');
            router.push('/');
            
        }
        catch(error){
            console.error('Error al registrar el usuario:', error);
            alert('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
        } finally {
            // Limpiar los campos del formulario
            name_user.value = '';
            lastName_user.value = '';
            email_user.value = '';
            password_user.value = '';
        }
    }

</script>

<template>
    <main class="w-full h-screen flex flex-col items-center justify-center">
        <form @submit="handleRegister" class="shadow-lg shadow-gray-500 rounded-2xl border-2 border-black w-1/4 h-4/5 flex flex-col items-center p-5 bg-gray-700">
            <div class="w-full flex h-10 items-center justify-center gap-5  text-2xl">
                <img src="/public/Logo.png" alt="Logo" class="w-10 h-10"/>
                <h2 class="font-bold text-white">Registro de Usuario</h2>
            </div>
            <div class="w-full h-1/5 border-b-2 border-gray-400 flex flex-col justify-center px-4 mb-2 gap-1.5">
                <label for="name_user" class="text-md text-white tracking-widest">Nombre:</label>
                <input
                    v-model="name_user" 
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="text" 
                    id="name_user" 
                    name="name_user"
                    placeholder="Ingresa tu nombre" 
                    required
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-gray-400 flex flex-col justify-center mb-2 px-4 gap-1.5">
                <label for="lastName_user" class="text-md text-white tracking-widest">Apellido:</label>
                <input
                    v-model="lastName_user"
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="text" 
                    id="lastName_user" 
                    name="lastName_user"
                    placeholder="Ingresa tu apellido" 
                    required
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-gray-400 flex flex-col justify-center mb-2 px-4 gap-1.5">
                <label for="email_user" class="text-md text-white tracking-widest">Correo:</label>
                <input
                    v-model="email_user"
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="email" 
                    id="email_user" 
                    name="email_user"
                    placeholder="Ingresa tu correo electrónico"
                    required
                />
            </div>
            <div class="w-full h-1/5 flex flex-col justify-center px-4 mb-2 gap-1.5">
                <label for="password_user" class="text-md text-white tracking-widest">Password:</label>
                <input
                    v-model="password_user"
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="password" 
                    id="password_user" 
                    name="password_user"
                    placeholder="Ingresa tu contraseña"
                    required
                />
            </div>
            <a class="text-white text-md mt-2" href="/">¿Ya tienes una cuenta? Inicia sesión</a>
            <button 
                class="my-5 w-4/5 h-12 outline-none rounded-3xl text-lg tracking-wider bg-green-500 text-white font-semibold hover:bg-black cursor-pointer hover:text-white transition-colors" 
                type="submit">
                Registrarse
            </button>
        </form>
    </main>
</template>