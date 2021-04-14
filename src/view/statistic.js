import {createStatisticRankTemplate} from './statistic-rank';
import {createStatisticMenuTemplate} from './statistic-menu';
import {createStatisticListTemplate} from './statistic-list';
import {createStatisticItemTemplate} from './statistic-item';
import {getUserRank} from '../utils';

export const createStatisticTemplate = (userStatistic) => {
  const userRank = getUserRank(userStatistic.watched.count);
  const statisticItems = Object.entries(userStatistic).map(([name, data]) => createStatisticItemTemplate(name, data));
  const statisticRank = createStatisticRankTemplate(userRank);
  const statisticMenu = createStatisticMenuTemplate();
  const statisticList = createStatisticListTemplate(statisticItems);

  return `<section class="statistic">
    ${statisticRank}

    ${statisticMenu}

    ${statisticList}

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};
