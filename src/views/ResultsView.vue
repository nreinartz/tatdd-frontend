<template>
    <div class="d-flex flex-column h-100 gap-3">
        <QuerySummary />
        <template v-if="resultsStore.results?.progress !== QueryProgress.Failed">
            <div class="container vstack gap-3 flex-grow-1 px-2 py-2" v-if="!initialLoading">
                <template v-if="containsTrendAnalysis">
                    <Statistics />
                    <Trends />
                    <Topics />
                </template>

                <CitationRecommendations v-if="containsCitRec" />
            </div>
            <Loader v-else message="Loading data" />
        </template>
        <div class="container py-2" v-else>
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading"><i class="bi bi-exclamation-circle me-2"></i>Query failed</h4>
                <p>There was an error while processing your analysis request. This might be due to a too large search
                    window, try again with a smaller cutoff.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import QuerySummary from '@/components/results/QuerySummary.vue';
import CitationRecommendations from '@/components/results/citations/CitationRecommendations.vue';
import { QueryType, QueryProgress } from '@/types/api-models';

import { useStatsStore } from '@/stores/stats';

import Statistics from '@/components/results/Statistics.vue';
import Trends from '@/components/results/Trends.vue';
import { useResultsStore } from '@/stores/results';
import { computed, ref } from 'vue';
import Topics from '@/components/results/Topics.vue';
import Loader from '@/components/common/Loader.vue';

const router = useRouter();
const statsStore = useStatsStore();
const resultsStore = useResultsStore();

const containsTrendAnalysis = computed(() => ((resultsStore.results?.type ?? 0) & QueryType.TREND_ANALYSIS) == QueryType.TREND_ANALYSIS);
const containsCitRec = computed(() => ((resultsStore.results?.type ?? 0) & QueryType.CITATION_RECOMMENDATION) == QueryType.CITATION_RECOMMENDATION);

const initialLoading = ref(true);

let timeout: number = -1;
async function fetchData() {
    try {
        await resultsStore.getSession(router.currentRoute.value.params.id as string);
        initialLoading.value = false;

        if (!resultsStore.queryFinished) {
            timeout = setTimeout(fetchData, 1000);
        }
    }
    catch (error) {
        router.push("/")
    }
}

resultsStore.reset();

fetchData();
statsStore.getStatistics();

onBeforeRouteLeave(() => {
    if (timeout !== -1) {
        clearTimeout(timeout);
    }
});
</script>