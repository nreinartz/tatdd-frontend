<template>
    <div class="bg-white shadow-sm">
        <div class="container-lg vstack gap-3 align-items-between">
            <h1 class="display-6 text-muted text-center py-2">Full analysis</h1>
            <!-- <dl class="row align-self-center" v-if="resultsStore.results">
                <dt class="col-sm-4">Topics</dt>
                <dd class="col-sm-8 d-flex gap-2">
                    <template v-for="topic of resultsStore.results?.topics">
                        <span class="badge text-bg-primary">{{ topic }}</span>
                    </template>
                </dd>

                <dt class="col-sm-4">Time frame</dt>
                <dd class="col-sm-8">
                    {{ resultsStore.results?.start_year }} - {{ resultsStore.results?.end_year }}
                </dd>

                <template v-if="(resultsStore.results?.type ?? 0) > QueryType.CITATION_RECOMMENDATION">
                    <dt class="col-sm-4">
                        Search distance
                    </dt>
                    <dd class="col-sm-8">
                        <div class="badge bg-secondary">{{ resultsStore.results?.distance }}</div>
                    </dd>

                    <dt class="col-sm-4"># of publications</dt>

                    <dd class="col-sm-8 placeholder-glow">
                        <template v-if="resultsStore.searchResultsAvailable">
                            {{ resultsStore.searchResults?.raw.reduce((a, b) => a + b, 0) }}
                        </template>
                        <template v-else>
                            <span class="placeholder col-4"></span>
                        </template>
                    </dd>
                </template> 
            </dl>-->
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
                                <template v-for="topic of resultsStore.results?.topics">
                                    <div class="hstack align-items-center">
                                        <span class="badge bg-primary pill-rounded text-truncate">{{ topic }}</span>
                                    </div>
                                </template>
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

const pubNumAvailable = computed(() => {
    if (!resultsStore.searchResultsAvailable) {
        return false;
    }
    return resultsStore.results?.results.search_results?.raw!;
});
</script>

<style scoped></style>