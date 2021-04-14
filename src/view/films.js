import {createFilmCardTemplate} from './film-card';
import {createFilmsListExtraTemplate} from './films-list-extra';
import {createFilmsListTemplate} from './films-list';
import {FILMS_CARD_COUNT} from '../const';
import {getMostCommentedFilms, getTopRatedFilms} from '../utils';

export const createFilmsTemplate = (data) => {
  const films = data.slice(0, FILMS_CARD_COUNT).map(createFilmCardTemplate);
  const filmsTopRated = getTopRatedFilms(data).map(createFilmCardTemplate);
  const filmsMostCommented = getMostCommentedFilms(data).map(createFilmCardTemplate);
  const filmsList = createFilmsListTemplate(films);
  const topRated = createFilmsListExtraTemplate('Top rated', filmsTopRated);
  const mostCommented = createFilmsListExtraTemplate('Most commented', filmsMostCommented);

  return `<section class="films">
    ${filmsList}

    ${topRated}

    ${mostCommented}
  </section>`;
};
