<template>
    <div class="hstack gap-2 align-items-center">
        <img src="favicon.ico" class="rounded d-block" style="max-height: 30px;">
        <div class="card">
            <div class="card-body px-2 py-2" v-html="message">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    message: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
div.hstack {
    justify-content: flex-start;
}

.card {
    background-color: #f8f9fa;
}
</style>