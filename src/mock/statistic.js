import {
  countUserWatchedFilms,
  countUserWatchedFilmsDuration,
  countUserWatchedFilmsTopGenre,
  getRandomInteger
} from '../utils';

export const generateStatistic = () => {
  return {
    favorite: Boolean(getRandomInteger(0, 1)),
    watchlist: Boolean(getRandomInteger(0, 1)),
    watched: Boolean(getRandomInteger(0, 1)),
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
