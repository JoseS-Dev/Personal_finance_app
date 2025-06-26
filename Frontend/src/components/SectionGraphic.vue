<script setup lang="ts">
    import FormFr from './FormFr.vue';
    import Graphics from './Graphics.vue';
    import { MONTHS, YEARS } from '../Utils';
    import { ref } from 'vue';
    const month_select = ref('Enero');
    const year_select = ref('2025');
</script>

<template>
    <section class="w-full h-2/3 flex items-center justify-around">
        <article class="w-4/5 h-full p-3 flex flex-col gap-2.5">
            <div class="flex items-center justify-between px-3">
                <h3 class="text-2xl tracking-wide font-semibold">Estadisticas del {{ month_select }} del {{ year_select }}</h3>
                <div class=" w-1/4 h-10 flex items-center justify-between gap-1.5">
                    <select
                        class="w-1/2 border-black border-2 rounded-3xl text-lg h-10 px-0.5 font-semibold hover:cursor-pointer"
                        id="month_select"
                        v-model="month_select"
                    >
                        <option v-for="month in MONTHS" :key="month" :value="month">{{ month }}</option>
                    </select>
                    <select
                        class="w-1/2 border-black border-2 rounded-3xl text-lg h-10 px-0.5 font-semibold hover:cursor-pointer"
                        id="year_select"
                        v-model="year_select">
                        <option v-for="year in YEARS" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
            <Graphics/>
        </article>
        <article class="w-1/4 h-full p-3 flex flex-col items-center">
            <FormFr/>
        </article>
    </section>
</template>
