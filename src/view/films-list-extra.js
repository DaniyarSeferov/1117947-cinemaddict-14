import {createElement} from '../utils';

const createFilmsListExtraTemplate = (title, films) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
      ${films.join('')}
    </div>
  </section>`;
};

export default class FilmsListExtra {
  constructor(title, films) {
    this._element = null;
    this._title = title;
    this._films = films;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._title, this._films);
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
