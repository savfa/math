<script setup lang="ts">
import MainNav from "../MainNav/MainNav.vue";
</script>

<template>
  <header class="main-header">
    <div class="main-header__wrap">
      <h1 class="main-header__title">
        Простая математика - улучшай свои знания
      </h1>
      <MainNav />
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "../../../../../common/styles/dependencies";

.main-header {
  $root: &;

  &__wrap {
  }

  &__title {
    text-align: center;

    @include media-breakpoint-down(sm) {
      font-size: 20px;
    }
  }
}
</style>
