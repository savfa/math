<script setup lang="ts">
import {computed, ref} from "vue";
import {MathType} from "../../../../../helpers/consts/consts.ts";

const mathType = defineModel<any>("mathType");
const selectedRange = defineModel<any>("selectedRange");

const startNum = ref<string>(``);

const isSelected = computed(() => (num: number, measuresOptions: any) => {
  const { stringRange, fromMeasures, toMeasures, operators } = measuresOptions || {};
  const rangeName = (stringRange && `stringRange`) || (fromMeasures && `fromMeasures`) || (toMeasures && `toMeasures`) || (operators && `operators`);

  switch (mathType.value) {
    case MathType.ADDITION:
    case MathType.SUBTRACTION:
    case MathType.MULTIPLICATION:
    case MathType.COMPARE:
    case MathType.LENGTH_MEASURES:
      return stringRange
          ? selectedRange.value?.[rangeName].split("-").map(Number).includes(num)
          : selectedRange.value?.[rangeName].includes(num)
    default:
      return false;
  }
});

const isInRange = computed(() => (num: number) => {
  if (!selectedRange?.value.stringRange) return false;

  const [start, end] = selectedRange.value.stringRange?.split("-").map(Number);
  return num >= start && num <= end;
});

const prepareMaxNumRange = computed(() => {
  switch (mathType.value) {
    case MathType.ADDITION:
      return 50;
    case MathType.SUBTRACTION:
      return 100;
    case MathType.MULTIPLICATION:
      return 10;
    case MathType.COMPARE:
      return { stringRange: 50, measures: [], operators: [`+`, `-`] }
    case MathType.LENGTH_MEASURES:
      return { stringRange: 30, measures: [`м`, `дм`, `см`, `мм`], operators: [`+`, `-`] };

    default:
      return 10;
  }
});

const handleMouseDown = computed(() => (event: any) => {
  startNum.value = String(Number(event.target.textContent));
});
const handleMouseUp = computed(() => () => {
  startNum.value = ``;
});

const handleMouseOver = computed(() => (num: number) => {
  if (!startNum.value) return;

  selectedRange.value.stringRange = num > +startNum.value
      ? `${startNum.value}-${num}`
      : `${num}-${startNum.value}`;
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

    selectedRange.value.stringRange = prepareRange;
  }
});

const handleClick = computed(() => (value: string, measuresOptions: any) => {
  const { fromMeasures, toMeasures, operators } = measuresOptions || {};
  const rangeName = (fromMeasures && `fromMeasures`) || (toMeasures && `toMeasures`) || (operators && `operators`);

  selectedRange.value[rangeName] = selectedRange.value[rangeName].includes(value)
      ? selectedRange.value[rangeName].filter((it) => it !== value)
      : [...selectedRange.value[rangeName], value];
});
</script>

<template>
  <div class="selected-range" @mouseup="handleMouseUp">
    <div class="selected-range__text">Выберите диапазон</div>
    <div class="selected-range__list">
      <div
        class="selected-range__list-item"
        :class="{
          selected: isSelected(num, {stringRange: true}),
          'range-selected': isInRange(num),
        }"
        v-for="num in (prepareMaxNumRange?.[`stringRange`] || prepareMaxNumRange)"
        :key="num"
        @mousedown="handleMouseDown"
        @mouseover="handleMouseOver(num)"
        @mouseup="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
      >
        {{ num }}
      </div>
    </div>

    <div v-if="[MathType.COMPARE, MathType.LENGTH_MEASURES].includes(mathType)">
      <div class="selected-range__text">Выберите параметры</div>

      <div class="selected-range__list" v-if="[MathType.LENGTH_MEASURES].includes(mathType)">
        <div class="selected-range__text" style="width: 25px">c</div>
        <div
            class="selected-range__list-item"
            :class="{
        selected: isSelected(num, {fromMeasures: true}),
        'range-selected': isSelected(num, {fromMeasures: true}),
      }"
            v-for="num in prepareMaxNumRange[`measures`]"
            :key="num"
            @click="handleClick(num, {fromMeasures: true})"
        >
          {{ num }}
        </div>
      </div>

      <div class="selected-range__list" v-if="[MathType.COMPARE, MathType.LENGTH_MEASURES].includes(mathType)">
        <div class="selected-range__text" style="width: 25px">с</div>
        <div
            class="selected-range__list-item"
            :class="{
          selected: isSelected(operator, {operators: true}),
          'range-selected': isSelected(operator, {operators: true}),
        }"
            v-for="operator in prepareMaxNumRange[`operators`]"
            :key="operator"
            @click="handleClick(operator, {operators: true})"
        >
          {{ operator }}
        </div>
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
    align-items: center;
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
