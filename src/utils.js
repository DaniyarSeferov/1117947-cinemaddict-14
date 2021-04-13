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

export const humanizeFilmRuntime = (num) => {
  let hours = Math.floor(num / 60);
  hours = hours ? `${hours}h ` : '';
  const minutes = num % 60;
  return `${hours}${minutes}m`;
};

export const humanizeFilmReleaseDate = (releaseDate) => {
  return dayjs(releaseDate).format('D MMMM YYYY');
};

export const humanizeCommentDate = (date) => {
  const now = dayjs();
  date = dayjs(date);
  const dayFromNow = now.diff(date, 'day');
  return dayFromNow > 2 ? date.format('YYYY/MM/DD HH:mm') : date.fromNow();
};
