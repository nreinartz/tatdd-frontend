<template>
    <div class="card px-0 h-100 shadow-sm">
        <div class="card-body">
            <h6 class="card-title d-flex justify-content-between align-items-start">
                {{ publication.title }}
                <span class="badge bg-primary">{{ publication.year }}</span>
            </h6>
            <h6 class="card-subtitle mb-2 text-body-secondary small">
                {{ publication.authors.join(", ") }} - <span class="text-muted">{{ publication.type
                }}</span>
            </h6>
            <hr />
            <small>
                {{ abstract }}
                <button type="button" class="btn btn-link btn-sm" @click="toggleText">
                    <span v-if="isTextExpanded">Show less</span>
                    <span v-else>Show more</span>
                </button>
            </small>
        </div>

        <div
            class="card-footer d-flex flex-wrap align-items-center gap-1 justify-content-center justify-content-md-between">
            <div>
                <span class="badge text-bg-light">Similarity: {{ Math.round(publication.similarity * 1000) / 1000 }}</span>
                <span class="badge text-bg-light ms-2">Citations: {{ publication.citations ?? "<Unknown>" }}</span>
            </div>

            <a :href="`https://doi.org/${publication.doi}`" target="_blank">
                <span class="badge bg-dark ">
                    DOI: {{ publication.doi }}
                    <i class="bi bi-link-45deg ms-1"></i>
                </span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Publication } from '@/types/api-models';
import { computed, ref } from 'vue';

const props = defineProps<{ publication: Publication }>();
const publication = computed<Publication>(() => props.publication);

const isTextExpanded = ref<boolean>(false);

const abstract = computed<string>(() => {
    if (isTextExpanded.value) {
        return publication.value.abstract;
    } else {
        return publication.value.abstract.slice(0, 200) + '...';
    }
});

const toggleText = () => isTextExpanded.value = !isTextExpanded.value;
</script>

<style scoped></style>