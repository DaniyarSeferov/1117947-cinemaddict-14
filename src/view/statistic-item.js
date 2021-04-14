import {humanizeFilmRuntime} from '../utils';

export const createStatisticItemTemplate = (name, data) => {
  const description = name === 'watched' ?
    data.count === 1 ? 'movie' : 'movies' : '';
  const text = name === 'totalDuration' ? humanizeFilmRuntime(data.count) : data.count;

  return `<h4 class="statistic__item-title">${data.title}</h4>
  <p class="statistic__item-text">${text} <span class="statistic__item-description">${description}</span></p>`;
};
