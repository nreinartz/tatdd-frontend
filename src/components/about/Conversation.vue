<template>
    <div class="vstack gap-2">
        <template v-for="(message, index) of messages" :key="index">
            <template v-if="(index % 2 == 0 && !botIsStarting) || (botIsStarting && index % 2 == 1)">
                <UserMessage :message="message" />
            </template>
            <BotMessage :message="message" v-else />
        </template>
    </div>
</template>

<script setup lang="ts">
import UserMessage from "./UserMessage.vue";
import BotMessage from "./BotMessage.vue";

defineProps<{
    messages: string[];
    botIsStarting?: boolean;
}>();
</script>

<style scoped></style>