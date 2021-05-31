import {
  countUserWatchedFilms,
  countUserWatchedFilmsDuration,
  countUserWatchedFilmsTopGenre
} from '../utils/film';
import {generateRandomDate, getRandomInteger} from '../utils/common';

const WATCHING_DATE_YEAR_MIN = 2000;
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

export const generateUserStatistic = (films) => {
  const userWatchedFilms = countUserWatchedFilms(films);

  return {
    watched: {
      title: 'You watched',
      count: userWatchedFilms,
    },
    totalDuration: {
      title: 'Total duration',
      count: countUserWatchedFilmsDuration(films),
    },
    topGenre: {
      title: 'Top genre',
      count: countUserWatchedFilmsTopGenre(films),
    },
  };
};
