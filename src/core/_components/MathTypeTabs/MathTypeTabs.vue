<script setup lang="ts">
import AppButton from "../_ui-kit/AppButton/AppButton.vue";
import { computed, ref } from "vue";
import { MathType } from "../../../helpers/consts/consts.ts";

const props = defineProps<{
  mathType: string;
}>();

const emit = defineEmits<{
  (e: "setMathType", newState: string): void;
  (e: "setSelectedRange", newState: string): void;
}>();

const getIsActive = computed(() => (tabType: string) => {
  return props.mathType === tabType;
});

const handleMathType = computed(() => (tabType: string) => {
  emit("setMathType", tabType);
  if (props.mathType !== tabType) {
    emit("setSelectedRange", ``);
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
      Сложение
    </AppButton>
    <AppButton
      isButtonTab
      :isActive="getIsActive(MathType.SUBTRACTION)"
      :handleClick="() => handleMathType(MathType.SUBTRACTION)"
    >
      Вычитание
    </AppButton>
    <AppButton
      isButtonTab
      :isActive="getIsActive(MathType.MULTIPLICATION)"
      :handleClick="() => handleMathType(MathType.MULTIPLICATION)"
    >
      Умножение
    </AppButton>
  </div>
</template>

<style scoped lang="scss">
.math-type {
  $root: &;

  display: flex;
  padding: 1rem 0;
}
</style>
