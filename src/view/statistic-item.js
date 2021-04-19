import {createElement, humanizeFilmRuntime} from '../utils';
import {FILMS_MOVIE_COUNT} from '../const';

const createStatisticItemTemplate = (name, data) => {
  const description = name === 'watched' ?
    data.count === FILMS_MOVIE_COUNT ? 'movie' : 'movies' : '';
  const text = name === 'totalDuration' ? humanizeFilmRuntime(data.count) : data.count;

  return `<h4 class="statistic__item-title">${data.title}</h4>
  <p class="statistic__item-text">${text} <span class="statistic__item-description">${description}</span></p>`;
};

export default class StatisticItem {
  constructor(name, data) {
    this._element = null;
    this._name = name;
    this._data = data;
  }

  getTemplate() {
    return createStatisticItemTemplate(this._name, this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
