<template>
    <div class="pt-3">
        <div class="cursor-pointer hstack align-items-center" type="button" @click="toggleCollapse">
            <template v-if="props.icon">
                <i class="bi me-2 fs-4" :class="props.icon"></i>
            </template>
            <h2 class="fw-normal mb-1">{{ props.title }}</h2>
            <i class="bi bi-chevron-up ms-auto me-2 fs-4" :class="{ collapsed: collapsed }"></i>
        </div>
        <hr />
        <div class="collapse show" ref="collapseElement">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as bootstrap from 'bootstrap';

const props = defineProps<{
    title: string;
    icon: string | null;
}>();

const collapseElement = ref<Element | null>(null);
const collapsible = ref<bootstrap.Collapse | null>(null);
const collapsed = ref<boolean>(false);

onMounted(() => {
    collapsible.value = new bootstrap.Collapse(collapseElement.value!, { toggle: false });
});

const toggleCollapse = () => {
    collapsible.value!.toggle();
    collapsed.value = !collapsed.value;
};
</script>

<style scoped>
/* Caret rotate */
div[type=button]>i.collapsed {
    transform: rotate(180deg);
    transition: transform 0.3s;
}

div[type=button]>i:not(.collapsed) {
    transform: rotate(0);
    transition: transform 0.3s;
}
</style>