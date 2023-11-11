<template>
    <CollapsibleSection title="Statistics" icon="bi-bar-chart-line">
        <div class="row row-gap-3">
            <div class="col-12 col-xxl-7 col-xl-6">
                <div class="card h-100 shadow-sm" style="min-height: 35vh">
                    <div class="card-body">
                        <template v-if="resultsStore.searchResultsAvailable">
                            <TotalChart />
                        </template>
                        <Loader v-else message="Fetching publication data" />
                    </div>
                </div>
            </div>

            <div class="col-12 col-xxl-5 col-xl-6">
                <div class="card h-100 shadow-sm" style="min-height: 35vh">
                    <div class="card-body">
                        <template v-if="resultsStore.searchResultsAvailable">
                            <PubTypesChart />
                        </template>
                        <Loader v-else message="Fetching publication data" />
                    </div>
                </div>
            </div>
        </div>
    </CollapsibleSection>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';
import Loader from '@/components/common/Loader.vue';
import TotalChart from '@/components/results/charts/TotalChart.vue';
import PubTypesChart from '@/components/results/charts/PubTypesChart.vue';
import CollapsibleSection from '../common/CollapsibleSection.vue';

const resultsStore = useResultsStore();
</script>

<style scoped></style>