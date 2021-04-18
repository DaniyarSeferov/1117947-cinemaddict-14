import FilmCard from './film-card';
import FilmsListExtra from './films-list-extra';
import FilmsList from './films-list';
import {FILMS_CARD_COUNT} from '../const';
import {createElement, getMostCommentedFilms, getTopRatedFilms} from '../utils';

const createFilmsTemplate = (data) => {
  const films = data.slice(0, FILMS_CARD_COUNT).map((film) => new FilmCard(film).getTemplate());
  const filmsTopRated = getTopRatedFilms(data).map((film) => new FilmCard(film).getTemplate());
  const filmsMostCommented = getMostCommentedFilms(data).map((film) => new FilmCard(film).getTemplate());
  const filmsList = new FilmsList(films).getTemplate();
  const topRated = new FilmsListExtra('Top rated', filmsTopRated).getTemplate();
  const mostCommented = new FilmsListExtra('Most commented', filmsMostCommented).getTemplate();

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
