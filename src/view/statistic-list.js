import Abstract from './abstract';
import {FILMS_MOVIE_COUNT} from '../const';
import {humanizeFilmRuntime} from '../utils/film';
import {generateUserStatistic} from '../utils/statistic';

const createItemTemplate = (name, data) => {
  const description = name === 'watched' ?
    data.count === FILMS_MOVIE_COUNT ? 'movie' : 'movies' : '';
  const text = name === 'totalDuration' ? humanizeFilmRuntime(data.count) : data.count;

  return `<h4 class="statistic__item-title">${data.title}</h4>
  <p class="statistic__item-text">${text} <span class="statistic__item-description">${description}</span></p>`;
};

const createStatisticListTemplate = (items) => {
  const listItems = Object.keys(items).map((item) => {
    const listItem = createItemTemplate(item, items[item]);
    return `<li class="statistic__text-item">${listItem}</li>`;
  }).join('');

  return `<ul class="statistic__text-list">
    ${listItems}
  </ul>`;
};

export default class StatisticList extends Abstract {
  constructor(movies) {
    super();
    this._movies = movies;
    this._items = generateUserStatistic(movies);
  }

  getTemplate() {
    return createStatisticListTemplate(this._items);
  }
}
