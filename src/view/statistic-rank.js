import {createElement} from '../utils';

const createStatisticRankTemplate = (rank) => {
  return `<p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${rank}</span>
  </p>`;
};

export default class StatisticRank {
  constructor(userRank) {
    this._element = null;
    this._userRank = userRank;
  }

  getTemplate() {
    return createStatisticRankTemplate(this._userRank);
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
