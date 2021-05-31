import {countUserWatchedFilms, countUserWatchedFilmsDuration, countUserWatchedFilmsTopGenre} from './film';

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
