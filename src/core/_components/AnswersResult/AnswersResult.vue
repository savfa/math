<script setup lang="ts">
defineProps<{
  correctAnswersCount: number;
  inCorrectAnswersCount: number;
}>();
</script>

<template>
  <div class="answers-result">
    <div>Правильных ответов: {{ correctAnswersCount }}</div>
    <div>Ошибок: {{ inCorrectAnswersCount }}</div>
  </div>
</template>

<style scoped lang="scss">
.answers-result {
  $root: &;

  font-size: 20px;
  font-weight: bold;
  display: flex;
  padding: 1rem 0;
  gap: 1rem;
}
</style>
