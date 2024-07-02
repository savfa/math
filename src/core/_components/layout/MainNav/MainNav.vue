<script setup lang="ts">
import { AppRoute } from "../../../../helpers/consts/appRoute.ts";
import { getAppRouteName } from "../../../../helpers/utils/utils.ts";
import AppLink from "../../AppLink/AppLink.vue";

const routes = Object.values(AppRoute);
</script>

<template>
  <nav class="nav-bar">
    <ul class="nav-bar__list">
      <li class="nav-bar__item" v-for="route in routes" :key="route">
        <AppLink
          class="nav-bar__link"
          activeClass="nav-bar__link_active"
          :to="route"
          >{{ getAppRouteName(route) }}</AppLink
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "../../../../common/styles/dependencies";

.nav-bar {
  //@include media-breakpoint-down(l) {}

  $root: &;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  &__item {
  }

  &__link {
    padding: 0 16px 8px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 4px solid transparent;
    color: $color-velvet-primary;

    &:hover {
      color: $color-velvet-tertiary;
    }
  }

  &__link_active {
    color: $color-velvet-primary !important;
    border-bottom-color: $color-velvet-primary !important;
  }
}
</style>
