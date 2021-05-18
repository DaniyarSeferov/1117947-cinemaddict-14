import PopupComments from './popup-comments';
import {humanizeFilmReleaseDate, humanizeFilmRuntime} from '../utils/film';
import Smart from './smart';

const createPopupTemplate = (data) => {
  const {film, statistic} = data;
  const commentsElement = new PopupComments(data).getTemplate();
  const releaseDate = humanizeFilmReleaseDate(film.releaseDate);
  const runtime = humanizeFilmRuntime(film.runtime);
  const genresTitle = film.genres.length === 1 ? 'Genre' : 'Genres';
  const genres = film.genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(' ');
  const favoriteAttribute = statistic.favorite ? 'checked' : '';
  const watchlistAttribute = statistic.watchlist ? 'checked' : '';
  const watchedAttribute = statistic.watched ? 'checked' : '';

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.poster}" alt="">

          <p class="film-details__age">${film.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.title}</h3>
              <p class="film-details__title-original">Original: ${film.originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genresTitle}</td>
              <td class="film-details__cell">
                ${genres}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${film.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistAttribute}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedAttribute}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteAttribute}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      ${commentsElement}
    </div>
  </form>
</section>`;
};

export default class Popup extends Smart {
  constructor(data, state = null) {
    super();
    this._data = Popup.parseDataToState(data, state);
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._emojiHandler = this._emojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);

    this.restoreHandlers();
  }

  restoreScrollPosition() {
    this.getElement().scrollTop = this._data.state.distanceToTop;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClosePopupClickHandler(this._callback.closePopupClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    const inputEmojiElements = this.getElement().querySelectorAll('.film-details__emoji-item');
    [...inputEmojiElements].forEach((inputElement) => {
      inputElement.addEventListener('change', this._emojiHandler);
    });

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);

    this.getElement()
      .addEventListener('scroll', this._scrollHandler);
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  getState() {
    return Object.assign(
      {},
      this._data.state,
    );
  }

  updateState(update, justDataUpdating) {
    if (!update) {
      return;
    }

    const prevState = this.getState();
    const state = Object.assign(
      {},
      prevState,
      update,
    );

    this.updateData({state: state}, justDataUpdating);
  }

  updateElement() {
    super.updateElement();
    this.restoreScrollPosition();
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Popup.parseStateToData(this._data));
  }

  _emojiHandler(evt) {
    evt.preventDefault();
    if (this._data.state.emoji !== evt.target.value) {
      this.updateState({
        emoji: evt.target.value,
      });
    }
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateState({
      commentDescription: evt.target.value,
    }, true);
  }

  _scrollHandler(evt) {
    evt.preventDefault();
    this.updateState({
      distanceToTop: evt.target.scrollTop,
    }, true);
  }

  setClosePopupClickHandler(callback) {
    this._callback.closePopupClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closePopupClickHandler);
  }

  removeClosePopupClickHandler() {
    this.getElement().querySelector('.film-details__close-btn').removeEventListener('click', this._closePopupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._watchedClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseDataToState(data, state = null) {
    const defaultState = {
      distanceToTop: 0,
      emoji: null,
      commentDescription: '',
    };

    const currentState = state ? state : defaultState;

    return Object.assign(
      {},
      data,
      {
        state: Object.assign(
          {},
          currentState,
        ),
      },
    );
  }

  static parseStateToData(state) {
    const data = Object.assign({}, state);

    delete data.state;

    return data;
  }
}
