import { createMemoryHistory, createRouter } from "vue-router";

import { AppRoute } from "./helpers/consts/appRoute.ts";
import MainPage from "./core/main/pages/MainPage/MainPage.vue";
import TrainingPage from "./core/training/pages/TrainingPage/TrainingPage.vue";
import TestPage from "./core/test/pages/TestPage/TestPage.vue";
import ProgressPage from "./core/progress/pages/ProgressPage/ProgressPage.vue";

const routes = [
  { path: AppRoute.MAIN, component: MainPage },
  { path: AppRoute.TRAINING, component: TrainingPage },
  { path: AppRoute.TEST, component: TestPage },
  { path: AppRoute.PROGRESS, component: ProgressPage },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
