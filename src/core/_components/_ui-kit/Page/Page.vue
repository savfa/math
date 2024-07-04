<script setup lang="ts">
// const props = defineProps<{}>();
</script>

<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "../../../../common/styles/dependencies";

.page {
  $root: &;

  padding: 1rem 0;
}
</style>
