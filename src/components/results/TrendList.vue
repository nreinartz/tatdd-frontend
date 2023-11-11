<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <i class="bi bi-graph-up me-2"></i> Trends
            </div>

            <template v-if="trends?.length === 0">
                <span class="text-muted">No global nor sub-trends detected</span>
            </template>
            <template v-else-if="(trends?.length || 0) > 0">
                <span class="text-muted">
                    {{ globalTrendDescription }}
                </span>
            </template>
        </div>

        <template v-if="!resultsStore.trendResultsAvailable">
            <ul class="list-group list-group-flush placeholder-glow">
                <li class="list-group-item">
                    <span class="placeholder col-8"></span>
                </li>
                <li class="list-group-item">
                    <span class="placeholder col-12"></span>
                </li>
                <li class="list-group-item">
                    <span class="placeholder col-4"></span>
                </li>
                <li class="list-group-item">
                    <span class="placeholder col-6"></span>
                </li>
            </ul>
        </template>
        <template v-else>
            <ul class="list-group list-group-flush border-top-0">
                <template v-if="trends!.length > 1">
                    <li class="list-group-item text-muted border-top text-center">Subtrends</li>

                    <template v-for="trend of trends">
                        <template v-if="trend.type === TrendType.Increasing">
                            <li class="list-group-item">
                                <div class="hstack gap-3">
                                    <div>
                                        <i class="bi bi-graph-up-arrow fs-5 text-success"></i>
                                        <span class="fw-light ms-3">Uptrend</span>
                                    </div>
                                    <span class="badge bg-success ms-auto">{{ trend.start }} - {{
                                        trend.end }}</span>
                                </div>
                            </li>
                        </template>
                        <template v-else-if="trend.type === TrendType.Decreasing">
                            <li class="list-group-item">
                                <div class="hstack gap-3">
                                    <div>
                                        <i class="bi bi-graph-down-arrow fs-5 text-danger"></i>
                                        <span class="fw-light ms-3">Downtrend</span>
                                    </div>
                                    <span class="badge bg-danger ms-auto">{{ trend.start }} - {{
                                        trend.end }}</span>
                                </div>
                            </li>
                        </template>
                    </template>
                </template>
                <template v-else>
                    <li class="list-group-item text-muted text-center">
                        No sub-trends detected
                    </li>
                </template>
            </ul>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';
import { TrendType } from '@/types/api-models';
import { computed } from 'vue';

const resultsStore = useResultsStore();
const trends = computed(() => resultsStore.trendResults?.sub_trends);

const globalTrendDescription = computed<string | null>(() => {
    if (!resultsStore.trendResultsAvailable) {
        return null;
    }

    const subTrends = resultsStore.trendResults!.sub_trends!;
    const globalTrend = resultsStore.trendResults!.global_trend!;

    if (globalTrend.type === TrendType.Increasing) {
        return `The global movement of the trend chart for this topic shows an increasing trend from ${globalTrend.start} to ${globalTrend.end}.`;
    } else if (globalTrend.type === TrendType.Decreasing) {
        return `The global movement of the trend chart for this topic shows a decreasing trend from ${globalTrend.start} to ${globalTrend.end}.`;
    } else {
        if (subTrends.length > 1) {
            return "While there are sub-trends, there appears to be no global trend.";
        }
    }

    return null;
});
</script>

<style scoped></style>