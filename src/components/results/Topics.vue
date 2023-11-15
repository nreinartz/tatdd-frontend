<template>
    <CollapsibleSection title="Topic Discovery" icon="bi-binoculars">
        <div class="row row-gap-3 mt-4">
            <div class="col-12">
                <div class="card h-100 shadow-sm" style="min-height: 70vh">
                    <div class="card-body">
                        <template v-if="resultsStore.topicDiscoveryResultsAvailable">
                            <TopicClusters />
                        </template>
                        <Loader v-else :message="loadingMessage" :is-intermediate="loadingMessage === undefined" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card h-100 shadow-sm" style="min-height: 40vh">
                    <div class="card-body">
                        <template v-if="resultsStore.topicDiscoveryResultsAvailable">
                            <TopicChart />
                        </template>
                        <Loader v-else :message="loadingMessage" :is-intermediate="loadingMessage === undefined" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="resultsStore.topicDiscoveryResultsAvailable">
            <!-- Tab Headers -->
            <!-- <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(topic, index) in resultsStore.topicDiscoveryResults!.topics" :key="index">
                    <a class="nav-link" :class="{ active: activeTab === index }" href="#"
                        @click.prevent="activeTab = index">
                        {{ topic.name }}
                    </a>
                </li>
            </ul> -->

            <!-- Tab Contents -->
            <div class="tab-content">
                <div class="tab-pane" :class="{ active: activeTab === index }"
                    v-for="(topic, index) in resultsStore.topicDiscoveryResults!.topics" :key="index">

                    <!-- Table for each topic -->
                    <!-- <table class="table">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Frequency</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(word, wordIndex) in topic.words" :key="wordIndex">
                                <td>{{ word }}</td>
                                <td>{{ topic.frequencies[wordIndex] }}</td>
                                <td>{{ topic.timestamps[wordIndex] }}</td>
                            </tr>
                        </tbody>
                    </table> -->
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
import TopicClusters from './charts/TopicClusters.vue';

const resultsStore = useResultsStore();
const activeTab = ref(0);
const loadingMessage = computed<string | undefined>(
    () => resultsStore.results?.progress === QueryProgress.DiscoveringTopics ? "Discovering topics ..." : undefined
);
</script>