<script setup lang="ts">
import {ref, VueElement, watch} from "vue";
import {MathType} from "../../../helpers/consts/consts.ts";

const props = defineProps<{
  mathType: string;
  question: any;
  handleCheckAnswer: any;
  maxShuffle?: number;
}>();

const isAnswered = defineModel<any>("isAnswered");

const selectedAnswer = ref<VueElement | null>(null);

const clearAnswerColor = () => {
  selectedAnswer.value?.classList.remove(
      "question__answers-item--correct",
      "question__answers-item--incorrect"
  );
}

const checkAnswer = (answer: any, element: any) => {
  selectedAnswer.value = element;
  const isCorrectAnswer = answer === props.question.answer;
  isAnswered.value = true;

  if (isCorrectAnswer) {
    selectedAnswer.value?.classList.add("question__answers-item--correct");
  } else {
    selectedAnswer.value?.classList.add("question__answers-item--incorrect");
  }

  setTimeout(() => {
    props.handleCheckAnswer(isCorrectAnswer);
    //clearAnswerColor();
  }, 500);
};

watch(isAnswered, () => {
  if (!isAnswered.value) {
    clearAnswerColor();
  }
})

</script>

<template>
  <div class="question">
    <div class="question__text">
     {{ question.questionText }}
    </div>

    <div :class="{question__answers: true, measures: props.mathType === MathType.LENGTH_MEASURES}">
      <button
        class="question__answers-item"
        v-for="(answer, index) in question.shuffledAnswers"
        :key="index"
        @click="checkAnswer(answer, $event.target)"
        :disabled="isAnswered"
      >
        {{ answer }}
      </button>
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

    &.measures {
      grid-template-columns: repeat(3, 30%);
      grid-auto-rows: 50px;
    }

    &-item {
      display: flex;
      margin: 0;
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
