<script setup lang="ts">
import { ref, watch } from "vue";
import Page from "../../../_components/Page/Page.vue";
import QuestionAnswers from "../../../_components/QuestionAnswers/QuestionAnswers.vue";

const selectedRange = ref<string>(``);
const startNum = ref<string>(``);
const currentQuestion = ref({});
const correctAnswersCount = ref(0);
const inCorrectAnswersCount = ref(0);

const isSelected = (num) => {
  return (
    selectedRange.value &&
    selectedRange.value.split("-").map(Number).includes(num)
  );
};

const isInRange = (num) => {
  if (!selectedRange.value) return false;

  const [start, end] = selectedRange.value.split("-").map(Number);
  return num >= start && num <= end;
};

const handleMouseDown = (event) => {
  startNum.value = String(Number(event.target.textContent));
};
const handleMouseUp = () => {
  startNum.value = ``;
};

const handleMouseOver = (num) => {
  if (!startNum.value) return;

  const prepareRange =
    num > startNum.value
      ? `${startNum.value}-${num}`
      : `${num}-${startNum.value}`;

  selectedRange.value = prepareRange;
};

const startQuiz = () => {
  correctAnswersCount.value = 0;
  inCorrectAnswersCount.value = 0;
  getNewQuestion();
};

const getNewQuestion = () => {
  const [min, max] = selectedRange.value.split("-").map(Number);
  currentQuestion.value = {
    a: Math.floor(Math.random() * (max - min + 1)) + min,
    b: Math.floor(Math.random() * (max - min + 1)) + min,
  };
};

const handleCheckAnswer = (isCorrect) => {
  if (isCorrect) {
    correctAnswersCount.value++;
  } else {
    inCorrectAnswersCount.value++;
  }

  setTimeout(() => {
    getNewQuestion();
  }, 500);
};

watch(selectedRange, () => {
  startQuiz();
});
</script>

<template>
  <Page @mouseup="handleMouseUp">
    <div class="training__range">
      <div class="training__range-text">Выберите диапазон чисел:</div>
      <div class="training__range-list">
        <div
          class="training__range-list-item"
          :class="{
            selected: isSelected(num),
            'range-selected': isInRange(num),
          }"
          v-for="num in 10"
          :key="num"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          @mouseover="handleMouseOver(num)"
        >
          {{ num }}
        </div>
      </div>
    </div>

    <div v-if="selectedRange">
      <QuestionAnswers
        :handleCheckAnswer="handleCheckAnswer"
        :question="currentQuestion"
      />

      <div class="training__results">
        <div>Правильных ответов: {{ correctAnswersCount }}</div>
        <div>Ошибок: {{ inCorrectAnswersCount }}</div>
      </div>
    </div>
  </Page>
</template>

<style scoped lang="scss">
.training {
  $root: &;

  &__range-text {
    font-size: 20px;
    font-weight: bold;
  }

  &__range-list {
    padding: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0 10px;

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

  &__results {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    padding: 1rem 0;
    gap: 1rem;
  }
}
</style>
