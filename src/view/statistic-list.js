import {createElement} from '../utils';

const createStatisticListTemplate = (items) => {
  const listItems = items.map((item) => `<li class="statistic__text-item">${item}</li>`).join('');

  return `<ul class="statistic__text-list">
    ${listItems}
  </ul>`;
};

export default class StatisticList {
  constructor(items) {
    this._element = null;
    this._items = items;
  }

  getTemplate() {
    return createStatisticListTemplate(this._items);
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
