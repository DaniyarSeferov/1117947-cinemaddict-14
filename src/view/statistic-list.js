export const createStatisticListTemplate = (items) => {
  const listItems = items.map((item) => { return `<li class="statistic__text-item">${item}</li>`;}).join('');

  return `<ul class="statistic__text-list">
    ${listItems}
  </ul>`;
};
