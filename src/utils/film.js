import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  COMMENT_DAY_AGO, FILMS_CARD_EXTRA_COUNT,
  USER_RANK_FAN_MIN,
  USER_RANK_MOVIE_BUFF_MIN,
  USER_RANK_NOVICE_MIN
} from '../const';
dayjs.extend(relativeTime);

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
  return dayFromNow > COMMENT_DAY_AGO ? date.format('YYYY/MM/DD HH:mm') : date.fromNow();
};

export const getUserRank = (watched) => {
  let rank = '';
  if (watched >= USER_RANK_MOVIE_BUFF_MIN) {
    rank = 'Movie Buff';
  } else if (watched >= USER_RANK_FAN_MIN) {
    rank = 'Fan';
  } else if (watched >= USER_RANK_NOVICE_MIN) {
    rank = 'Novice';
  }
  return rank;
};

export const countUserWatchedFilms = (films) => {
  return films.filter((film) => film.statistic.watched).length;
};

export const countUserWatchedFilmsDuration = (films) => {
  return films.filter((film) => film.statistic.watched).reduce((accumulator, {film}) => {
    return accumulator + film.runtime;
  }, 0);
};

export const countUserWatchedFilmsTopGenre = (films) => {
  const genres = {};
  films.filter((film) => film.statistic.watched).forEach(({film}) => {
    film.genres.forEach((genre) => {
      if (!Object.prototype.hasOwnProperty.call(genres, genre)) {
        genres[genre] = 0;
      }
      genres[genre]++;
    });
  });

  const genresSorted = Object.entries(genres).sort((genreFirst, genreSecond) => genreSecond[1] - genreFirst[1]);
  return genresSorted[0][0];
};

export const getTopRatedFilms = (films) => {
  const filmsSorted = films.slice().sort((filmFirst, filmSecond) => filmSecond.film.rating - filmFirst.film.rating);
  return filmsSorted.slice(0, FILMS_CARD_EXTRA_COUNT);
};

export const getMostCommentedFilms = (films) => {
  const filmsSorted = films.slice().sort((filmFirst, filmSecond) => filmSecond.comments.length - filmFirst.comments.length);
  return filmsSorted.slice(0, FILMS_CARD_EXTRA_COUNT);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.film.releaseDate, filmB.film.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.film.releaseDate).diff(dayjs(filmA.film.releaseDate));
};

export const sortFilmRating = (filmA, filmB) => {
  return filmB.film.rating - filmA.film.rating;
};
