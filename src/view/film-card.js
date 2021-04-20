import {humanizeFilmRuntime} from '../utils/film';
import {FILM_DESCRIPTION_MAX_LENGTH} from '../const';
import Abstract from './abstract';

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

export default class FilmCard extends Abstract {
  constructor(data) {
    super();
    this._data = data;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.openPopupClick();
  }

  setOpenPopupClickHandler(callback) {
    this._callback.openPopupClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openPopupClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openPopupClickHandler);
  }
}
