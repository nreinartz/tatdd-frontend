<template>
    <div class="container-lg d-flex flex-column justify-content-center p-3">
        <div class="d-flex align-items-baseline">
            <span class="h2">Filter selection</span>
        </div>
        <hr class="mt-1" />

        <div class="row row-gap-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-funnel me-1"></i> Time filter
                    </div>
                    <div class="card-body">
                        <span class="text-muted">Consider publications that were published between the start and end
                            year:</span>
                        <div class="row justify-content-center mt-2 row-gap-2">
                            <div class="col-lg-6 col-sm-6">
                                <div class="input-group input-group">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Start year</span>
                                    <select class="form-select" v-model.number="filterStore.selectedMinYear">
                                        <option v-for="year in startYearOptions" :value="year">{{ year }}</option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <div class="input-group input-group">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">End year</span>
                                    <select class="form-select" v-model.number="filterStore.selectedMaxYear">
                                        <option v-for="year in endYearOptions" :value="year">{{ year }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-funnel me-1"></i> Topic filter
                    </div>
                    <div class="card-body">
                        <span></span>
                        <div class="input-group input-group-sm mt-1">
                            <span class="input-group-text">Keyword</span>
                            <input type="text" class="form-control" v-model="topicInput" @keyup.enter="onAddKeyword">
                            <button class="btn btn-secondary text-white d-flex align-items-center" type="button"
                                :disabled="!topicInput" @click="onAddKeyword">
                                <i class="bi bi-plus"></i>Add
                            </button>
                        </div>
                        <div class="d-flex gap-2 mt-3" v-if="filterStore.topics.length > 0">
                            <template v-for="topic in filterStore.topics">
                                <Keyword :keyword="topic" @remove="onKeywordRemove" />
                            </template>
                        </div>
                        <hr />
                        <div class="alert alert-secondary mt-3 mb-0 text-muted">
                            The keyword filter allows you to specify topics that should be considered. You can either use
                            single keywords or whole phrase to describe your topic.
                            <p>
                                <strong>Please note:</strong> Defining multiple keywords does not act as an "or" operator.
                                If you define more
                                than one keyword, each vector representation will be calculated separately and the centroid
                                of
                                all will be used to query the database. This can lead to unexpected results (e.g if your
                                keywords are not "close" to each other).
                            </p>
                            <hr />
                            <div class="hstack gap-2 flex-wrap">
                                Examples:
                                <template v-for="(exampleTopic, i) in exampleKeywords">
                                    <div class="hstack gap-2 text-truncate" style="cursor: pointer;"
                                        @click="onAddExampleTopic(exampleTopic)">
                                        <div class="badge bg-primary text-truncate" v-for="topic in exampleTopic">
                                            {{ topic }}
                                        </div>
                                    </div>
                                    <div class="vr" v-if="i < exampleKeywords.length - 1"></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <i class="bi bi-gear me-1"></i> Trend analysis options
                    </div>
                    <div class="card-body">

                        <label for="cutoffRange" class="form-label">
                            Cut-off similarity: <div class="badge bg-secondary">{{ filterStore.cutoff }}</div>
                        </label>

                        <div class="d-flex justify-content-between align-items-center gap-2">
                            <div class="badge rounded-pill bg-secondary">0.7</div>
                            <input type="range" min="0.7" max="0.98" step="0.001" class="form-range" id="cutoffRange"
                                v-model="filterStore.cutoff">
                            <div class="badge rounded-pill bg-secondary">0.98</div>
                        </div>

                        <hr />

                        <div class="alert alert-secondary mt-3 mb-0 text-muted small">
                            The similarity cutoff controls which publications should be considered when contructing the
                            popularity chart. A similarity of -1 basically means, that the topics oppose each other while a
                            score of 1 means that they are the same. We set 0.7 as minimum, otherwise the search space will
                            be too large.
                            <strong>Experience has shown that a cut-off of 0.89 is a good starting value. The results will
                                show you if this is a good value for your topic.</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="card h-100">
                    <div class="card-header">
                        <i class="bi bi-gear me-1"></i> Citation recommendation options
                    </div>
                    <div class="card-body">

                        <label for="minCitations" class="form-label">
                            Min citation count: <div class="badge bg-secondary">{{ filterStore.minCitations }}</div>
                        </label>

                        <div class="d-flex justify-content-between align-items-center gap-2">
                            <div class="badge rounded-pill bg-secondary">0</div>
                            <input type="range" min="0" max="1000" step="1" class="form-range" id="minCitations"
                                v-model="filterStore.minCitations">
                            <div class="badge rounded-pill bg-secondary">1000</div>
                        </div>

                        <hr />

                        <div class="alert alert-secondary mt-3 mb-0 text-muted small">
                            If you only want to get publications that have been cited at least a certain number of times,
                            you can specify this here.
                        </div>
                    </div>
                </div>
            </div>

            <template v-if="!isCreatingSession">
                <div class="col-12">
                    <button type="button" class="btn btn-dark w-100" @click="onCompleteAnalysis"
                        :disabled="!analyseButtonEnabled">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-graph-up fs-2 text-white"></i>
                            <i class="bi bi-file-richtext fs-2 text-white ms-2"></i>

                            <div class="d-flex flex-column mx-auto">
                                Run complete analysis
                                <small class="fw-lighter">
                                    This will perform both operations, trend analysis and citation recommendation
                                </small>
                            </div>

                            <i class="bi bi-arrow-right fs-2 text-white"></i>
                        </div>
                    </button>
                </div>

                <div class="col-12 col-md-6">
                    <button type="button" class="btn btn-light w-100" @click="onAnalyseTrends"
                        :disabled="!analyseButtonEnabled">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-graph-up fs-2"></i>

                            <div class="d-flex flex-column mx-auto">
                                Only analyse trends
                                <small class="fw-lighter">This will check for possible trends</small>
                            </div>
                        </div>
                    </button>
                </div>

                <div class="col-12 col-md-6">
                    <button type="button" class="btn btn-light w-100" @click="onCitRec" :disabled="!analyseButtonEnabled">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-file-richtext fs-2"></i>

                            <div class="d-flex flex-column mx-auto">
                                Only get citation recommendations
                                <small class="fw-lighter">This will search for publications which might be suitable to
                                    cite</small>
                            </div>
                        </div>
                    </button>
                </div>
            </template>
            <Loader v-else message="Creating session ..." />
        </div>
    </div>

    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="errorToast" class="toast border-danger" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header text-danger">
                <i class="bi bi-exclamation-circle me-2"></i>
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                There was an error trying to create your query. Please try again later.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import Keyword from '@/components/filter/Keyword.vue';
import { createSession } from '@/utils/api';
import { QueryType } from '@/types/api-models';
import { useSessionStore } from '@/stores/sessions';
import { Toast } from 'bootstrap';
import Loader from '@/components/common/Loader.vue';
import { useFilterStore } from '@/stores/filter';

const router = useRouter();
const filterStore = useFilterStore();
const sessionStore = useSessionStore();


const minYear = 1980;
const maxYear = 2022;
const exampleKeywords = [
    ["machine learning", "deep learning"],
    ["blockchain"],
    ["Time-series based academic trend and downtrend detection"],
    ["p2p network", "bittorrent"]
];

const arrayRange = (start: number, stop: number, step: number): number[] =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, index) => start + index * step
    );


