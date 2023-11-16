<template>
    <div id="cluster-chart" class="h-100"></div>
</template>

<script setup lang="ts">
import echarts from "@/utils/echarts";
import { useResultsStore } from '@/stores/results';
import { onMounted, watch } from 'vue';

const resultsStore = useResultsStore();

onMounted(() => {
    if (resultsStore.clusteringResultsAvailable) {
        plotDiscoveredTopics();
    }
    else {
        watch(() => resultsStore.clusteringResultsAvailable, () => {
            plotDiscoveredTopics();
        });
    }
});

function plotDiscoveredTopics() {
    const clusters = resultsStore.clusteringResults!;
    const miscIndexes = clusters.topic_labels.map((label, index) => label === -1 || index > 9 ? index : -1)
        .filter(index => index !== -1);

    //const dataSeries = [];
    const dataSeries = []

    for (let i = 0; i < 10; i++) {
        const points = [];
        for (let j = 0; j < clusters.topic_labels.length; j++) {
            if (clusters.topic_labels[j] === i) {
                points.push([clusters.points_x[j], clusters.points_y[j], clusters.points_z[j]]);
            }
        }

        dataSeries.push({
            name: resultsStore.results?.results?.topic_discovery_results?.topics![i]!,
            type: 'scatter3D',
            data: points
        })
    }

    dataSeries.push({
        name: "Miscellaneous",
        type: 'scatter3D',
        data: miscIndexes.map(index => [clusters.points_x[index], clusters.points_y[index], clusters.points_z[index]]),
        itemStyle: {
            color: 'rgba(0, 0, 0, 0.1)'
        },
    })

    const option = {
        title: {
            text: 'Topic clusters'
        },
        grid3D: {
            top: 150
        },
        tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            axisPointer: {
                show: true
            }
        },
        legend: {
            selected: {
                "Miscellaneous": false
            },
            left: 'center',
            orient: "horizontal",
            top: 50
        },
        xAxis3D: { type: 'value' },
        yAxis3D: { type: 'value' },
        zAxis3D: { type: 'value' },
        series: dataSeries
    };

    const chartDom = document.getElementById('cluster-chart')!;
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
</script>