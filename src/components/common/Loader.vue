<template>
    <div class="h-100 d-flex justify-content-center align-items-center flex-column">
        <div :class="spinnerClass" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span class="mt-2 text-muted" v-if="message">{{ message }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ message?: string, isIntermediate?: boolean }>(), {
    isIntermediate: false
});
const spinnerClass = computed<string>(() => props.isIntermediate ? "spinner-grow" : "spinner-border");
</script>