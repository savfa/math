<script setup lang="ts">
import Page from "../../../_components/Page/Page.vue";
import { ref, watch } from "vue";
import AppButton from "../../../_components/_ui-kit/AppButton/AppButton.vue";
import { getNewQuestion } from "../../../../helpers/utils/utils.ts";
import QuestionAnswers from "../../../_components/QuestionAnswers/QuestionAnswers.vue";
import AnswersResult from "../../../_components/AnswersResult/AnswersResult.vue";

const isStartTesting = ref(false);
const isFinishedTesting = ref(false);

const currentQuestion = ref<{ num: number; a: number; b: number } | null>(null);
const correctAnswersCount = ref(0);
const inCorrectAnswersCount = ref(0);

const handleStartTesting = () => {
  isStartTesting.value = true;
  isFinishedTesting.value = false;
  correctAnswersCount.value = 0;
  inCorrectAnswersCount.value = 0;
  currentQuestion.value = getNewQuestion(`1-10`);
};

const handleCheckAnswer = (isCorrect) => {
  if (isCorrect) {
    correctAnswersCount.value++;
  } else {
    inCorrectAnswersCount.value++;
  }

  setTimeout(() => {
    currentQuestion.value = getNewQuestion(
      `1-10`,
      currentQuestion.value?.num + 1
    );
  }, 500);
};

watch(currentQuestion, () => {
  if (currentQuestion.value?.num === 16) {
    isFinishedTesting.value = true;
  }
});
</script>

<template>
  <Page class="test-page">
    <div class="test-page__start" v-if="!isStartTesting && !isFinishedTesting">
      <div class="selected-range__text">Давай проверим твои знания!</div>
      <AppButton :handleClick="handleStartTesting"
        >Начать тестирование</AppButton
      >
    </div>

    <div
      class="test-page__progress"
      v-if="isStartTesting && !isFinishedTesting"
    >
      <div>{{ currentQuestion?.num || 1 }} / 15</div>
      <QuestionAnswers
        :handleCheckAnswer="handleCheckAnswer"
        :question="currentQuestion"
      />
    </div>

    <div class="test-page__finished" v-if="isFinishedTesting">
      <AnswersResult
        :correctAnswersCount="correctAnswersCount"
        :inCorrectAnswersCount="inCorrectAnswersCount"
      />

      <AppButton :handleClick="handleStartTesting"
        >Начать тестирование</AppButton
      >
    </div>
  </Page>
</template>

<style scoped lang="scss">
.test-page {
  $root: &;

  font-size: 20px;
  font-weight: bold;

  &__start {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
