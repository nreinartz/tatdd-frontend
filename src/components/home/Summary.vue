<template>
    <div class="p-2">
        <div class="card" aria-hidden="true">
            <div class="card-body py-2">
                <div class="card-title mb-0">
                    <div class="hstack justify-content-between fw-bold">
                        <template v-if="summary.type === QueryType.CITATION_RECOMMENDATION">
                            <i class="bi bi-file-richtext fs-3"></i>
                            Citation Recommendation
                        </template>
                        <template v-else-if="summary.type === QueryType.TREND_ANALYSIS">
                            <i class="bi bi-file-richtext fs-3"></i>
                            Trend analysis
                        </template>
                        <template v-else>
                            <i class="bi bi-file-richtext fs-3"></i>
                            Complete analysis
                        </template>
                        <button type="button" class="btn-close" aria-label="Close" title="Remove session"
                            @click="() => $emit('remove', props.summary.uuid)"></button>
                    </div>
                </div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="hstack flex-wrap justify-content-center gap-2">
                        <template v-for="topic of props.summary.topics">
                            <span class="badge bg-secondary pill-rounded text-truncate">{{ topic }}</span>
                        </template>
                    </div>
                </li>
                <li class="list-group-item hstack gap-1 text-muted">
                    Time range:
                    <span class="badge text-bg-light pill-rounded ms-auto">
                        {{ props.summary.start_year }}
                    </span>
                    -
                    <span class="badge text-bg-light pill-rounded">
                        {{ props.summary.end_year }}
                    </span>
                </li>
                <li class="list-group-item">
                    <div class="hstack justify-content-between text-muted">
                        Distance: <span class="badge bg-primary pill-rounded">{{ props.summary.distance }}</span>
                    </div>
                </li>
            </ul>
            <div class="card-body" style="transform: rotate(0);">
                <RouterLink custom :to="toRoute" v-slot="{ navigate }">
                    <a class="btn btn-info col-12 stretched-link" aria-disabled="true" @click="navigate">
                        View results
                    </a>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QueryType, type QuerySummary } from '@/types/api-models';

const props = defineProps<{
    summary: QuerySummary;
}>();

const toRoute = {
    name: "results",
    params: {
        id: props.summary.uuid
    }
};
</script>