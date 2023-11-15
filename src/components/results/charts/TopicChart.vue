<template>
    <div id="topic-chart" class="h-100"></div>
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
    const query = resultsStore.results!;
    const discoveredTopics = resultsStore.topicDiscoveryResults?.topics_over_time!;

    // Prepare series data for ECharts
    const seriesData = discoveredTopics.map(topic => {
        return {
            name: resultsStore.topicDiscoveryResults?.topics[topic.id],
            type: 'line',
            connectNulls: true,
            data: [...Array(query.end_year - query.start_year).keys()].map(
                i => {
                    const year = query.start_year + i;

                    if (!topic.timestamps.includes(year)) {
                        return {
                            value: null,
                            name: "-"
                        }
                    } else {
                        const index = topic.timestamps.indexOf(year);
                        return {
                            value: topic.frequencies[index],
                            words: topic.words[index].join(", ")
                        }
                    }
                }
            )
        };
    });

    // Configure the ECharts options
    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                // params is an array of the data points for all series for that particular axis value
                let result = "<strong>Year:</strong> " + params[0].name + '<br />'; // timestamp
                params.forEach((item: any) => {
                    // Including series marker for color indication and series name for label
                    result += item.marker + `<strong>${(item.data.words ?? "-")}</strong>` + '<br/>';
                });
                return result;
            }
        },
        legend: {
            data: discoveredTopics.map(topic => resultsStore.topicDiscoveryResults?.topics[topic.id]),
            left: "center",
            top: 20,
            orient: "horizontal",
            align: "left"
        },
        grid: {
            left: '0%',
            right: "1%",
            bottom: '0%',
            top: "120",
            containLabel: true
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
            boundaryGap: false,
            data: [...Array(query.end_year - query.start_year).keys()].map(i => query.start_year + i)
        },
        yAxis: {
            type: 'value',
            name: 'Frequency',
        },
        series: seriesData
    };

    const chartDom = document.getElementById('topic-chart')!;
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
</script>