import {humanizeFilmRuntime} from '../utils/film';
import {FILMS_MOVIE_COUNT} from '../const';
import Abstract from './abstract';

const createStatisticItemTemplate = (name, data) => {
  const description = name === 'watched' ?
    data.count === FILMS_MOVIE_COUNT ? 'movie' : 'movies' : '';
  const text = name === 'totalDuration' ? humanizeFilmRuntime(data.count) : data.count;

  return `<h4 class="statistic__item-title">${data.title}</h4>
  <p class="statistic__item-text">${text} <span class="statistic__item-description">${description}</span></p>`;
};

export default class StatisticItem extends Abstract {
  constructor(name, data) {
    super();
    this._name = name;
    this._data = data;
  }

  getTemplate() {
    return createStatisticItemTemplate(this._name, this._data);
  }
}
