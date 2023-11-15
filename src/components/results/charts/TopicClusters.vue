<template>
    <div id="cluster-chart" class="h-100"></div>
</template>

<script setup lang="ts">
import echarts from "@/utils/echarts";
import { useResultsStore } from '@/stores/results';
import { onMounted, watch } from 'vue';

const resultsStore = useResultsStore();

onMounted(() => {
    if (resultsStore.topicDiscoveryResultsAvailable) {
        plotDiscoveredTopics();
    }
    else {
        watch(() => resultsStore.topicDiscoveryResultsAvailable, () => {
            plotDiscoveredTopics();
        });
    }
});

function plotDiscoveredTopics() {
    const clusters = resultsStore.topicDiscoveryResults?.clusters!;
    const miscIndexes = clusters.topic_labels.map((label, index) => label === -1 || index > 9 ? index : -1)
        .filter(index => index !== -1);

    const dataSeries = [{
        name: "Miscellaneous",
        type: 'scatterGL',
        emphasis: {
            focus: 'series'
        },
        data: miscIndexes.map(index => [clusters.points_x[index], clusters.points_y[index]])

    }]

    for (let i = 0; i < 10; i++) {
        const points = [];
        for (let j = 0; j < clusters.topic_labels.length; j++) {
            if (clusters.topic_labels[j] === i) {
                points.push([clusters.points_x[j], clusters.points_y[j]]);
            }
        }

        dataSeries.push({
            name: resultsStore.topicDiscoveryResults?.topics![i]!,
            type: 'scatterGL',
            emphasis: {
                focus: 'series'
            },
            data: points,
            // markArea: {
            //     silent: false,
            //     label: {
            //         position: "bottom"
            //     },
            //     z: 5,
            //     itemStyle: {
            //         color: 'transparent',
            //         borderWidth: 1,
            //         borderType: 'dashed'
            //     },
            //     data: [
            //         [
            //             {
            //                 name: resultsStore.topicDiscoveryResults?.topics![i],
            //                 xAxis: 'min',
            //                 yAxis: 'min'
            //             },
            //             {
            //                 xAxis: 'max',
            //                 yAxis: 'max'
            //             }
            //         ]
            //     ]
            // },
        })
    }

    const option = {
        title: {
            text: 'Topic clusters'
        },
        grid: {
            left: '3%',
            top: "150px",
            right: '7%',
            bottom: '7%',
            containLabel: true
        },
        tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            axisPointer: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        toolbox: {
            feature: {
                dataZoom: {},
                brush: {
                    type: ['rect', 'polygon', 'clear']
                }
            }
        },
        brush: {},
        legend: {
            left: 'center',
            orient: "horizontal",
            top: 50
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                splitLine: {
                    show: false
                }
            }
        ],
        series: dataSeries
    };

    const chartDom = document.getElementById('cluster-chart')!;
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
</script>