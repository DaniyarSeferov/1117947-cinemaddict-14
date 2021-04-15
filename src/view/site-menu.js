export const createSiteMenuTemplate = (filters) => {
  const filtersElement = filters.map((filter) => {
    const activeClass = filter.name === 'all' ? 'main-navigation__item--active' : '';
    const countElement = filter.count ? `<span class="main-navigation__item-count">${filter.count}</span>` : '';
    return `<a href="#${filter.name}" class="main-navigation__item ${activeClass}">${filter.title} ${countElement}</a>`;
  }).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filtersElement}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
