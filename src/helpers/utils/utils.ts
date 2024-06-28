import { AppRoute } from "../consts/appRoute.ts";

export const getAppRouteName = (route: string) => {
  switch (route) {
    case AppRoute.MAIN:
      return `Главная`;
    case AppRoute.TRAINING:
      return `Тренировка`;
    case AppRoute.TEST:
      return `Тестирование`;
    case AppRoute.PROGRESS:
      return `Прогресс`;
    default:
      return ``;
  }
};

export const getNewQuestion = (
  selectedRangeString: string,
  number?: number
) => {
  const [min, max] = selectedRangeString.split("-").map(Number);
  return {
    num: number || 1,
    a: Math.floor(Math.random() * (max - min + 1)) + min,
    b: Math.floor(Math.random() * (max - min + 1)) + min,
  };
};
