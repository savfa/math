<script setup lang="ts">
import {computed, reactive, ref, toRefs, watch, watchEffect} from "vue";
import Page from "../../../_components/_ui-kit/Page/Page.vue";
import QuestionAnswers from "../../../_components/QuestionAnswers/QuestionAnswers.vue";
import SelectedRange from "../../../training/components/trainingPage/SelectedRange/SelectedRange.vue";
import AnswersResult from "../../../_components/AnswersResult/AnswersResult.vue";
import MathTypeTabs from "../../../_components/MathTypeTabs/MathTypeTabs.vue";
import { getNewQuestion } from "../../../../helpers/utils/utils.ts";
import { MathType } from "../../../../helpers/consts/consts.ts";

const mathType = ref(MathType.ADDITION);
const selectedRange = ref<any>({stringRange: ``, fromMeasures: [], operators: []});

const currentQuestion = ref({});
const correctAnswersCount = ref(0);
const inCorrectAnswersCount = ref(0);

const isStartQuiz = computed(() => {
  switch (mathType.value) {
    case MathType.ADDITION:
    case MathType.SUBTRACTION:
    case MathType.MULTIPLICATION:
    case MathType.COMPARE:
      return !!selectedRange.value.stringRange;
    case MathType.LENGTH_MEASURES:
      return !!selectedRange.value.fromMeasures.length;
    default:
      return false;
  }
})

const startQuiz = () => {
  correctAnswersCount.value = 0;
  inCorrectAnswersCount.value = 0;
  currentQuestion.value = getNewQuestion({ mathType: mathType.value, selectedRange: selectedRange.value });
};

const handleCheckAnswer = (isCorrect: boolean) => {
  if (isCorrect) {
    correctAnswersCount.value++;
  } else {
    inCorrectAnswersCount.value++;
  }

  setTimeout(() => {
    currentQuestion.value = getNewQuestion({ mathType: mathType.value, selectedRange: selectedRange.value });
  }, 500);
};

watchEffect(() => {
  startQuiz();
});
</script>

<template>
  <Page class="training-page">
    <MathTypeTabs
      v-model:mathType="mathType"
      v-model:selectedRange="selectedRange"
    />

    <SelectedRange
      v-model:mathType="mathType"
      v-model:selectedRange="selectedRange"
    />

    <div v-if="isStartQuiz">
      <QuestionAnswers
        :mathType="mathType"
        :handleCheckAnswer="handleCheckAnswer"
        :question="currentQuestion"
      />

      <AnswersResult
        :correctAnswersCount="correctAnswersCount"
        :inCorrectAnswersCount="inCorrectAnswersCount"
      />
    </div>
  </Page>
</template>

<style scoped lang="scss">
.training-page {
  $root: &;
}
</style>
