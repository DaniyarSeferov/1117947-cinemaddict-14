import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.statistic.watchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.statistic.watched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.statistic.favorite),
};
