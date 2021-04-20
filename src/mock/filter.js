import {countUserWatchedFilms} from '../utils/film';

const filmToFilterMap = {
  all: () => ({title: 'All movies'}),
  watchlist: (films) => ({
    title: 'Watchlist',
    count: films.filter((film) => film.statistic.watchlist).length,
  }),
  history: (films) => ({
    title: 'History',
    count: countUserWatchedFilms(films),
  }),
  favorites: (films) => ({
    title: 'Favorites',
    count: films.filter((film) => film.statistic.favorite).length,
  }),
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    const data = countFilms(films);
    return {
      name: filterName,
      title: data.title,
      count: data.count,
    };
  });
};
