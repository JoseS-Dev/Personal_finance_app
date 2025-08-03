<script setup lang="ts">
import LogoutIcon from '../assets/Icons/LogoutIcon.vue';
import { ref } from 'vue';
import { useInstructionStore } from '../ContextStore/Instruction';


const showManualTooltip = ref(false);
const instructionStore = useInstructionStore();
const newUser = ref(Number(JSON.parse(localStorage.getItem('user') || '{}').data?.is_new) || 0);
const showManualTooltip2 = ref(false);
const showManualTooltip3 = ref(false);
const showManualTooltip4 = ref(false);

const showManualTooltip5 = ref(false);

const showCurrencyDropdown = ref(false);
const selectedCurrency = ref('Moneda');
const bcvPrice = ref<number|null>(null);
const changeCurrency = ref(false);


const dollar = async () => {
    try {
        const response = await fetch('https://pydolarve.org/api/v2/dollar');
        const data = await response.json();
        if (data && data.monitors && data.monitors.bcv && typeof data.monitors.bcv.price === 'number') {
            return data.monitors.bcv.price;
        } else {
            console.error('Respuesta inesperada de la API:', data);
            return null;
        }
    } catch (e) {
        console.error('Error obteniendo el precio del dólar:', e);
        return null;
    }
};




dollar().then(valor => {
  bcvPrice.value = valor;
  localStorage.setItem('bcvPrice', JSON.stringify(valor));
  console.log('Valor del dólar BCV:', bcvPrice.value);
});


const currencies = [
    { name: 'Dólares', value: 'USD' },
    { name: 'Bolívares', value: 'VES' }
];

// Establecer moneda predeterminada si no hay ninguna seleccionada
if (!localStorage.getItem('selectedCurrency')) {
    localStorage.setItem('selectedCurrency', 'USD');
    
} else {
    // Sincronizar el valor mostrado con el localStorage
    const stored = localStorage.getItem('selectedCurrency');
    const found = currencies.find(c => c.value === stored || c.name === stored);
    
}
//localStorage.removeItem('show1');
//localStorage.removeItem('show2');
//localStorage.removeItem('show3');
//localStorage.removeItem('show4');
//localStorage.removeItem('show5');
function selectCurrency(currency: string) {
    // Buscar el valor correspondiente
    const selected = currencies.find(c => c.name === currency);
    if (selected) {
        localStorage.setItem('selectedCurrency', selected.value);
    }
    showCurrencyDropdown.value = false;
    changeCurrency.value = true;
    window.location.reload(); // Recarga la página para actualizar la moneda
}

const show1 = JSON.parse(localStorage.getItem('show1') || ' false');

if (newUser.value === 1 && show1 === false) {
    showManualTooltip.value = true;
}
if(newUser.value === 0){
    localStorage.setItem('show1', JSON.stringify(true));
}
 // Elimina el valor de 'show1' para que no se muestre el tooltip nuevamente

function closeManualTooltip5() {
    showManualTooltip5.value = false;
    localStorage.setItem('show1', JSON.stringify(true));
    instructionStore.closeTip1();
}
function closeManualTooltip() {
    showManualTooltip.value = false;
    showManualTooltip2.value = true;
}
function closeManualTooltip2() {
    showManualTooltip2.value = false;
    showManualTooltip3.value = true;
}
function closeManualTooltip3() {
    showManualTooltip3.value = false;
    showManualTooltip4.value = true;
}
function closeManualTooltip4() {
    showManualTooltip4.value = false;
    showManualTooltip5.value = true;
   
}
</script>

