import StatisticRank from './statistic-rank';
import StatisticMenu from './statistic-menu';
import StatisticList from './statistic-list';
import {countUserWatchedFilms, getUserRank} from '../utils/film';
import SmartView from './smart';
import {StatisticFilterType} from '../const';
import {statisticFilter} from '../utils/filter';
import {render, RenderPosition} from '../utils/render';
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

    this.init();
  }

  init() {
    const movies = this._getMovies();
    const statistic = this.getElement();

    render(statistic, new StatisticRank(this._userRank), RenderPosition.BEFOREEND);
    render(statistic, new StatisticMenu(this._getFilters(), this._activeFilter), RenderPosition.BEFOREEND);
    render(statistic, new StatisticList(movies), RenderPosition.BEFOREEND);
    render(statistic, new StatisticChart(movies), RenderPosition.BEFOREEND);
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
}
