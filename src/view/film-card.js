import {humanizeFilmRuntime} from '../utils';

const FILM_DESCRIPTION_MAX_LENGTH = 140;

export const createFilmCardTemplate = (data) => {
  const description = data.description.length > FILM_DESCRIPTION_MAX_LENGTH ?
    `${data.description.slice(0, FILM_DESCRIPTION_MAX_LENGTH - 1)}…` : data.description;
  const runtime = humanizeFilmRuntime(data.runtime);
  const comment = data.comments.length === 1 ? '1 comment' : `${data.comments.length} comments`;

  return `<article class="film-card">
    <h3 class="film-card__title">${data.title}</h3>
    <p class="film-card__rating">${data.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${data.releaseDate.getFullYear()}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${data.genres[0]}</span>
    </p>
    <img src="${data.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comment}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
