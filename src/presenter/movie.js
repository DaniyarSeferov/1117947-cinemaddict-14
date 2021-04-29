import FilmCardView from '../view/film-card';
import PopupView from '../view/popup';
import {remove, render, RenderPosition, replace} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._bodyElement = document.querySelector('body');
    this._filmCardComponent = new FilmCardView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmCardComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    if (this._mode === Mode.POPUP && prevPopupComponent !== null) {
      this._showPopup();
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode === Mode.POPUP) {
      this._hidePopup();
    }
  }

  _showPopup() {
    this._bodyElement.classList.add('hide-overflow');
    render(this._bodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._mode = Mode.POPUP;
  }

  _hidePopup() {
    if (this._bodyElement.contains(this._popupComponent.getElement())) {
      this._bodyElement.removeChild(this._popupComponent.getElement());
    }

    this._popupComponent.removeClosePopupClickHandler();
    this._bodyElement.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hidePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopupClick() {
    this._changeMode();
    this._showPopup();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleClosePopupClick() {
    this._hidePopup();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          statistic: Object.assign(
            {},
            this._film.statistic,
            {
              favorite: !this._film.statistic.favorite,
            },
          ),
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          statistic: Object.assign(
            {},
            this._film.statistic,
            {
              watchlist: !this._film.statistic.watchlist,
            },
          ),
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          statistic: Object.assign(
            {},
            this._film.statistic,
            {
              watched: !this._film.statistic.watched,
            },
          ),
        },
      ),
    );
  }
}
