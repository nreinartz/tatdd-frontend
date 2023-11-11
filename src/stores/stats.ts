import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DataStatistics } from '@/types/api-models'

export const useStatsStore = defineStore('statistics', () => {
    const stats = ref<DataStatistics | null>(null)

    async function getStatistics() {
        const response = await fetch("http://127.0.0.1:8000/api/statistics");
        stats.value = await response.json();
    }

    return { stats, getStatistics }
});
