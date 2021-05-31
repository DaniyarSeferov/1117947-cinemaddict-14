import Abstract from './abstract';

const createFilterInput = (filter, activeFilter) => {
  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.type}" value="${filter.type}" ${filter.type === activeFilter ? 'checked' : ''}>
    <label for="statistic-${filter.type}" class="statistic__filters-label">${filter.name}</label>`;
};

const createStatisticMenuTemplate = (filters, activeFilter) => {
  const formFilters = filters.map((filter) => createFilterInput(filter, activeFilter)).join('');

  return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    ${formFilters}
  </form>`;
};

export default class StatisticMenu extends Abstract {
  constructor(filters, activeFilter) {
    super();
    this._filters = filters;
    this._activeFilter = activeFilter;
  }

  getTemplate() {
    return createStatisticMenuTemplate(this._filters, this._activeFilter);
  }
}
