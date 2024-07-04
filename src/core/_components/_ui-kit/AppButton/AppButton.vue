<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  isGlowOnHover?: boolean;
  handleClick?: any;
  isButtonTab?: boolean;
  isActive?: boolean;
  isButtonTag?: boolean;
  style?: any;
}>();

const buttonStylesObj = computed(() => ({
  button: true,
  "glow-on-hover": props.isGlowOnHover,
  "button-tab": props.isButtonTab,
  "button-tab--active": props.isButtonTab && props.isActive,
  "button-tag": props.isButtonTag,
}));
</script>

<template>
  <button :class="buttonStylesObj" @click="handleClick" :style="style">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "../../../../common/styles/dependencies";

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button {
  $root: &;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-velvet-primary;
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  margin: 0;
  transition: 0.3s ease all;
  position: relative;
  z-index: 0;

  &.glow-on-hover {
    &:before {
      content: "";
      background: linear-gradient(
        45deg,
        #ff0000,
        #ff7300,
        #fffb00,
        #48ff00,
        #00ffd5,
        #002bff,
        #7a00ff,
        #ff00c8,
        #ff0000
      );
      position: absolute;
      top: -2px;
      left: -2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      border-radius: 50px;
    }

    &:active {
      color: white;
    }

    &:active:after {
      background: transparent;
    }

    &:hover:before {
      opacity: 1;
    }

    &:after {
      z-index: -1;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: $color-velvet-primary;
      left: 0;
      top: 0;
      border-radius: 50px;
    }
  }

  &.button-tab {
    background: white;
    color: #000;
    border: 1px solid #000;

    &--active {
      background: lightgreen;
    }
  }

  &.button-tag {
    background: white;
    color: #000;
    border: 1px solid #000;
    cursor: default;
    padding: 4px 16px;
  }
}
</style>
