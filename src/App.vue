<template>
	<nav class="navbar navbar-dark bg-dark navbar-expand-lg sticky-top">
		<div class="container">
			<ul class="navbar-nav me-auto">
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="/">
						<i class="bi bi-house me-1"></i>
						Home
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="/about">
						<i class="bi bi-info-lg me-1"></i>
						About
					</a>
				</li>
			</ul>
			<template v-if="!isHomeRoute && !isFilterRoute">
				<RouterLink custom :to="{ name: 'filter' }" v-slot="{ navigate }">
					<button class="btn btn-outline-light" type="submit" @click="navigate">
						<i class="bi bi-search me-1"></i>
						Start new analysis
					</button>
				</RouterLink>
			</template>
		</div>
	</nav>

	<div class="flex-grow-1">
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const isHomeRoute = computed(() => route.name === "home");
const isFilterRoute = computed(() => route.name === "filter");
</script>
