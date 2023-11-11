<template>
    <div class="card">


        <div class="card-body">
            <div class="card-title">
                <i class="bi bi-card-text me-2"></i> Description
            </div>
            <hr />
            <template v-if="!resultsStore.trendResults?.trend_description">
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                    <span class="placeholder col-12"></span>
                    <span class="placeholder col-2"></span>
                </p>
            </template>
            <template v-else>
                <p class="card-text">
                    {{ resultsStore.trendResults?.trend_description }}
                </p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';

const resultsStore = useResultsStore();
</script>

<style scoped></style>