import {createStatisticRankTemplate} from './statistic-rank';
import {createStatisticMenuTemplate} from './statistic-menu';
import {createStatisticListTemplate} from './statistic-list';
import {createStatisticItemTemplate} from './statistic-item';

const STATISTIC_ITEMS_COUNT = 3;

export const createStatisticTemplate = () => {
  const statisticItems = new Array(STATISTIC_ITEMS_COUNT).fill(null).map(createStatisticItemTemplate);
  const statisticRank = createStatisticRankTemplate();
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
