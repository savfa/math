<script setup lang="ts">
import { ref, watch } from "vue";
import Page from "../../../_components/Page/Page.vue";
import QuestionAnswers from "../../../_components/QuestionAnswers/QuestionAnswers.vue";

const selectedRange = ref(null);
const startNum = ref(null);
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
  if (event.target.classList.contains("training__range-list-item")) {
    startNum.value = Number(event.target.textContent);
  }
};

const handleMouseOver = (num) => {
  if (!startNum.value) return;

  selectedRange.value = `${startNum.value}-${num}`;
};

const handleMouseUp = () => {
  startNum.value = null;
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
  <Page>
    <div class="training__range">
      <div class="training__range-text">Выберите диапазон чисел:</div>
      <div class="training__range-list" @mousedown="handleMouseDown">
        <div
          class="training__range-list-item"
          :class="{
            selected: isSelected(num),
            'range-selected': isInRange(num),
          }"
          v-for="num in 10"
          :key="num"
          @mouseover="handleMouseOver(num)"
          @mouseup="handleMouseUp"
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

  &__question-text {
    font-size: 20px;
    font-weight: bold;
    padding: 1rem 0;
  }

  &__results {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    padding: 1rem 0;
    gap: 1rem;
  }
}

.answers {
  $root: &;
  padding: 1rem 0;
  display: grid;
  grid-template: repeat(3, 50px) / repeat(3, 50px);
  gap: 10px;
  perspective: 800px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    transform-style: preserve-3d;

    &:active {
      transform: translateZ(-10px) scale(0.95);
    }

    &#{--correct} {
      background-color: lightgreen;
    }

    &#{--incorrect} {
      background-color: lightcoral;
    }
  }
}
</style>
