<template>
	<div class="h-100 w-100 d-flex align-items-center flex-column p-3">
		<RouterLink custom :to="toRoute" v-slot="{ navigate }">
			<button type="button" class="btn btn-outline-dark fs-4" @click="navigate">
				<div class="d-flex align-items-center">
					Start new session <i class="ms-2 bi bi-arrow-right"></i>
				</div>
			</button>
		</RouterLink>
		<template v-if="sessionStore.sessions.length > 0 && !errorLoadingSessions">
			<hr class="w-100" />

			<h4>Previous sessions</h4>

			<div class="container">
				<div class="row justify-content-center">
					<template v-if="loadingSessions">
						<SummaryPlaceholder class="col-12 col-sm-6 col-md-4 col-xl-3" />
						<SummaryPlaceholder class="col-12 col-sm-6 col-md-4 col-xl-3" />
						<SummaryPlaceholder class="col-12 col-sm-6 col-md-4 col-xl-3" />
					</template>
					<template v-else>
						<Summary v-for="summary of sessions" :key="summary.uuid" :summary="summary"
							@remove="onRemoveSession" class="col-12 col-md-6 col-xl-4" />
					</template>
				</div>
			</div>
		</template>
		<template v-else-if="errorLoadingSessions">
			<div class="alert alert-danger mt-5 text-center" role="alert">
				<h4 class="alert-heading"><i class="bi bi-exclamation-circle-fill me-2"></i>Error loading previous
					sessions</h4>
				<p>There was an error while loading your previous sessions. Please try again later.</p>
			</div>
		</template>
	</div>
</template>


<script setup lang="ts">
import { useSessionStore } from '@/stores/sessions';
import type { QuerySummary } from '@/types/api-models';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import SummaryPlaceholder from "@/components/home/SummaryPlaceholder.vue";
import Summary from "@/components/home/Summary.vue";

import { getSessionSummary } from '@/utils/api';

const toRoute = {
	name: "filter"
};

const sessions = ref<QuerySummary[]>([]);
const sessionStore = useSessionStore();

const loadingSessions = ref<boolean>(true);
const errorLoadingSessions = ref<boolean>(false);

async function loadSessions() {
	try {
		const promises = sessionStore.sessions.map(getSessionSummary);
		const sessionSummaries = await Promise.all(promises);
		sessions.value = sessionSummaries;
	} catch (error) {
		errorLoadingSessions.value = true;
		sessionStore.sessions.forEach(sessionStore.removeSession);
	}
	finally {
		console.log(sessions.value)
		loadingSessions.value = false;
	}
}

function onRemoveSession(uuid: string) {
	sessionStore.removeSession(uuid);
	sessions.value = sessions.value.filter(s => s.uuid !== uuid);
}

loadSessions();
</script>