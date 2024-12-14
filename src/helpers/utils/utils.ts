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

const getRandMinMaxNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandNum = (num: number) => Math.floor(Math.random() * num + 1);

const getRandomElement = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция для перевода мер длины
const convertMeasure = (value: number, from: string, to: string) => {
  const measures = ["м", "дм", "см", "мм"];
  const fromIndex = measures.indexOf(from);
  const toIndex = measures.indexOf(to);
  const factor = Math.pow(10, toIndex - fromIndex);
  return value * factor;
};

export const getNewQuestion = (
  options: any
  /*mathType: string,
  selectedRange: any,
  number?: number*/
) => {
  const {
    mathType,
    selectedRange: {
      stringRange = ``,
      fromMeasures = [],
      toMeasures = [],
      operators = [],
    },
  } = options;

  let questionText = `Вопрос: `;
  let operator = ``;
  let operator2 = ``;
  const [min, max] = stringRange.split("-").map(Number) || ``;
  const a: number = getRandMinMaxNum(min, max);
  const b: number = getRandMinMaxNum(min, max);
  let c: number, d: number;
  let answer: any = ``;
  const maxAnswer = 100;
  const sortOrder = ["м", "дм", "см", "мм"];
  const fromMeasure = getRandomElement(fromMeasures);
  let toMeasure = ``;
  let shuffledAnswers = [];

  switch (mathType) {
    case MathType.ADDITION:
      operator = `+`;
      questionText += `${a} ${operator} ${b} = ?`;
      answer = a + b;
      break;
    case MathType.SUBTRACTION:
      operator = `-`;
      questionText += `${a > b ? a : b} ${operator} ${a > b ? b : a} = ?`; // чтобы ответ был не отрицательным
      answer = a > b ? a - b : b - a;
      break;
    case MathType.MULTIPLICATION:
      operator = `*`;
      questionText += `${a} ${operator} ${b} = ?`;
      answer = a * b;
      break;
    case MathType.COMPARE:
      operator = getRandomElement(operators);
      operator2 = getRandomElement(operators);
      c = getRandMinMaxNum(min, max);
      d = getRandMinMaxNum(min, max);
      // eslint-disable-next-line no-case-declarations
      const first = operators.length
        ? operator === `+`
          ? { text: `${a} + ${b}`, answer: a + b }
          : a > b
            ? { text: `${a} - ${b}`, answer: a - b }
            : { text: `${b} - ${a}`, answer: b - a }
        : { text: `${a}`, answer: a }; // если `-` чтобы ответ был не отрицательным
      // eslint-disable-next-line no-case-declarations
      const second = operators.length
        ? operator2 === `+`
          ? { text: `${c} + ${d}`, answer: c + d }
          : c > d
            ? { text: `${c} - ${d}`, answer: c - d }
            : { text: `${d} - ${c}`, answer: d - c }
        : { text: `${b}`, answer: b }; // если `-` чтобы ответ был не отрицательным

      questionText += `${first.text} ... ${second.text}`;
      answer =
        first.answer > second.answer
          ? `>`
          : first.answer < second.answer
            ? `<`
            : `=`;
      break;
    case MathType.LENGTH_MEASURES:
      operator = getRandomElement(operators);

      fromMeasures.sort(
        (a: string, b: string) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
      );

      if (operator) {
        // Генерация второго числа и меры длины для оператора
        const secondMeasure = getRandomElement(fromMeasures);

        // Перевод мер длины и вычисление ответа
        const convertedValue = convertMeasure(a, fromMeasure, "мм");
        const convertedSecondValue = convertMeasure(b, secondMeasure, "мм");
        let result;

        if (operator === "+") {
          result = convertedValue + convertedSecondValue;
        } else if (operator === "-") {
          result = convertedValue - convertedSecondValue;
        }

        // Определение меры длины для ответа
        if (fromMeasure === secondMeasure) {
          toMeasure = fromMeasure;
        } else {
          toMeasure = result % 10 === 0 ? "см" : "мм";
        }

        // Формирование вопроса с оператором
        questionText += `${a} ${fromMeasure} ${operator} ${b} ${secondMeasure} = ... ${toMeasure}`;

        answer = convertMeasure(result, "мм", toMeasure) + toMeasure;
      } else {
        // Определение меры длины для ответа
        if (fromMeasure === "м") {
          toMeasure = "дм";
        } else if (fromMeasure === "дм") {
          toMeasure = "см";
        } else if (fromMeasure === "см") {
          toMeasure = "мм";
        } else if (fromMeasure === "мм") {
          toMeasure = "мм";
        }

        // Формирование вопроса без оператора
        questionText += `${a} ${fromMeasure} = ... ${toMeasure}`;

        // Перевод мер длины и вычисление ответа
        answer = convertMeasure(a, fromMeasure, toMeasure) + toMeasure;
      }

      break;
    default:
      break;
  }

  // возможные варианты ответов
  if (
    [
      MathType.ADDITION,
      MathType.SUBTRACTION,
      MathType.MULTIPLICATION,
      MathType.LENGTH_MEASURES,
    ].includes(mathType)
  ) {
    const prepareShuffle: Set<any> = new Set([]);

    while (prepareShuffle.size < 9) {
      prepareShuffle.add(answer);
      MathType.LENGTH_MEASURES === mathType
        ? prepareShuffle.add(
            convertMeasure(getRandNum(maxAnswer), fromMeasure, toMeasure) +
              toMeasure
          )
        : prepareShuffle.add(getRandNum(maxAnswer));
    }

    const sortShuffledAnswers = [...prepareShuffle];
    sortShuffledAnswers.sort(() => Math.random() - 0.5);
    shuffledAnswers = sortShuffledAnswers;
  }

  if (MathType.COMPARE === mathType) {
    shuffledAnswers = [`>`, `<`, `=`];
  }

  return {
    questionText,
    answer,
    shuffledAnswers,
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
    case MathType.LENGTH_MEASURES:
      return `Меры длины`;
    default:
      return ``;
  }
};
