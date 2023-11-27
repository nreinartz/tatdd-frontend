<template>
    <div class="bg-white shadow-sm">
        <div class="container-lg vstack gap-3 align-items-between">
            <h1 class="display-6 text-muted text-center py-2">
                <span v-if="resultsStore.results?.type == QueryType.CITATION_RECOMMENDATION">
                    Citation Recommendation
                </span>
                <span v-else-if="resultsStore.results?.type == QueryType.TREND_ANALYSIS">
                    Trend Analysis
                </span>
                <span v-else>
                    Full Analysis
                </span>
            </h1>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 col-xl-6 offset-xl-3">
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="hstack flex-wrap justify-content-between align-items-center gap-2">
                                <span class="fw-bold">
                                    <i class="bi bi-file-richtext me-2"></i>
                                    Topics
                                </span>
                                <div class="d-flex gap-3">
                                    <template v-for="topic of resultsStore.results?.topics">
                                        <span class="badge bg-primary pill-rounded text-truncate">{{ topic }}</span>
                                    </template>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="hstack flex-wrap justify-content-between align-items-center gap-2">
                                <span class="fw-bold">
                                    <i class="bi bi-calendar3-range me-2"></i>
                                    Time-frame
                                </span>
                                <div class="hstack align-items-center gap-2">
                                    <span class="badge bg-secondary pill-rounded text-truncate">{{
                                        resultsStore.results?.start_year }}</span> -
                                    <span class="badge bg-secondary pill-rounded text-truncate">{{
                                        resultsStore.results?.end_year }}</span>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="hstack flex-wrap justify-content-between align-items-center">
                                <span class="fw-bold">
                                    <i class="bi bi-scissors me-2"></i>
                                    Cut-off similarity
                                </span>
                                <div class="hstack align-items-center gap-1">
                                    <span class="badge bg-secondary pill-rounded text-truncate">
                                        {{ resultsStore.results?.cutoff }}
                                    </span>
                                    <template v-if="resultsStore.searchResults?.adjusted_cutoff != null">
                                        <i class="bi bi-arrow-right-short"></i>
                                        <span class="badge bg-warning pill-rounded text-truncate">
                                            {{ resultsStore.searchResults?.adjusted_cutoff }}
                                        </span>
                                    </template>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" v-if="resultsStore.results?.type != QueryType.CITATION_RECOMMENDATION">
                            <div class="hstack flex-wrap justify-content-between align-items-center gap-2">
                                <span class="fw-bold">
                                    <i class="bi bi-file-richtext me-2"></i>
                                    Publications found
                                </span>
                                <div class="hstack align-items-center gap-2">
                                    <span class="badge bg-secondary pill-rounded text-truncate">{{
                                        resultsStore.results?.results.search_results?.raw_per_year.reduce((a, b) => a + b,
                                            0)
                                    }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <template v-if="resultsStore.searchResults?.adjusted_cutoff != null">
            <div class="alert alert-warning mt-3 mb-0">
                <i class="bi bi-exclamation-triangle-fill me-2"></i> The intended cutoff yielded no results. I've adjusted
                it for you. But please be wary, your topic might not be accurately represented in our available
                publications.
            </div>
        </template>
        <div class="hstack justify-content-center">
            <button class="btn btn-primary mx-auto mt-3" @click="repeatWithDifferentFilter">
                <i class="bi bi-arrow-repeat me-2"></i>
                Repeat query with different parameters
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filter';
import { useResultsStore } from '@/stores/results';
import { QueryType } from '@/types/api-models';
import { useRouter } from 'vue-router';

const resultsStore = useResultsStore();
const filterStore = useFilterStore();
const router = useRouter();

const repeatWithDifferentFilter = () => {
    filterStore.minCitations = String(resultsStore.results?.min_citations ?? 0);
    filterStore.selectedMinYear = resultsStore.results?.start_year ?? 1990;
    filterStore.selectedMaxYear = resultsStore.results?.end_year ?? 2022;
    filterStore.topics = resultsStore.results?.topics ?? [];
    filterStore.cutoff = String(resultsStore.results?.cutoff ?? 0.89);

    router.push("/filter");
};
</script>