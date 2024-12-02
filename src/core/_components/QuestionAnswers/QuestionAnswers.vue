<script setup lang="ts">
import { computed, ref, VueElement } from "vue";
import { MathType } from "../../../helpers/consts/consts.ts";

const props = defineProps<{
  mathType: string;
  question: any;
  handleCheckAnswer: any;
  maxShuffle?: number;
}>();

const selectedAnswer = ref<VueElement | null>(null);
const compareOperator = ref<{ first: string; second: string; }>({ first: `+`, second: `+` });

const getMathTypeConfig = (type: string) => {
  switch (type) {
    case MathType.ADDITION:
      return { maxNum: 100, operator: `+` };
    case MathType.SUBTRACTION:
      return { maxNum: 100, operator: `-` };
    case MathType.MULTIPLICATION:
      return { maxNum: 100, operator: `*` };
    case MathType.COMPARE:
      return { maxNum: 100, operator: `` };
    default:
      return { maxNum: 100, operator: `+` };
  }
};

const maxNum = computed(() => getMathTypeConfig(props.mathType).maxNum);
const operator = computed(() => getMathTypeConfig(props.mathType).operator);

const prepareQuestion = computed(() => {
  switch (props.mathType) {
    case MathType.ADDITION:
    case MathType.MULTIPLICATION:
      return `${props.question.a} ${operator.value} ${props.question.b} = ?`
    case MathType.SUBTRACTION:
      return props.question.a < props.question.b
          ? `${props.question.b} ${operator.value} ${props.question.a} = ?`
          : `${props.question.a} ${operator.value} ${props.question.b} = ?`;
    case MathType.COMPARE:
      // если знак минус и первое меньше - меняем местами, чтобы результат был положительный
      const first = compareOperator.value.first === `-` && props.question.a < props.question.b
          ? `${props.question.b} ${compareOperator.value.first} ${props.question.a}`
          : `${props.question.a} ${compareOperator.value.first} ${props.question.b}`;
      const second = compareOperator.value.second === `-` && props.question.c < props.question.d
          ? `${props.question.d} ${compareOperator.value.second} ${props.question.c}`
          : `${props.question.c} ${compareOperator.value.second} ${props.question.d}`;


      return `${first} ... ${second}`;
    default:
      return ``;
  }
})

const calculate = computed(() => {
  switch (props.mathType) {
    case MathType.ADDITION:
      return props.question.a + props.question.b;
    case MathType.SUBTRACTION:
      return props.question.a > props.question.b
          ? props.question.a - props.question.b
          : props.question.b - props.question.a;
    case MathType.MULTIPLICATION:
      return props.question.a * props.question.b;
    case MathType.COMPARE:
      // если знак минус и первое меньше - меняем местами, чтобы результат был положительный

      const first = compareOperator.value.first === `+` ?
          props.question.a + props.question.b
          : props.question.a < props.question.b
              ? props.question.b - props.question.a
              :  props.question.a - props.question.b;
      const second =  compareOperator.value.second === `+`
          ? props.question.c + props.question.d
          : props.question.c < props.question.d
              ? props.question.d - props.question.c
              : props.question.c - props.question.d;

      return first > second ? `>` : first < second ? `<` : `=`;
    default:
      return 0;
  }
});

const shuffledAnswers = computed(() => {
  const options = new Set([
    calculate.value,
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

  return props.mathType === MathType.COMPARE
      ? [`>`, `<`, `=`]
      :  [...options].sort(() => Math.random() - 0.5);
});

const checkAnswer = (answer: any, element: any) => {
  selectedAnswer.value = element;
  const isCorrectAnswer = answer === calculate.value;

  compareOperator.value = { first: Math.floor(Math.random() * 2) === 0 ? `+` : `-`, second: Math.floor(Math.random() * 2) === 0 ? `+` : `-` };

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
      Вопрос: {{ prepareQuestion }}
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
