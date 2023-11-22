<template>
    <div class="hstack gap-2 align-items-center">
        <div class="card">
            <div class="card-body px-2 py-2" v-html="message">
            </div>
        </div>
        <i class="bi bi-person-circle text-primary" style="font-size: 30px;"></i>
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
    justify-content: flex-end;
}
</style>