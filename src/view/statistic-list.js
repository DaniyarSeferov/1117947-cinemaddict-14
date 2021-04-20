import Abstract from './abstract';

const createStatisticListTemplate = (items) => {
  const listItems = items.map((item) => `<li class="statistic__text-item">${item}</li>`).join('');

  return `<ul class="statistic__text-list">
    ${listItems}
  </ul>`;
};

export default class StatisticList extends Abstract {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return createStatisticListTemplate(this._items);
  }
}
