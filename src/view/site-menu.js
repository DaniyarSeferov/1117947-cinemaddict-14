import {createElement} from '../utils';

const createSiteMenuTemplate = (filters) => {
  const filtersElement = filters.map((filter) => {
    const activeClass = filter.name === 'all' ? 'main-navigation__item--active' : '';
    const countElement = filter.count ? `<span class="main-navigation__item-count">${filter.count}</span>` : '';
    return `<a href="#${filter.name}" class="main-navigation__item ${activeClass}">${filter.title} ${countElement}</a>`;
  }).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filtersElement}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
