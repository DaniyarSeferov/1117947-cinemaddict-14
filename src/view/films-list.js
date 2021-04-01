import {createShowMoreButtonTemplate} from './show-more-button';

export const createFilmsListTemplate = (films) => {
  const showMore = createShowMoreButtonTemplate();

  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
      ${films.join('')}
    </div>

    ${showMore}
  </section>`;
};
