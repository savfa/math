<script setup lang="ts">
import { computed, ref, VueElement, watch } from "vue";
import { MathType } from "../../../helpers/consts/consts.ts";

const props = defineProps<{
  mathType: string;
  question: { num: number; a: number; b: number };
  handleCheckAnswer: any;
  maxShuffle?: number;
}>();

const selectedAnswer = ref<VueElement | null>(null);

const getMathTypeConfig = (type: string) => {
  switch (type) {
    case MathType.ADDITION:
      return { maxNum: 20, operator: `+` };
    case MathType.SUBTRACTION:
      return { maxNum: 20, operator: `-` };
    case MathType.MULTIPLICATION:
      return { maxNum: 100, operator: `*` };
    default:
      return { maxNum: 20, operator: `+` };
  }
};

const maxNum = computed(() => getMathTypeConfig(props.mathType).maxNum);
const operator = computed(() => getMathTypeConfig(props.mathType).operator);

const calculate = (a: number, b: number, operator: string) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a > b ? a - b : b - a;
    case "*":
      return a * b;
    default:
      return a + b;
  }
};

const shuffledAnswers = computed(() => {
  const options = new Set([
    calculate(props.question.a, props.question.b, operator.value),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
    Math.floor(Math.random() * maxNum.value + 1),
  ]);

  while (options.size !== 9) {
    options.add(Math.floor(Math.random() * maxNum.value + 1));
  }

  return [...options].sort(() => Math.random() - 0.5);
});

const checkAnswer = (answer, element) => {
  selectedAnswer.value = element;
  const isCorrectAnswer =
    answer === calculate(props.question.a, props.question.b, operator.value);

  if (isCorrectAnswer) {
    selectedAnswer.value?.classList.add("question__answers-item--correct");
  } else {
    selectedAnswer.value?.classList.add("question__answers-item--incorrect");
  }

  setTimeout(() => {
    selectedAnswer.value?.classList.remove(
      "question__answers-item--correct",
      "question__answers-item--incorrect"
    );

    props.handleCheckAnswer(isCorrectAnswer);
  }, 500);
};
</script>

<template>
  <div class="question">
    <div class="question__text">
      Вопрос:
      {{
        mathType === MathType.SUBTRACTION && question.a < question.b
          ? `${question.b} ${operator} ${question.a}`
          : `${question.a} ${operator} ${question.b}`
      }}
      = ?
    </div>

    <div class="question__answers">
      <div
        class="question__answers-item"
        v-for="(shuffledAnswer, index) in shuffledAnswers"
        :key="index"
        @click="checkAnswer(shuffledAnswer, $event.target)"
      >
        {{ shuffledAnswer }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question {
  $root: &;

  &__text {
    font-size: 20px;
    font-weight: bold;
    padding: 1rem 0;
  }

  &__answers {
    padding: 1rem 0;
    display: grid;
    grid-template: repeat(3, 50px) / repeat(3, 50px);
    gap: 10px;
    perspective: 800px;

    &-item {
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
}
</style>
