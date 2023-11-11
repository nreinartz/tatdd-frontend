<template>
    <span class="badge bg-primary text-bg-dark" @click="onRemove" style="cursor: pointer">
        {{ props.keyword }} <i class="bi bi-x-lg ms-1"></i>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    keyword: string
}>();

const emit = defineEmits<{
    (e: "remove", keyword: string): void
}>();

const onRemove = () => {
    emit("remove", props.keyword);
};
</script>

<style scoped></style>