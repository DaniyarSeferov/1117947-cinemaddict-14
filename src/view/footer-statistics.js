import Abstract from './abstract';

const createFooterStatisticsTemplate = (moviesCount) => {
  return `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`;
};

export default class FooterStatistics extends Abstract {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount || 0;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._moviesCount);
  }
}
