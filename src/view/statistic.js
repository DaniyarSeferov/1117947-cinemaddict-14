import StatisticRank from './statistic-rank';
import StatisticMenu from './statistic-menu';
import StatisticList from './statistic-list';
import StatisticItem from './statistic-item';
import {getUserRank} from '../utils/film';
import Abstract from './abstract';
import {generateUserStatistic} from '../mock/statistic';

const createStatisticTemplate = (movies) => {
  const userStatistic = generateUserStatistic(movies);
  const userRank = getUserRank(userStatistic.watched.count);
  const statisticItems = Object.entries(userStatistic).map(([name, data]) => new StatisticItem(name, data).getTemplate());
  const statisticRank = new StatisticRank(userRank).getTemplate();
  const statisticMenu = new StatisticMenu().getTemplate();
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

export default class Statistic extends Abstract {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createStatisticTemplate(this._movies);
  }
}
