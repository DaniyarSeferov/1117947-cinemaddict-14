import Abstract from './abstract';

const createSortMenuTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="rating">Sort by rating</a></li>
  </ul>`;
};

export default class SortMenu extends Abstract {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortMenuTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    const previousActiveElement = this.getElement().querySelector('.sort__button--active');

    if (evt.target !== previousActiveElement) {
      previousActiveElement.classList.remove('sort__button--active');
      evt.target.classList.add('sort__button--active');
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
