<template>
    <CollapsibleSection title="Topic Discovery" icon="bi-binoculars">
        <div class="row row-gap-3 mt-4">
            <div class="col-12">
                <div class="card h-100 shadow-sm" style="min-height: 70vh">
                    <div class="card-body">
                        <template v-if="resultsStore.clusteringResultsAvailable">
                            <TopicClusters3D />
                        </template>
                        <Loader v-else :message="loadingMessageCluster"
                            :is-intermediate="loadingMessageCluster === undefined" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card h-100 shadow-sm" style="min-height: 40vh">
                    <div class="card-body">
                        <template v-if="resultsStore.topicsOverTimeResultsAvailable">
                            <TopicChart />
                        </template>
                        <Loader v-else :message="loadingMessageTopics"
                            :is-intermediate="loadingMessageTopics === undefined" />
                    </div>
                </div>
            </div>
        </div>
    </CollapsibleSection>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';
import CollapsibleSection from '../common/CollapsibleSection.vue';
import Loader from '../common/Loader.vue';
import { computed, ref } from 'vue';
import { QueryProgress } from '@/types/api-models';
import TopicChart from './charts/TopicChart.vue';
import TopicClusters3D from './charts/TopicClusters3D.vue';

const resultsStore = useResultsStore();

const loadingMessageCluster = computed<string | undefined>(
    () => resultsStore.results?.progress === QueryProgress.ClusteringTopics ? "Clustering topics ..." : undefined
);

const loadingMessageTopics = computed<string | undefined>(
    () => resultsStore.results?.progress === QueryProgress.TopicOverTime ? "Analyzing topics over time ..." : undefined
);
</script>