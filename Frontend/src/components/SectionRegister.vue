<script lang="ts" setup></script>

<template>
    <main class="border-2 border-black w-full h-screen flex flex-col items-center justify-center">
        <form class="rounded-2xl border-2 border-black w-1/4 h-4/5 flex flex-col items-center p-5 bg-gray-700">
            <div class="w-full flex h-10 items-center justify-center gap-5  text-2xl">
                <img src="/public/Logo.png" alt="Logo" class="w-10 h-10"/>
                <h2 class="font-bold text-white">Registro de Usuario</h2>
            </div>
            <div class="w-full h-1/5 border-b-2 border-gray-400 flex flex-col justify-center px-4 mb-2 gap-1.5">
                <label for="name_user" class="text-md text-white tracking-widest">Nombre:</label>
                <input 
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="text" 
                    id="name_user" 
                    name="name_user" 
                    required
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-gray-400 flex flex-col justify-center mb-2 px-4 gap-1.5">
                <label for="lastName_user" class="text-md text-white tracking-widest">Apellido:</label>
                <input
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="text" 
                    id="lastName_user" 
                    name="lastName_user" 
                    required
                />
            </div>
            <div class="w-full h-1/5 border-b-2 border-gray-400 flex flex-col justify-center mb-2 px-4 gap-1.5">
                <label for="email_user" class="text-md text-white tracking-widest">Correo:</label>
                <input
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="email" 
                    id="email_user" 
                    name="email_user" 
                    required
                />
            </div>
            <div class="w-full h-1/5 flex flex-col justify-center px-4 mb-2 gap-1.5">
                <label for="password_user" class="text-md text-white tracking-widest">Password:</label>
                <input
                    class="h-12 w-full px-3 outline-none border-b-2 border-r-2 border-green-500 text-white focus:bg-gray-300 focus:text-black transition-colors" 
                    type="password" 
                    id="password_user" 
                    name="password_user" 
                    required
                />
            </div>
            <a class="text-white text-md mt-2" href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
            <button 
                class="my-5 w-4/5 h-12 outline-none rounded-3xl text-lg tracking-wider bg-green-500 text-white font-semibold hover:bg-black cursor-pointer hover:text-white transition-colors" 
                type="submit">
                Registrarse
            </button>
        </form>
    </main>
</template>