<template>
    <nav
        class=" w-full h-15 flex items-center justify-between px-10 bg-gray-800 text-gray-100 relative">
        <ul class="flex items-center gap-5 w-2/5 h-full justify-evenly">
            <li class="text-md font-semibold tracking-wider relative">
                <a href="/manual"
                    :class="[showManualTooltip && newUser ? 'border-5 border-green-600 rounded-lg' : '', 'hover:text-green-700 transition-colors outline-none']">Manual</a>
                <div v-if="showManualTooltip && newUser">
                    <!-- Overlay bloquea la página -->
                    <div class="fixed inset-0  bg-opacity-40 z-50"></div>
                    <div @click="closeManualTooltip"
                        class="absolute left-0 top-8 bg-green-600 text-white text-sm font-semibold rounded px-3 py-2 shadow-lg z-50 w-56 cursor-pointer">
                        Permite visualizar el manual de GIGI en el caso de que tengas dudas<br>
                        <span class="block text-right text-xs mt-1">(Haz clic para cerrar)</span>
                    </div>
                </div>
            </li>
            <li class="text-md font-semibold tracking-wider relative">
                <a href="/admin/reportes"
                    :class="[showManualTooltip2 && newUser ? 'border-5 border-green-600 rounded-lg' : '', 'hover:text-green-700 transition-colors outline-none']">Inicio</a>
                <div v-if="showManualTooltip2 && newUser">
                    <!-- Overlay bloquea la página -->
                    <div class="fixed inset-0  bg-opacity-40 z-50"></div>
                    <div @click="closeManualTooltip2"
                        class="absolute left-2/3 -translate-x-1/4 top-full mt-2 bg-green-600 text-white text-sm font-semibold rounded px-3 py-2 shadow-lg z-50 w-64 cursor-pointer">
                        Dashboard principal permite visualizar tu gestión financiera con gráficas<br>
                        <span class="block text-right text-xs mt-1">(Haz clic para cerrar)</span>
                    </div>
                </div>
            </li>
            <li class="text-md font-semibold tracking-wider relative">
                <span id="Ventana_modal"
                    :class="[showManualTooltip3 && newUser ? 'border-5 border-green-500 rounded-lg' : '', 'cursor-pointer hover:text-green-400 transition-colors outline-none']"
                    @click="showCurrencyDropdown = !showCurrencyDropdown">{{ selectedCurrency }}</span>
                <!-- Dropdown de monedas -->
                <div v-if="showCurrencyDropdown"
                    class="absolute left-1/2 -translate-x-1/4 top-full mt-2 bg-white text-gray-800 rounded shadow-lg z-50 w-40">
                    <ul>
                        <li v-for="currency in currencies" :key="currency.value" @click="selectCurrency(currency.name)"
                            class="px-4 py-2 hover:bg-green-100 cursor-pointer">
                            {{ currency.name }}
                        </li>
                    </ul>
                </div>
                <!-- Tooltip original -->
                <div v-if="showManualTooltip3 && newUser">
                    <!-- Overlay bloquea la página -->
                    <div class="fixed inset-0 bg-opacity-40 z-50"></div>
                    <div @click="closeManualTooltip3"
                        class="absolute left-1/2 -translate-x-1/4 top-full mt-2 bg-green-500 text-white text-sm font-semibold rounded px-3 py-2 shadow-lg z-50 w-64 cursor-pointer">
                        Aquí puedes cambiar la moneda para visualizar tus finanzas en diferentes divisas.<br>
                        <span class="block text-right text-xs mt-1">(Haz clic para cerrar)</span>
                    </div>
                </div>
            </li>
            <li class="text-md font-semibold tracking-wider relative">
                <a href="/admin/historial"
                    :class="[showManualTooltip4 && newUser ? 'border-5 border-green-500 rounded-lg' : '', 'hover:text-green-400 transition-colors outline-none']">Historial</a>
                <div v-if="showManualTooltip4 && newUser">
                    <!-- Overlay bloquea la página -->
                    <div class="fixed inset-0 bg-opacity-40 z-50"></div>
                    <div @click="closeManualTooltip4"
                        class="absolute left-1/2 -translate-x-1/4 top-full mt-2 bg-green-500 text-white text-sm font-semibold rounded px-3 py-2 shadow-lg z-50 w-64 cursor-pointer">
                        Aquí puedes consultar el historial de tus movimientos financieros.<br>
                        <span class="block text-right text-xs mt-1">(Haz clic para cerrar)</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="relative inline-block">
            <LogoutIcon :class="[showManualTooltip5 && newUser ? 'border-5 border-green-500 rounded-lg' : '']" />
            <div v-if="showManualTooltip5 && newUser">
                <!-- Overlay bloquea la página -->
                <div class="fixed inset-0 bg-opacity-40 z-50"></div>
                <div @click="closeManualTooltip5"
                    class="absolute left-1/2 -translate-x-4/4 top-full mt-2 bg-green-500 text-white text-sm font-semibold rounded px-3 py-2 shadow-lg z-50 w-64 cursor-pointer">
                    Haz clic aquí para cerrar sesión y salir de la aplicación.<br>
                    <span class="block text-right text-xs mt-1">(Haz clic para cerrar)</span>
                </div>
            </div>
        </div>
    </nav>
</template>