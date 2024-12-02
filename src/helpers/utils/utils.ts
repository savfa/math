import { AppRoute } from "../consts/appRoute.ts";
import { MathType } from "../consts/consts.ts";

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
    c: Math.floor(Math.random() * (max - min + 1)) + min,
    d: Math.floor(Math.random() * (max - min + 1)) + min,
  };
};

export const getMathTypeFormat = (mathType: string) => {
  switch (mathType) {
    case MathType.ADDITION:
      return `Сложение`;
    case MathType.SUBTRACTION:
      return `Вычитание`;
    case MathType.MULTIPLICATION:
      return `Умножение`;
    case MathType.COMPARE:
      return `Неравенства`;
    default:
      return ``;
  }
};
