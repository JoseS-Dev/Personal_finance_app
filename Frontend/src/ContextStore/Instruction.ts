import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInstructionStore = defineStore('instruction', () => {
  // Estado global para el tip1 (show1)
  const tip1 = ref(false); // Por defecto es false
  const tip2 = ref(false); // Por defecto es false

  // Función para cerrar el tip1 (se pone en true)
  function closeTip1() {
    tip1.value = true;
  }

  // Función para cerrar el tip2 (se pone en true)
  function closeTip2() {
    tip2.value = true;
  }

  return { tip1, tip2, closeTip1, closeTip2 };
});
