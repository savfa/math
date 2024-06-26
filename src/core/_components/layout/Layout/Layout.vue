<script setup lang="ts">
import MainHeader from "../MainHeader/MainHeader.vue";
import MainFooter from "../MainFooter/MainFooter.vue";

// const props = defineProps<{}>();
</script>

<template>
  <div class="layout">
    <div class="layout__container">
      <div class="layout__header">
        <MainHeader />
      </div>

      <main class="layout__main">
        <RouterView />
      </main>

      <div class="layout__footer">
        <MainFooter />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../../../common/styles/dependencies";

.layout {
  $root: &;
  background: linear-gradient(to bottom right, white, blue);

  &__container {
    display: grid;
    grid-template: 100px 1fr 50px / 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer";
    min-height: 100vh; /* Высота контейнера равна высоте экрана */
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem; /* Сброс отступов */
  }

  &__header {
    grid-area: header;
  }

  &__main {
    grid-area: main;
  }

  &__footer {
    grid-area: footer;
  }
}
</style>
