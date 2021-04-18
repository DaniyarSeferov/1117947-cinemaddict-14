import FilmCard from './film-card';
import {createFilmsListExtraTemplate} from './films-list-extra';
import {createFilmsListTemplate} from './films-list';
import {FILMS_CARD_COUNT} from '../const';
import {createElement, getMostCommentedFilms, getTopRatedFilms} from '../utils';

const createFilmsTemplate = (data) => {
  const films = data.slice(0, FILMS_CARD_COUNT).map((film) => {
    return new FilmCard(film).getTemplate();
  });
  const filmsTopRated = getTopRatedFilms(data).map((film) => {
    return new FilmCard(film).getTemplate();
  });
  const filmsMostCommented = getMostCommentedFilms(data).map((film) => {
    return new FilmCard(film).getTemplate();
  });
  const filmsList = createFilmsListTemplate(films);
  const topRated = createFilmsListExtraTemplate('Top rated', filmsTopRated);
  const mostCommented = createFilmsListExtraTemplate('Most commented', filmsMostCommented);

  return `<section class="films">
    ${filmsList}

    ${topRated}

    ${mostCommented}
  </section>`;
};

export default class Films {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return createFilmsTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
