import {createElement} from '../utils';

const createFilmsListTemplate = (films) => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
      ${films.join('')}
    </div>

  </section>`;
};

export default class FilmsList {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createFilmsListTemplate(this._films);
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
