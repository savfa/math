<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  question: { a: number; b: number };
  handleCheckAnswer: any;
}>();

const selectedAnswer = ref(null);

const shuffledAnswers = computed(() => {
  const options = [
    props.question.a * props.question.b,
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
  return options.sort(() => Math.random() - 0.5);
});

const checkAnswer = (answer, element) => {
  selectedAnswer.value = element;
  const isCorrectAnswer = answer === props.question.a * props.question.b;

  if (isCorrectAnswer) {
    selectedAnswer.value.classList.add("question__answers-item--correct");
  } else {
    selectedAnswer.value.classList.add("question__answers-item--incorrect");
  }

  setTimeout(() => {
    selectedAnswer.value.classList.remove(
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
      Вопрос: {{ question.a }} * {{ question.b }} = ?
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
