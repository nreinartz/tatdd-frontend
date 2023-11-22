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
                            <div class="hstack flex-wrap justify-content-between align-items-center gap-2">
                                <span class="fw-bold">
                                    <i class="bi bi-search me-2"></i>
                                    Search distance
                                </span>
                                <div class="hstack align-items-center gap-2">
                                    <span class="badge bg-secondary pill-rounded text-truncate">{{
                                        resultsStore.results?.distance }}</span>
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
                                        resultsStore.results?.results.search_results?.raw.reduce((a, b) => a + b, 0)
                                    }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';
import { QueryType } from '@/types/api-models';
import { computed } from 'vue';
const resultsStore = useResultsStore();
</script>

<style scoped></style>