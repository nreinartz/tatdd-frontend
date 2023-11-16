import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DataStatistics } from '@/types/api-models'
import { getStatistics } from '@/utils/api';

export const useStatsStore = defineStore('statistics', () => {
    const stats = ref<DataStatistics | null>(null)

    async function _getStatistics() {
        const statistics = await getStatistics();
        stats.value = statistics;
    }

    return { stats, getStatistics: _getStatistics }
});
