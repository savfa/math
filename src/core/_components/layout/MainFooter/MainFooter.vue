<script setup lang="ts">
import { computed } from "vue";

const yearRange = computed(() => {
  const fullYear = new Date().getFullYear();

  return fullYear > 2024 ? `2024 - ${fullYear}` : fullYear;
});
</script>

<template>
  <footer class="main-footer">
    <div class="main-footer__wrap">
      <div class="main-footer__copyright">
        <p>© savfa {{ yearRange }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.main-footer {
  $root: &;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
