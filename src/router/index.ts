import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue';
import FilterView from '@/views/FilterView.vue';
import ResultsView from '@/views/ResultsView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: 'home',
			component: HomeView
		},
		{
			path: "/about",
			name: 'about',
			component: AboutView
		},
		{
			path: "/filter",
			name: "filter",
			component: FilterView
		},
		{
			path: "/results/:id",
			name: "results",
			component: ResultsView
		}
	]
});

export default router
