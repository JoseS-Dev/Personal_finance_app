<script setup lang="ts">
    import { ref } from 'vue';
    const Type_finance = ref('Gasto');
    const description_finance = ref('');
    const amount_finance = ref('');
    const category_finance = ref('Salidas');
    const date_finance = ref(new Date().toISOString().split('T')[0]);
</script>
<template>
    <form>
        <h2>Registro de Gastos</h2>
        <form>
            <div>
                <label for="Type_finance">Tipo</label>
                <select
                    v-model="Type_finance"
                    id="Type_finance"
                    name="Type_finance"
                >
                    <option value="Gasto">Gasto</option>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Meta">Meta</option>
                </select>
            </div>
            <div>
                <label for="description_finance">Descripción</label>
                <input
                    v-model="description_finance"
                    type="text"
                    id="description_finance"
                    name="description_finance"
                    placeholder="Descripción del gasto"
                />
            </div>
            <div>
                <label for="amount_finance">Monto</label>
                <input
                    v-model="amount_finance"
                    type="number"
                    id="amount_finance"
                    name="amount_finance"
                    placeholder="Monto del gasto"
                />
            </div>
            <div>
                <label for="category_finance">Categoría</label>
                <select
                    v-model="category_finance"
                    id="category_finance"
                    name="category_finance"
                >
                    <option value="Salidas">Salidas</option>
                    <option value="Educación">Educación</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Otros">Otros...</option>
                </select>
            </div>
            <div>
                <label for="date_finance">Fecha</label>
                <input
                    v-model="date_finance"
                    type="date"
                    id="date_finance"
                    name="date_finance"
                />
            </div>
            <button>Guardar</button>
        </form>
    </form>
</template>