const startYearOptions = computed<number[]>(() => arrayRange(minYear, filterStore.selectedMaxYear - 4, 1));
const endYearOptions = computed<number[]>(() => arrayRange(filterStore.selectedMinYear + 4, maxYear, 1));
const analyseButtonEnabled = computed<boolean>(() => filterStore.topics.length > 0);

const topicInput = ref<string>("");
const isCreatingSession = ref<boolean>(false);
const errorToast = ref(null);
const errorToastInstance = ref<Toast | null>(null);

const onKeywordRemove = (keyword: string) => {
    filterStore.topics = filterStore.topics.filter((topic) => topic !== keyword);
};

const onAddKeyword = () => {
    if (!filterStore.topics.includes(topicInput.value)) {
        filterStore.topics.push(topicInput.value);
    }

    topicInput.value = "";
};

const onAddExampleTopic = (topic: string[]) => {
    for (const t of topic) {
        if (!filterStore.topics.includes(t)) {
            filterStore.topics.push(t);
        }
    }
};

const onCompleteAnalysis = () => onCreate(QueryType.ALL);
const onAnalyseTrends = () => onCreate(QueryType.TREND_ANALYSIS);
const onCitRec = () => onCreate(QueryType.CITATION_RECOMMENDATION);

async function onCreate(type: QueryType) {
    try {
        isCreatingSession.value = true;

        const session = await createSession(type,
            filterStore.topics,
            filterStore.selectedMinYear,
            filterStore.selectedMaxYear,
            parseFloat(filterStore.cutoff),
            parseInt(filterStore.minCitations)
        );

        sessionStore.addSession(session.uuid);
        filterStore.reset();

        router.push({
            name: "results",
            params: {
                id: session.uuid
            }
        });
    } catch (error) {
        console.log(error);
        errorToastInstance.value?.show();
    } finally {
        isCreatingSession.value = false;
    }
}

onMounted(() => {
    errorToastInstance.value = Toast.getOrCreateInstance(errorToast.value!);
});

onBeforeRouteLeave(() => {
    if (errorToastInstance.value) {
        errorToastInstance.value.dispose();
    }
});
</script>