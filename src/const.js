export const COMMENT_DAY_AGO = 2;

export const USER_RANK_NOVICE_MIN = 1;
export const USER_RANK_FAN_MIN = 11;
export const USER_RANK_MOVIE_BUFF_MIN = 21;

export const FILMS_CARD_COUNT = 5;
export const FILMS_CARD_EXTRA_COUNT = 2;
export const FILMS_MOVIE_COUNT = 1;
export const FILM_DESCRIPTION_MAX_LENGTH = 140;

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  UPDATE_MOVIE_WATCHED: 'UPDATE_MOVIE_WATCHED',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const MenuItem = {
  MOVIES: 'MOVIES',
  STATISTICS: 'STATISTICS',
};

export const StatisticFilterType = {
  ALL: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const MovieMode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
