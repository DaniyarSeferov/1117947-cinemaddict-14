import StatisticRank from './statistic-rank';
import StatisticMenu from './statistic-menu';
import StatisticList from './statistic-list';
import {countUserWatchedFilms, getUserRank} from '../utils/film';
import SmartView from './smart';
import {StatisticFilterType} from '../const';
import {statisticFilter} from '../utils/filter';
import {remove, render, RenderPosition} from '../utils/render';
import StatisticChart from './statistic-chart';

const createStatisticTemplate = () => {
  return `<section class="statistic">

  </section>`;
};

export default class Statistic extends SmartView {
  constructor(movies) {
    super();
    this._movies = movies;
    this._activeFilter = StatisticFilterType.ALL;

    const userWatched = countUserWatchedFilms(this._movies);
    this._userRank = getUserRank(userWatched);

    this._menuClickHandler = this._menuClickHandler.bind(this);

    this.init();
  }

  init() {
    const movies = this._getMovies();
    const statistic = this.getElement();

    this._rankComponent = new StatisticRank(this._userRank);
    this._menuComponent = new StatisticMenu(this._getFilters(), this._activeFilter);
    this._listComponent = new StatisticList(movies);
    this._chartComponent = new StatisticChart(movies);

    render(statistic, this._rankComponent, RenderPosition.BEFOREEND);
    render(statistic, this._menuComponent, RenderPosition.BEFOREEND);
    render(statistic, this._listComponent, RenderPosition.BEFOREEND);
    render(statistic, this._chartComponent, RenderPosition.BEFOREEND);

    this._restoreHandlers();
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  _getMovies() {
    return statisticFilter[this._activeFilter](this._movies);
  }

  _getFilters() {
    return [
      {
        type: StatisticFilterType.ALL,
        name: 'All time',
      },
      {
        type: StatisticFilterType.TODAY,
        name: 'Today',
      },
      {
        type: StatisticFilterType.WEEK,
        name: 'Week',
      },
      {
        type: StatisticFilterType.MONTH,
        name: 'Month',
      },
      {
        type: StatisticFilterType.YEAR,
        name: 'Year',
      },
    ];
  }

  _restoreHandlers() {
    this._setMenuClickHandler();
  }

  _setMenuClickHandler() {
    Array.from(this.getElement()
      .querySelectorAll('.statistic__filters-input'))
      .map((element) => element.addEventListener('input', this._menuClickHandler));
  }

  _removeMenuClickHandler() {
    Array.from(this.getElement()
      .querySelectorAll('.statistic__filters-input'))
      .map((element) => element.removeEventListener('input', this._menuClickHandler));
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._activeFilter = evt.target.value;
    this._clear();
    this.init();
  }

  _clear() {
    remove(this._rankComponent);
    remove(this._menuComponent);
    remove(this._listComponent);
    remove(this._chartComponent);
    this._removeMenuClickHandler();
  }
}
