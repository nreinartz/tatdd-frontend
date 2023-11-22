<template>
    <div id="trend-chart" class="h-100"></div>
</template>

<script setup lang="ts">
import echarts from "@/utils/echarts";
import { useResultsStore } from '@/stores/results';
import { onMounted, watch } from 'vue';
import { TrendType } from '@/types/api-models';

const resultsStore = useResultsStore();

onMounted(() => {
    if (resultsStore.trendResultsAvailable) {
        plotTrends();
    }
    else {
        watch(() => resultsStore.trendResultsAvailable, () => {
            plotTrends();
        });
    }
});

function plotTrends() {
    const query = resultsStore.results!;
    const results = query.results!;
    const dataLength = query.end_year - query.start_year + 1;

    const trendFunc = (x: number) => (results.trend_results!.global_trend.line[0] * x + results.trend_results!.global_trend.line[1]);
    const trendFunctions = results.trend_results!.sub_trends.map(trend => (x: number) => (trend.line[0] * x + trend.line[1]));

    const option = {
        title: {
            text: 'Relative number of publications for selected topic'
        },
        legend: {
            bottom: 0,
            data: ['Topic popularity', 'Global trend line', {
                name: 'Subtrends',
                itemStyle: {
                    color: 'red'
                },
                lineStyle: {
                    color: 'green'
                }
            }],
            selected: {
                "Global trend line": false,
                'Subtrends': true
            }
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
            left: "0%",
            right: "1%",
            bottom: "15%",
            top: "20%"
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: query.end_year
            }
        ],
        xAxis: {
            type: 'category',
            show: true,
            data: [...Array(dataLength).keys()].map(i => query.start_year + i)
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: results.trend_results?.sub_trends.map(trend => ({
                gte: trend.start - query.start_year,
                lte: trend.end - query.start_year,
                color: trend.type === 0 ? 'gray' : trend.type === 1 ? 'green' : 'red'
            }))
        },
        series: [
            {
                name: 'Topic popularity',
                type: 'line',
                smooth: false,
                color: "gray",
                data: results.search_results?.adjusted,
                markLine: {
                    symbol: ['none', 'none'],
                    label: {
                        show: true,
                        formatter: (params: any) => params.value + query.start_year
                    },
                    data: results.trend_results?.breakpoints?.map((x: number) => ({ xAxis: x - query.start_year }))
                },
                lineStyle: {
                    width: 3
                },
                symbolSize: 0
            },
            {
                name: 'Global trend line',
                type: 'line',
                color: results.trend_results!.global_trend.line[0] > 0 ? "rgb(0,200,0, 0.3)" : "rgb(200,0,0, 0.3)",
                showSymbol: false,
                smooth: false,
                data: [...Array(dataLength).keys()].map(i => trendFunc(query.start_year + i))
            },
            ...trendFunctions.map((trendFunc, index) => ({
                name: 'Subtrends',
                type: 'line',
                color: results.trend_results!.sub_trends[index].line[0] > 0 ? "rgb(0,200,0, 0.3)" : "rgb(200,0,0, 0.3)",
                showSymbol: false,
                smooth: false,
                data: [...Array(dataLength).keys()]
                    .filter(i => results.trend_results!.sub_trends[index].type !== TrendType.None).map(
                        i => {
                            if (i < results.trend_results!.sub_trends[index].start - query.start_year) {
                                return null;
                            }
                            else if (i > results.trend_results!.sub_trends[index].end - query.start_year) {
                                return null;
                            }
                            else {
                                return trendFunc(query.start_year + i)
                            }
                        }
                    )
            }))
        ]
    };

    const chartDom = document.getElementById('trend-chart')!;
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
</script>