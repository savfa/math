<script setup lang="ts">
import { onUnmounted, ref, watchEffect } from "vue";

const props = defineProps<{ isStartTimer: boolean }>();
const timeStr = defineModel("timeString");

const timer = ref<any>(null);
const timestamp = ref(0);
const timeString = ref(`00:00:00`);

watchEffect(() => {
  if (props.isStartTimer) {
    if (!timer.value) {
      const timerInterval = setInterval(() => {
        timestamp.value++;

        const hours = Math.floor(timestamp.value / 3600);
        const minutes = Math.floor((timestamp.value - hours * 3600) / 60);
        const seconds = timestamp.value - hours * 3600 - minutes * 60;

        const prepareValue: string = `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
        timeString.value = prepareValue;
        timeStr.value = prepareValue;
      }, 1e3);

      timer.value = timerInterval;
    }
  }
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<template>
  <div class="timer-time">время: {{ timeString }}</div>
</template>

<style scoped lang="scss"></style>
