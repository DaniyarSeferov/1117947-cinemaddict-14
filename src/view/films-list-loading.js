import {createElement} from '../utils';

const createFilmsListLoadingTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>`;
};

export default class FilmsListLoading {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListLoadingTemplate();
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
