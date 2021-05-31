import {generateRandomDate, getRandomInteger} from '../utils/common';

const WATCHING_DATE_YEAR_MIN = 2020;
const WATCHING_DATE_YEAR_MAX = 2021;

export const generateStatistic = () => {
  const watched = Boolean(getRandomInteger(0, 1));
  return {
    favorite: Boolean(getRandomInteger(0, 1)),
    watchlist: Boolean(getRandomInteger(0, 1)),
    watched: watched,
    watching_date: watched ? generateRandomDate(WATCHING_DATE_YEAR_MIN, WATCHING_DATE_YEAR_MAX) : false,
  };
};
