import {FilterType, StatisticFilterType} from '../const';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.statistic.watchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.statistic.watched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.statistic.favorite),
};

const checkDayDifference = (date, period) => {
  const now = dayjs();
  date = dayjs(date);
  return !now.diff(date, period);
};

export const statisticFilter = {
  [StatisticFilterType.ALL]: (movies) => movies,
  [StatisticFilterType.TODAY]: (movies) => movies.filter((movie) => movie.statistic.watched && checkDayDifference(movie.statistic.watching_date, 'day')),
  [StatisticFilterType.WEEK]: (movies) => movies.filter((movie) => movie.statistic.watched && checkDayDifference(movie.statistic.watching_date, 'week')),
  [StatisticFilterType.MONTH]: (movies) => movies.filter((movie) => movie.statistic.watched && checkDayDifference(movie.statistic.watching_date, 'month')),
  [StatisticFilterType.YEAR]: (movies) => movies.filter((movie) => movie.statistic.watched && checkDayDifference(movie.statistic.watching_date, 'year')),
};
