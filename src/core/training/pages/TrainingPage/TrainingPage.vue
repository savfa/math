<script setup lang="ts">
import { ref, watch } from "vue";
import Page from "../../../_components/Page/Page.vue";
import QuestionAnswers from "../../../_components/QuestionAnswers/QuestionAnswers.vue";
import SelectedRange from "../../../training/components/trainingPage/SelectedRange/SelectedRange.vue";
import AnswersResult from "../../../_components/AnswersResult/AnswersResult.vue";
import { getNewQuestion } from "../../../../helpers/utils/utils.ts";

const selectedRange = ref<any>(``);

const currentQuestion = ref({});
const correctAnswersCount = ref(0);
const inCorrectAnswersCount = ref(0);

const startQuiz = () => {
  correctAnswersCount.value = 0;
  inCorrectAnswersCount.value = 0;
  currentQuestion.value = getNewQuestion(selectedRange.value);
};

const handleCheckAnswer = (isCorrect) => {
  if (isCorrect) {
    correctAnswersCount.value++;
  } else {
    inCorrectAnswersCount.value++;
  }

  setTimeout(() => {
    currentQuestion.value = getNewQuestion(selectedRange.value);
  }, 500);
};

watch(selectedRange, () => {
  startQuiz();
});
</script>

<template>
  <Page class="training-page">
    <SelectedRange
      :selectedRange="selectedRange"
      @setSelectedRange="selectedRange = $event"
    />

    <div v-if="selectedRange">
      <QuestionAnswers
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
