import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Abstract from './abstract';

const renderColorsChart = (statisticCtx, labels, values) => {
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticChartTemplate = () => {
  return `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;
};

export default class StatisticChart extends Abstract {
  constructor(movies) {
    super();
    this._movies = movies;

    const data = this._getChartData();
    const labels = Object.keys(data);
    const values = Object.values(data);
    this._chartElement = this.getElement().querySelector('.statistic__chart');
    renderColorsChart(this._chartElement, labels, values);
  }

  getTemplate() {
    return createStatisticChartTemplate();
  }

  _getChartData() {
    const data = {};
    this._movies.forEach((movie) => {
      movie.film.genres.forEach((genre) => {
        if (typeof data[genre] === 'undefined') {
          data[genre] = 0;
        }
        data[genre]++;
      });
    });
    return data;
  }
}
