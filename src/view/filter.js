import Abstract from './abstract';
import {FilterType, MenuItem} from '../const';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  const showCount = type !== FilterType.ALL;

  return `<a href="#${type}"
      data-type="${type}"
      class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
      data-menu-type="${MenuItem.MOVIES}">
      ${name}
      ${showCount  ? `<span class="main-navigation__item-count">${count ? count : 0}</span>` : ''}
    </a>`;
};

const createFilterTemplate = (filters, currentFilterType) => {
  const filtersElement = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<div class="main-navigation__items">
      ${filtersElement}
    </div>`;
};

export default class Filter extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
