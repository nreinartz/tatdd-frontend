<template>
    <div id="pub-chart" class="h-100"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useResultsStore } from '@/stores/results';
import echarts from "@/utils/echarts";

const resultsStore = useResultsStore();

onMounted(() => {
    if (resultsStore.searchResultsAvailable) {
        plotPublicationTypes();
    } else {
        watch(() => resultsStore.searchResultsAvailable, () => {
            plotPublicationTypes();
        })
    }
});

function plotPublicationTypes() {
    const option = {
        title: {
            text: 'Publication types',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            top: 'bottom'
        },
        series: [
            {
                name: 'Publication type',
                type: 'pie',
                radius: '60%',
                data: Object.entries(resultsStore.searchResults!.pub_types).map(([key, value]: [string, number]) => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    value: value
                })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const chartDom = document.getElementById('pub-chart')!;
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
</script>