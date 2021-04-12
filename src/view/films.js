import {createFilmCardTemplate} from './film-card';
import {createFilmsListExtraTemplate} from './films-list-extra';
import {createFilmsListTemplate} from './films-list';

const FILMS_CARD_COUNT = 5;
const FILMS_CARD_EXTRA_COUNT = 2;

export const createFilmsTemplate = (data) => {
  const films = data.slice(0, FILMS_CARD_COUNT).map(createFilmCardTemplate);
  const filmsExtra = films.slice(0, FILMS_CARD_EXTRA_COUNT);
  const filmsList = createFilmsListTemplate(films);
  const topRated = createFilmsListExtraTemplate('Top rated', filmsExtra);
  const mostCommented = createFilmsListExtraTemplate('Most commented', filmsExtra);

  return `<section class="films">
    ${filmsList}

    ${topRated}

    ${mostCommented}
  </section>`;
};
