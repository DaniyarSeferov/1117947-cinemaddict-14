import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const getRandomArrayItem = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  return items[randomIndex];
};

export const getRandomArrayItems = (items, min, max) => {
  const randomCount = getRandomInteger(min, max);
  const result = [];

  for (let i = 0; i < randomCount; i++) {
    const randomItem = getRandomArrayItem(items);

    if (result.indexOf(randomItem) === -1) {
      result.push(randomItem);
    }
  }

  return result;
};

export const generateRandomDate = (yearMin, yearMax) => {
  const yearMinjs = dayjs().year(yearMin);
  const yearMaxjs = dayjs().year(yearMax);
  return new Date(yearMinjs.valueOf() + Math.random() * (yearMaxjs.valueOf() - yearMinjs.valueOf()));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.film.id === update.film.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const getDistanceToTop = (element) => {
  return window.pageYOffset + element.getBoundingClientRect().top;
};
