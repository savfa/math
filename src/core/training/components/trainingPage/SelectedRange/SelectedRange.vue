<script setup lang="ts">
import { computed, ref } from "vue";
import { MathType } from "../../../../../helpers/consts/consts.ts";

const mathType = defineModel("mathType");
const selectedRange = defineModel<any>("selectedRange");

const startNum = ref<string>(``);
const isSelected = computed(() => (num: number) => {
  return (
    selectedRange.value &&
    selectedRange.value.split("-").map(Number).includes(num)
  );
});

const prepareMaxNumRange = computed(() => {
  switch (mathType.value) {
    case MathType.ADDITION:
      return 10;
    case MathType.SUBTRACTION:
      return 20;
    case MathType.MULTIPLICATION:
      return 10;

    default:
      return 10;
  }
});

const isInRange = computed(() => (num: number) => {
  if (!selectedRange.value) return false;

  const [start, end] = selectedRange.value.split("-").map(Number);
  return num >= start && num <= end;
});

const handleMouseDown = computed(() => (event: any) => {
  startNum.value = String(Number(event.target.textContent));
});
const handleMouseUp = computed(() => () => {
  startNum.value = ``;
});

const handleMouseOver = computed(() => (num: number) => {
  if (!startNum.value) return;

  const prepareRange =
    num > +startNum.value
      ? `${startNum.value}-${num}`
      : `${num}-${startNum.value}`;

  selectedRange.value = prepareRange;
});

const handleTouchStart = computed(() => (event: any) => {
  startNum.value = String(Number(event.target.textContent));
});

const handleTouchEnd = computed(() => () => {
  startNum.value = ``;
});

const handleTouchMove = computed(() => (event: any) => {
  if (!startNum.value) return;

  const touch = event.changedTouches[0];
  const touchX = touch.clientX;
  const touchY = touch.clientY;

  const listItems = event.target.parentNode.children;
  let currentItem = null;

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const rect = item.getBoundingClientRect();

    if (
      touchX >= rect.left &&
      touchX <= rect.right &&
      touchY >= rect.top &&
      touchY <= rect.bottom
    ) {
      currentItem = item;
      break;
    }
  }

  if (currentItem) {
    const num = String(Number(currentItem.textContent));
    const prepareRange =
      num > startNum.value
        ? `${startNum.value}-${num}`
        : `${num}-${startNum.value}`;

    selectedRange.value = prepareRange;
  }
});
</script>

<template>
  <div class="selected-range" @mouseup="handleMouseUp">
    <div class="selected-range__text">Выберите диапазон чисел</div>
    <div class="selected-range__list">
      <div
        class="selected-range__list-item"
        :class="{
          selected: isSelected(num),
          'range-selected': isInRange(num),
        }"
        v-for="num in prepareMaxNumRange"
        :key="num"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseover="handleMouseOver(num)"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
      >
        {{ num }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected-range {
  $root: &;

  &__text {
    font-size: 20px;
    font-weight: bold;
  }

  &__list {
    padding: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border: 1px solid black;
      cursor: pointer;
      user-select: none;
      background-color: white;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

      &.selected {
        background-color: lightblue;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }

      &.range-selected {
        background-color: lightgreen;
      }
    }
  }
}
</style>
