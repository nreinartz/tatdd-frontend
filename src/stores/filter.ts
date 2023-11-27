import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', () => {
    const cutoff = ref("0.89");
    const minCitations = ref("0");
    const topics = ref([] as string[]);
    const selectedMinYear = ref(1990);
    const selectedMaxYear = ref(2022);

    function reset() {
        cutoff.value = "0.89";
        minCitations.value = "0";
        topics.value = [];
        selectedMinYear.value = 1990;
        selectedMaxYear.value = 2022;
    }

    return {
        cutoff,
        minCitations,
        topics,
        selectedMinYear,
        selectedMaxYear,
        reset
    }
})