<template>
    <CollapsibleSection title="Citation recommendations" icon="bi-file-richtext">
        <div class="row row-gap-2">
            <div class="col-auto ms-auto">
                <div class="btn-group" role="group" aria-label="Sorting button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnSortBySimilarity" autocomplete="off"
                        v-model="radioValue" :value="0">
                    <label class="btn btn-outline-primary" for="btnSortBySimilarity">
                        <i class="bi bi-geo-alt me-1"></i>
                        Similarity
                    </label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnSortByYear" autocomplete="off"
                        v-model="radioValue" :value="1">
                    <label class="btn btn-outline-primary" for="btnSortByYear">
                        <i class="bi bi-calendar me-1"></i>
                        Publication Year
                    </label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnSortByCit" autocomplete="off"
                        v-model="radioValue" :value="2">
                    <label class="btn btn-outline-primary" for="btnSortByCit">
                        <i class="bi bi-journal-text me-1"></i> Citation Count
                    </label>
                </div>
                <button type="button" class="ms-2 btn btn-light" @click="() => sortAscending = !sortAscending">
                    <i class="bi bi-sort-numeric-down" v-if="sortAscending"></i>
                    <i class="bi bi-sort-numeric-up" v-else></i>
                </button>
            </div>
            <div class="w-100"></div>

            <template v-if="resultsStore.citationResultsAvailable">
                <template v-for="publication of sortedRecommendations">
                    <div class="col-12 col-lg-6">
                        <CitationRecommendationVue :publication="publication" />
                    </div>
                </template>
            </template>
            <template v-else>
                <CitationRecommendationPlaceholder />
                <CitationRecommendationPlaceholder />
                <CitationRecommendationPlaceholder />
            </template>
        </div>
    </CollapsibleSection>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results';
import CollapsibleSection from '@/components/common/CollapsibleSection.vue';
import CitationRecommendationVue from './CitationRecommendation.vue';
import CitationRecommendationPlaceholder from './CitationRecommendationPlaceholder.vue';
import { computed, ref } from 'vue';
import type { Publication } from '@/types/api-models';

const resultsStore = useResultsStore();
const radioValue = ref<number>(0);
const sortAscending = ref<boolean>(false);

const sortOptions: { [key: number]: keyof Publication } = {
    0: 'similarity',
    1: 'year',
    2: 'citations',
};

const sortedRecommendations = computed(() => {
    const publications = resultsStore.citationResults?.publications || [];
    const sortKey = sortOptions[radioValue.value];

    if (!sortKey) {
        return []; // or handle the default case differently
    }

    return publications.sort((a, b) => {
        const valueA: any = a[sortKey];
        const valueB: any = b[sortKey];
        if (sortAscending.value) {
            return valueA - valueB;
        }
        return valueB - valueA;
    });
});
</script>

<style scoped></style>