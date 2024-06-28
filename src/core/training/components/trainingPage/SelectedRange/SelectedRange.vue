<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  selectedRange: any;
}>();

const emit = defineEmits<{
  (e: "setSelectedRange", newState: string): void;
}>();

const startNum = ref<string>(``);

const isSelected = computed(() => (num) => {
  return (
    props.selectedRange &&
    props.selectedRange.split("-").map(Number).includes(num)
  );
});

const isInRange = computed(() => (num) => {
  if (!props.selectedRange) return false;

  const [start, end] = props.selectedRange.split("-").map(Number);
  return num >= start && num <= end;
});

const handleMouseDown = computed(() => (event) => {
  startNum.value = String(Number(event.target.textContent));
});
const handleMouseUp = computed(() => () => {
  startNum.value = ``;
});

const handleMouseOver = computed(() => (num) => {
  if (!startNum.value) return;

  const prepareRange =
    num > startNum.value
      ? `${startNum.value}-${num}`
      : `${num}-${startNum.value}`;

  emit(`setSelectedRange`, prepareRange);
});

const handleTouchStart = computed(() => (event) => {
  startNum.value = String(Number(event.target.textContent));
});

const handleTouchEnd = computed(() => () => {
  startNum.value = ``;
});

const handleTouchMove = computed(() => (event) => {
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

    emit(`setSelectedRange`, prepareRange);
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
        v-for="num in 10"
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
