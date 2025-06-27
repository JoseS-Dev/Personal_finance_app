<template>
    <div class="w-full h-11/12 flex flex-col gap-2">
        <div class="border-2 border-gray-500 rounded-2xl w-full h-2/5 flex items-center justify-around">
            <div class="w-1/2 h-full border-r-2 border-gray-500 flex items-center justify-center">
                <canvas id="cicleChart"></canvas>
                <p>Grafica de Circulo</p>
            </div>
            <div class="w-1/2 h-full flex items-center justify-center">
                <canvas id="cicleChart2"></canvas>
                <p>Grafico de Circulo</p>
            </div>
        </div>
        <div class="border-2 border-gray-500 rounded-2xl w-full h-3/5 flex items-center justify-end px-20">
            <canvas id="barChart"></canvas>
            <p>Grafica de Barras</p>
        </div>
    </div>
</template>