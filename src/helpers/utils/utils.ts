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

export const getRandomElement = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция для перевода мер длины
const convertMeasure = (
  values: number[],
  from: string[],
  to: string[],
  operator: string | undefined
) => {
  const measures = ["м", "дм", "см", "мм"];

  if (to.length === 1) {
    return from.reduce(
      (res: string, next: string, i: number, arr: string[]) => {
        const fromIndex = measures.indexOf(next);
        const toIndex = measures.indexOf(to[0]);
        const degree = toIndex - fromIndex;
        const isMultiply = degree >= 0;
        const factor = Math.pow(10, Math.abs(degree));

        const value = isMultiply ? values[i] * factor : values[i] / factor;

        if (i === arr.length - 1) {
          const updated = +res + (operator === `-` ? -1 : 1) * value;

          return updated + ` ${to[0]}`;
        }

        return (+res + value).toString();
      },
      ``
    );
  } else if (to.length > 1) {
    const { resValue } = to.reduce(
      (res: any, next: string, i: number, arr: string[]) => {
        const fromIndex = measures.indexOf(from[0]);
        const toIndex = measures.indexOf(next);
        const degree = toIndex - fromIndex;
        const isMultiply = degree >= 0;
        const factor = Math.pow(10, Math.abs(degree));

        const value = Math.floor(
          isMultiply ? res.restValue * factor : res.restValue / factor
        );

        res.restValue =
          res.restValue - (isMultiply ? value / factor : value * factor);
        res.resValue += `${value} ${next}`;
        i !== arr.length - 1 ? (res.resValue += ` `) : null;
        return res;
      },
      { restValue: values[0], resValue: `` }
    );

    return resValue;
  } else {
    return ``;
  }
};

export const getNewQuestion = (options: any) => {
  const {
    mathType,
    selectedRange: { stringRange = ``, operators = [] },
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
  let fromMeasures: string[] = [];
  let toMeasures: string[] = [];
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

      if (operator) {
        fromMeasures = [
          getRandomElement(sortOrder),
          getRandomElement(sortOrder),
        ];

        fromMeasures.sort(
          (a: string, b: string) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
        );

        toMeasures = [fromMeasures[1]]; //одна мера, если равны fromMeasures иначе в меньшую (в конце после сортировки)

        // Формирование вопроса с оператором, всегда два в левой части
        questionText += `${a} ${fromMeasures[0]} ${operator} ${b} ${fromMeasures[1]} = ... ${toMeasures[0]}`;
      } else {
        fromMeasures = [
          ...new Set([
            getRandomElement(sortOrder),
            getRandomElement(sortOrder),
          ]),
        ].slice(0, getRandMinMaxNum(1, 2));

        fromMeasures.sort(
          (a: string, b: string) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
        );

        if (fromMeasures.length === 1) {
          let prepareMeasures = sortOrder.filter(
            (it) => it !== fromMeasures[0]
          );

          switch (fromMeasures[0]) {
            case "м":
              prepareMeasures.splice(getRandMinMaxNum(0, 2), 1);
              toMeasures = [prepareMeasures[0]]; // 1 - метры можно перевести только в одну меру
              break;
            case "дм":
              prepareMeasures =
                a / 10 > 1
                  ? ["м", getRandomElement(["см", "мм"])] // 2
                  : ["см"]; // 1 - дециметры можно перевести только в одну меньшую меру
              toMeasures = prepareMeasures; // 2
              break;
            case "см":
              prepareMeasures =
                a / 100 > 1 ? ["м", "см"] : a / 10 > 1 ? ["дм", "см"] : ["мм"]; // 2 || 1
              toMeasures = prepareMeasures; // 2
              break;
            case "мм":
              prepareMeasures =
                a / 10 > 1
                  ? ["см", "мм"] // 2
                  : ["мм"]; // 1

              toMeasures = prepareMeasures;
              break;
            default:
              toMeasures = [`мм`];
              break;
          }
        } else {
          toMeasures = [fromMeasures[1]]; // 1
        }

        toMeasures.sort(
          (a: string, b: string) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
        );

        // Формирование вопроса без оператора, рандомно левая и правая в зависимости от левой
        questionText += `${fromMeasures.map((it: string, ind: number) => (ind ? `${b} ${it}` : `${a} ${it}`)).join(` `)} = ${toMeasures.map((it: string) => `... ${it}`).join(` `)}`;
      }

      answer = convertMeasure([a, b], fromMeasures, toMeasures, operator);

      // фиксим отрицательное значение
      if (answer.includes(`-`)) {
        questionText = `Вопрос: ${b} ${fromMeasures[0]} ${operator} ${a} ${fromMeasures[1]} = ... ${toMeasures[0]}`;
        answer = convertMeasure([b, a], fromMeasures, toMeasures, operator);
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

      if (MathType.LENGTH_MEASURES === mathType) {
        const first = getRandNum(maxAnswer);
        const second = getRandNum(maxAnswer);

        const answer = convertMeasure(
          [first, second],
          fromMeasures,
          toMeasures,
          operator
        );

        const value = answer.includes(`-`)
          ? convertMeasure([second, first], fromMeasures, toMeasures, operator)
          : answer;

        prepareShuffle.add(value);
      } else {
        prepareShuffle.add(getRandNum(maxAnswer));
      }
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
