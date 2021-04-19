import {createElement} from '../utils';

const createFooterStatisticsTemplate = (moviesCount) => {
  return `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`;
};

export default class FooterStatistics {
  constructor(moviesCount) {
    this._element = null;
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._moviesCount);
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
