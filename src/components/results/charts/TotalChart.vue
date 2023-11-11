<template>
    <div id="total-chart" class="h-100"></div>
</template>

<script setup lang="ts">
import echarts from "@/utils/echarts";
import { onMounted, watch } from 'vue';
import { useStatsStore } from '@/stores/stats';
import { useResultsStore } from '@/stores/results';

const statsStore = useStatsStore();
const resultsStore = useResultsStore();

onMounted(() => {
    if (resultsStore.searchResultsAvailable) {
        plotTotalPublications();
    }
    else {
        watch(() => resultsStore.searchResultsAvailable, () => {
            plotTotalPublications();
        })
    }
});

function plotTotalPublications() {
    const query = resultsStore.results!;
    const dataLength = query.end_year - query.start_year + 1;

    const categories = [...Array(dataLength).keys()].map(i => query.start_year + i);
    const totalValues = categories.map(year => statsStore.stats?.publications_per_year[year] ?? 0);

    const option = {
        legend: {
            data: ['Total publications', 'Topic publications'],
            selected: {
                'Total publications': false
            }
        },
        title: {
            //text: 'Total number of publications matching the criteria'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            containLabel: true,
            left: "1%",
            right: "1%",
            bottom: 0
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            show: true,
            data: [...Array(dataLength).keys()].map(i => query.start_year + i)
        },
        yAxis: [{
            type: 'value',
            name: 'Publication count',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
            },
            axisLabel: {
                formatter: '{value} pub.'
            },
            axisPointer: {
                snap: true
            }
        }],
        series: [
            {
                name: 'Topic publications',
                type: 'bar',
                color: "#5c689f",
                data: resultsStore.searchResults!.raw
            },
            {
                name: 'Total publications',
                type: 'bar',
                color: "#349f64",
                data: totalValues
            }
        ]
    };

    const chartDom = document.getElementById('total-chart')!;
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
</script>