<script setup lang="ts">
    
import NavBar from '../components/NavBar.vue';
    import SectionFn from '../components/SectionFn.vue';
    import SectionGraphic from '../components/SectionGraphic.vue';
    import { ref } from 'vue';

    
 
    const showWelcome = ref(false);

const login = JSON.parse(localStorage.getItem('login') || 'false');
if (login === false) {
    showWelcome.value = true;
}

const closeWelcome = () => {
    showWelcome.value = false;
    localStorage.setItem('login', JSON.stringify(true));
};
;

</script>




<template>
    <main class="border-2 border-black w-full h-screen relative">
        <NavBar/>
        <SectionFn/>
        <div v-if="showWelcome" class="fixed inset-0 bg-black opacity-85 flex items-center justify-center z-50">
            <div class="bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center relative min-w-[320px]">
                <button @click="closeWelcome" class="absolute top-2 right-3 text-white text-xl font-bold hover:text-green-400 cursor-pointer">×</button>
                <h2 class="text-white text-2xl font-semibold mb-4">Te damos la bienvenida a</h2>
                <h1 class="text-green-500 text-4xl font-bold mb-2">GIGI</h1>
            </div>
        </div>
        <SectionGraphic/>
       
    </main>
</template>