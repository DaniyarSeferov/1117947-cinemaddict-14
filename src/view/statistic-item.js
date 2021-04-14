import {humanizeFilmRuntime} from '../utils';
import {FILMS_MOVIE_COUNT} from '../const';

export const createStatisticItemTemplate = (name, data) => {
  const description = name === 'watched' ?
    data.count === FILMS_MOVIE_COUNT ? 'movie' : 'movies' : '';
  const text = name === 'totalDuration' ? humanizeFilmRuntime(data.count) : data.count;

  return `<h4 class="statistic__item-title">${data.title}</h4>
  <p class="statistic__item-text">${text} <span class="statistic__item-description">${description}</span></p>`;
};
