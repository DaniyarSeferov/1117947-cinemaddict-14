import StatisticRank from './statistic-rank';
import StatisticMenu from './statistic-menu';
import StatisticList from './statistic-list';
import StatisticItem from './statistic-item';
import {countUserWatchedFilms, getUserRank} from '../utils/film';
import {generateUserStatistic} from '../mock/statistic';
import SmartView from './smart';
import {StatisticFilterType} from '../const';
import {statisticFilter} from '../utils/filter';

const createStatisticTemplate = (movies, filters, activeFilter, userRank) => {
  const userStatistic = generateUserStatistic(movies);
  const statisticItems = Object.entries(userStatistic).map(([name, data]) => new StatisticItem(name, data).getTemplate());
  const statisticRank = new StatisticRank(userRank).getTemplate();
  const statisticMenu = new StatisticMenu(filters, activeFilter).getTemplate();
  const statisticList = new StatisticList(statisticItems).getTemplate();

  return `<section class="statistic">
    ${statisticRank}

    ${statisticMenu}

    ${statisticList}

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistic extends SmartView {
  constructor(movies) {
    super();
    this._movies = movies;
    this._activeFilter = StatisticFilterType.ALL;

    const userWatched = countUserWatchedFilms(this._movies);
    this._userRank = getUserRank(userWatched);
  }

  getTemplate() {
    return createStatisticTemplate(this._getMovies(), this._getFilters(), this._activeFilter, this._userRank);
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
