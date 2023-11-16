import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { QueryProgress, type QueryEntry } from '@/types/api-models'
import { getSession } from '@/utils/api';

export const useResultsStore = defineStore('results', () => {
    const resultsLoading = ref(false);
    const results = ref<QueryEntry | null>(null);

    const searchResultsAvailable = computed<boolean>(() => results.value?.results?.search_results != null);
    const trendResultsAvailable = computed<boolean>(() => results.value?.results?.trend_results != null);
    const clusteringResultsAvailable = computed<boolean>(() => results.value?.results?.topic_discovery_results?.clusters != null);
    const topicsOverTimeResultsAvailable = computed<boolean>(() => results.value?.results?.topic_discovery_results?.topics_over_time != null);
    const citationResultsAvailable = computed<boolean>(() => results.value?.results?.citation_results != null);

    const searchResults = computed(() => results.value?.results?.search_results);
    const trendResults = computed(() => results.value?.results?.trend_results);
    const citationResults = computed(() => results.value?.results?.citation_results);
    const clusteringResults = computed(() => results.value?.results?.topic_discovery_results?.clusters);
    const topicsOverTimeResults = computed(() => results.value?.results?.topic_discovery_results?.topics_over_time);

    const queryFinished = computed<boolean>(() => results.value?.progress === QueryProgress.Finished || results.value?.progress === QueryProgress.Failed);

    async function _getSession(id: string) {
        resultsLoading.value = true;

        try {
            results.value = await getSession(id);
        } catch (error) {
            throw (error);
        } finally {
            resultsLoading.value = false;
        }

    }

    function _reset() {
        results.value = null;
    }

    return {
        searchResultsAvailable,
        trendResultsAvailable,
        citationResultsAvailable,
        clusteringResultsAvailable,
        topicsOverTimeResultsAvailable,
        searchResults,
        trendResults,
        citationResults,
        clusteringResults,
        topicsOverTimeResults,
        results,
        resultsLoading,
        queryFinished,
        getSession: _getSession,
        reset: _reset
    };
});
