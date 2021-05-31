import Abstract from './abstract';

const createStatisticChartTemplate = () => {
  return `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;
};

export default class StatisticChart extends Abstract {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createStatisticChartTemplate();
  }
}
