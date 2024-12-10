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
  let operator3 = ``;
  const [min, max] = stringRange.split("-").map(Number) || ``;
  const a: number = getRandMinMaxNum(min, max);
  const b: number = getRandMinMaxNum(min, max);
  let c: number, d: number;
  let answer: any = ``;
  const maxAnswer = 100;
  const sortOrder = ["м", "дм", "см", "мм"];
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
      operator =
        operators.length === 2
          ? Math.floor(Math.random() * 2) === 0
            ? `+`
            : `-`
          : operators[0];
      operator2 =
        operators.length === 2
          ? Math.floor(Math.random() * 2) === 0
            ? `+`
            : `-`
          : operators[0];
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
      c = getRandMinMaxNum(min, max);
      d = getRandMinMaxNum(min, max);
      operator =
        operators.length === 2
          ? Math.floor(Math.random() * 2) === 0
            ? `+`
            : `-`
          : operators[0];
      operator2 =
        operators.length === 2
          ? Math.floor(Math.random() * 2) === 0
            ? `+`
            : `-`
          : operators[0];
      operator3 =
        operators.length === 2
          ? Math.floor(Math.random() * 2) === 0
            ? `+`
            : `-`
          : operators[0];

      fromMeasures.sort(
        (a: string, b: string) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
      );

      // todo давать рандом из приходящих параметров selectedRange
      // обработать случаи когда приходит массив fromMeasures, toMeasures,
      // если operators то учитывать правило

      // eslint-disable-next-line no-case-declarations
      const from = fromMeasures
        .map((measure: string, index: number) => {
          const prepareNum =
            (!index && a) ||
            (index === 1 && b) ||
            (index === 2 && c) ||
            (index === 3 && d);
          const prepareOperator =
            (operator && !index && fromMeasures.length > 1 && ` ${operator}`) ||
            (operator2 &&
              index === 1 &&
              fromMeasures.length > 2 &&
              ` ${operator2}`) ||
            (operator3 &&
              index === 2 &&
              fromMeasures.length > 3 &&
              ` ${operator3}`) ||
            ``;

          return `${prepareNum} ${measure}${prepareOperator}`;
        })
        .join(` `);

      // eslint-disable-next-line no-case-declarations
      const to = toMeasures
        .map((measure: string) => {
          return `... ${measure}`;
        })
        .join(` `);

      // вопрос в зависимости от не пустого массива operators
      questionText += `${from} = ${to}`;

      break;
    default:
      break;
  }

  if (
    [MathType.ADDITION, MathType.SUBTRACTION, MathType.MULTIPLICATION].includes(
      mathType
    )
  ) {
    const prepareShuffle: Set<any> = new Set([]);

    while (prepareShuffle.size < 9) {
      prepareShuffle.add(answer);
      prepareShuffle.add(getRandNum(maxAnswer));
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
