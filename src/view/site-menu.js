import Abstract from './abstract';

const createSiteMenuItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<a href="#${type}"
      data-type="${type}"
      class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
      ${name}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ''}
    </a>`;
};

const createSiteMenuTemplate = (filters, currentFilterType) => {
  const filtersElement = filters.map((filter) => createSiteMenuItemTemplate(filter, currentFilterType)).join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersElement}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class SiteMenu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType);
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
