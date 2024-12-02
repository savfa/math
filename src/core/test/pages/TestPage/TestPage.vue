<script setup lang="ts">
import Page from "../../../_components/_ui-kit/Page/Page.vue";
import {ref, watch, inject, computed} from "vue";
import AppButton from "../../../_components/_ui-kit/AppButton/AppButton.vue";
import { getNewQuestion } from "../../../../helpers/utils/utils.ts";
import QuestionAnswers from "../../../_components/QuestionAnswers/QuestionAnswers.vue";
import AnswersResult from "../../../_components/AnswersResult/AnswersResult.vue";
import MathTypeTabs from "../../../_components/MathTypeTabs/MathTypeTabs.vue";
import { MathType } from "../../../../helpers/consts/consts.ts";
import TimerTime from "../../../_components/TimerTime.vue";
import {
  LOGS_PER_PAGE,
  LogsOperation,
} from "../../../../helpers/operations/logsOperation.ts";

const mathType = ref(MathType.ADDITION);
const isStartTesting = ref(false);
const isFinishedTesting = ref(false);
const timeString = ref(``);
const fieldName = ref(`Катя`);
const currentQuestion = ref<{ num: number; a: number; b: number } | null>(null);
const correctAnswersCount = ref(0);
const inCorrectAnswersCount = ref(0);

const prepareQuestionsTypeRange = computed(() => {
  switch (mathType.value) {
    case MathType.ADDITION:
      return `1-50`;
    case MathType.SUBTRACTION:
      return `1-100`;
    case MathType.MULTIPLICATION:
      return `1-10`;
    case MathType.COMPARE:
      return `1-50`;

    default:
      return `1-10`;
  }
});

const handleStartTesting = () => {
  isStartTesting.value = true;
  isFinishedTesting.value = false;
  timeString.value = ``;
  correctAnswersCount.value = 0;
  inCorrectAnswersCount.value = 0;
  currentQuestion.value = getNewQuestion(prepareQuestionsTypeRange.value);
};

const handleCheckAnswer = (isCorrect: boolean) => {
  if (isCorrect) {
    correctAnswersCount.value++;
  } else {
    inCorrectAnswersCount.value++;
  }

  setTimeout(() => {
    currentQuestion.value = getNewQuestion(
        prepareQuestionsTypeRange.value,
      (currentQuestion.value?.num || 1) + 1
    );
  }, 500);
};

const progressLogs = inject<any>("progressLogs");

watch(currentQuestion, () => {
  if (currentQuestion.value?.num === 16) {
    isStartTesting.value = false;
    isFinishedTesting.value = true;

    LogsOperation.createLog(
      {
        name: fieldName.value,
        mathType: mathType.value,
        inCorrectAnswersCount: inCorrectAnswersCount.value,
        timeString: timeString.value,
      },
      (log: any) => {
        progressLogs.value = {
          ...progressLogs.value,
          logs: [log, ...progressLogs.value.logs].slice(0, LOGS_PER_PAGE),
          links: {
            ...progressLogs.value.links,
            objectsCount: (progressLogs.value.links.objectsCount || 0) + 1,
          },
        };
      }
    );
  }
});
</script>

<template>
  <Page class="test-page">
    <div class="test-page__content">
      <template v-if="!isStartTesting && !isFinishedTesting">
        <div class="selected-range__text">Давай проверим твои знания?</div>
      </template>

      <template
        v-if="(!isStartTesting && !isFinishedTesting) || isFinishedTesting"
      >
        <div class="test-page__field">
          <label for="name" class="test-page__field-label">Ваше имя: </label>
          <input
            type="text"
            id="name"
            name="name"
            class="test-page__field-input"
            v-model="fieldName"
          />
        </div>

        <MathTypeTabs v-model:mathType="mathType" />

        <template v-if="isFinishedTesting">
          <AnswersResult
            :correctAnswersCount="correctAnswersCount"
            :inCorrectAnswersCount="inCorrectAnswersCount"
          />
        </template>
        <AppButton isGlowOnHover :handleClick="handleStartTesting"
          >Начать тестирование</AppButton
        >
      </template>

      <div
        class="test-page__progress"
        v-if="isStartTesting && !isFinishedTesting"
      >
        <div class="test-page__progress-info">
          <div>{{ currentQuestion?.num || 1 }} / 15</div>
          <TimerTime
            :isStartTimer="isStartTesting"
            v-model:timeString="timeString"
          />
        </div>

        <QuestionAnswers
          :mathType="mathType"
          :handleCheckAnswer="handleCheckAnswer"
          :question="currentQuestion"
        />
      </div>
    </div>
  </Page>
</template>

<style scoped lang="scss">
@import "../../../../common/styles/dependencies";

.test-page {
  $root: &;

  font-size: 20px;
  font-weight: bold;

  &__field {
    display: flex;
    align-items: center;
    padding: 1rem 0;

    &-label {
      font-size: 18px;
      font-weight: bold;
      margin-right: 10px;
    }

    &-input {
      max-width: 300px;
      height: 40px;
      padding: 0 10px;
      font-size: 16px;
      border: 2px solid $color-velvet-primary;
      border-radius: 50px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: $color-velvet-tertiary;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  &__progress {
    &-info {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
