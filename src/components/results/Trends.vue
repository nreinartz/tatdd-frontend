<template>
    <CollapsibleSection title="Trends" icon="bi-graph-up">
        <div class="row row-gap-3 mt-4">
            <div class="col-12">
                <div class="card h-100 shadow-sm" style="min-height: 45vh">
                    <div class="card-body">
                        <template v-if="resultsStore.trendResultsAvailable">
                            <TrendChart />
                        </template>
                        <Loader v-else :message="loadingMessage" :is-intermediate="loadingMessage === undefined" />
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <TrendList class="shadow-sm" />
            </div>

            <div class="col-12 col-md-6">
                <TrendDescription class="shadow-sm" />
            </div>
        </div>
    </CollapsibleSection>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';
import CollapsibleSection from '../common/CollapsibleSection.vue';
import TrendChart from '@/components/results/charts/TrendChart.vue';
import TrendList from '@/components/results/TrendList.vue';
import TrendDescription from '@/components/results/TrendDescription.vue';
import Loader from '../common/Loader.vue';
import { computed } from 'vue';
import { QueryProgress } from '@/types/api-models';

const resultsStore = useResultsStore();
const loadingMessage = computed<string | undefined>(
    () => resultsStore.results?.progress === QueryProgress.AnalysingTrends ? "Analysing trends ..." : undefined
);
</script>