import Abstract from './abstract';
import {MenuItem} from '../const';

const createSiteMenuTemplate = () => {
  return `<nav class="main-navigation">

      <a href="#stats" class="main-navigation__additional" data-menu-type="${MenuItem.STATISTICS}">Stats</a>
    </nav>`;
};

export default class SiteMenu extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    const menuType = evt.target.dataset.menuType;
    let previousActiveMenuItem;

    switch (menuType) {
      case MenuItem.MOVIES:
        previousActiveMenuItem = this.getElement().querySelector('.main-navigation__additional--active');
        if (previousActiveMenuItem) {
          previousActiveMenuItem.classList.remove('main-navigation__additional--active');
        }
        break;
      case MenuItem.STATISTICS:
        previousActiveMenuItem = this.getElement().querySelector('.main-navigation__item--active');
        if (previousActiveMenuItem) {
          previousActiveMenuItem.classList.remove('main-navigation__item--active');
        }
        evt.target.classList.add('main-navigation__additional--active');
        break;
    }

    this._callback.menuClick(menuType);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
