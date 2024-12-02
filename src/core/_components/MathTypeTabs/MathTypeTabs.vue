<script setup lang="ts">
import AppButton from "../_ui-kit/AppButton/AppButton.vue";
import { computed } from "vue";
import { MathType } from "../../../helpers/consts/consts.ts";
import { getMathTypeFormat } from "../../../helpers/utils/utils.ts";

const mathType = defineModel("mathType");
const selectedRange = defineModel("selectedRange");

const getIsActive = computed(() => (tabType: string) => {
  return mathType.value === tabType;
});

const handleMathType = computed(() => (tabType: string) => {
  mathType.value = tabType;
  if (mathType.value !== tabType) {
    selectedRange.value = ``;
  }
});
</script>

<template>
  <div class="math-type">
    <AppButton
      isButtonTab
      :isActive="getIsActive(MathType.ADDITION)"
      :handleClick="() => handleMathType(MathType.ADDITION)"
    >
      {{ getMathTypeFormat(MathType.ADDITION) }}
    </AppButton>
    <AppButton
      isButtonTab
      :isActive="getIsActive(MathType.SUBTRACTION)"
      :handleClick="() => handleMathType(MathType.SUBTRACTION)"
    >
      {{ getMathTypeFormat(MathType.SUBTRACTION) }}
    </AppButton>
    <AppButton
      isButtonTab
      :isActive="getIsActive(MathType.MULTIPLICATION)"
      :handleClick="() => handleMathType(MathType.MULTIPLICATION)"
    >
      {{ getMathTypeFormat(MathType.MULTIPLICATION) }}
    </AppButton>
    <AppButton
        isButtonTab
        :isActive="getIsActive(MathType.COMPARE)"
        :handleClick="() => handleMathType(MathType.COMPARE)"
    >
      {{ getMathTypeFormat(MathType.COMPARE) }}
    </AppButton>
  </div>
</template>

<style scoped lang="scss">
.math-type {
  $root: &;

  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
}
</style>
