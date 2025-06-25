<script setup lang="ts">
    import LogoutIcon from '../Icons/LogoutIcon.vue';
</script>

<template>
    <nav class="border-2 border-black w-full h-15 flex items-center justify-between px-10 bg-gray-800 text-gray-100">
        <ul class="flex items-center gap-5 w-2/5 h-full justify-evenly">
            <li class="text-md font-semibold tracking-wider">
                <a href="/manual" class="hover:text-green-400 transition-colors">Manual</a>
            </li>
            <li class="text-md font-semibold tracking-wider">
                <a href="/reporte" class="hover:text-green-400 transition-colors">Reporte</a>
            </li>
            <li class="text-md font-semibold tracking-wider">
                <span id="Ventana_modal" class="cursor-pointer hover:text-green-400 transition-colors">Moneda</span>
            </li>
            <li class="text-md font-semibold tracking-wider">
                <span id="Historial_modal" class="cursor-pointer hover:text-green-400 transition-colors">Historial</span>
            </li>
        </ul>
        <LogoutIcon/>
    </nav>
</template>