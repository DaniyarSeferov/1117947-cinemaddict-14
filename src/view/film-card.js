import {createElement, humanizeFilmRuntime} from '../utils';

const FILM_DESCRIPTION_MAX_LENGTH = 140;

const createFilmCardTemplate = ({film, comments}) => {
  const description = film.description.length > FILM_DESCRIPTION_MAX_LENGTH ?
    `${film.description.slice(0, FILM_DESCRIPTION_MAX_LENGTH - 1)}…` : film.description;
  const runtime = humanizeFilmRuntime(film.runtime);
  const comment = comments.length === 1 ? '1 comment' : `${comments.length} comments`;

  return `<article class="film-card">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${film.releaseDate.getFullYear()}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${film.genres[0]}</span>
    </p>
    <img src="${film.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comment}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
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
