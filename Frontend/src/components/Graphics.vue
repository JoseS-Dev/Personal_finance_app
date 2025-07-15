<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import Chart from 'chart.js/auto';
    import { defineProps } from 'vue';
    import { StoreFinance } from '../ContextStore/financeStore';

    const props = defineProps<{
        incomes: number;
        expenses: number;
    }>()
    const {incomes, expenses} = props;
    const financesStore = StoreFinance();
    const {accountBalance, meta} = financesStore;


    const cicleChart = ref<HTMLCanvasElement | null>(null);
    const cicleChart2 = ref<HTMLCanvasElement | null>(null);
    const barChart = ref<HTMLCanvasElement | null>(null);

    let cicleChartInstance: Chart | null = null;
    let cicleChart2Instance: Chart | null = null;
    let barChartInstance: Chart | null = null;

    // Funcion que crea las graficas
    const createCharts = () => {
        if(cicleChart.value && cicleChart2.value && barChart.value){
            if(cicleChartInstance) return cicleChartInstance.destroy();
            if(cicleChart2Instance) return cicleChart2Instance.destroy();
            if(barChartInstance) return barChartInstance.destroy();

            cicleChartInstance = new Chart(cicleChart.value, {
                type: 'doughnut',
                data: {
                    labels: ['Ingresos', 'Saldo Actual'],
                    datasets: [{
                        label: 'Ingresos y Saldo Actual',
                        data: [incomes, accountBalance],
                        backgroundColor: ['#4CAF50', '#2196F3'],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    }
                }
            });
            cicleChart2Instance = new Chart(cicleChart2.value, {
                type: 'doughnut',
                data: {
                    labels: ['Gastos', 'Saldo Actual'],
                    datasets: [{
                        label: 'Gastos y Saldo Actual',
                        data: [expenses, accountBalance],
                        backgroundColor: ['#F44336', '#2196F3'],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    }
                }
            });
            barChartInstance = new Chart(barChart.value, {
                type: 'bar',
                data: {
                    labels: ['Ingresos', 'Gastos'],
                    datasets: [{
                        label: 'Ingresos y Gastos',
                        data: [incomes, expenses],
                        backgroundColor: [ '#F44336','#4CAF50'],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    }
                }
            });
        }
    }
    
    
    onMounted(() => {
        createCharts();
    });

    // Watch for changes in incomes and expenses to update the charts
    watch([() => incomes, () => expenses, () => accountBalance], () => {
        createCharts();
    });

    
</script>

<template>
    <div class="w-full h-11/12 flex flex-col gap-2">
        <div class="border-2 border-gray-500 rounded-2xl w-full h-2/5 flex items-center justify-around py-2">
            <div class="w-1/2 h-full border-r-2 border-gray-500 flex items-center justify-evenly px-5">
                <canvas ref="cicleChart"></canvas>
                <span> Grafico de Circulos (Ingreso - Saldo Actual)</span>
            </div>
            <div class="w-1/2 h-full flex items-center justify-evenly px-5">
                <canvas ref="cicleChart2"></canvas>
                <span> Grafico de Circulos (Gastos - Saldo Actual)</span>
            </div>
        </div>
        <div class="border-2 border-gray-500 rounded-2xl w-full h-3/5 flex items-center justify-evenly px-20">
            <canvas ref="barChart"></canvas>
            <p>Grafico de Barras (Ingresos - Gastos)</p>
        </div>
    </div>
</template>