import FilmCardView from '../view/film-card';
import PopupView from '../view/popup';
import {remove, render, RenderPosition, replace} from '../utils/render';

export default class Movie {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._bodyElement = document.querySelector('body');
    this._filmCardComponent = new FilmCardView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._bodyElement.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  _showPopup() {
    this._bodyElement.classList.add('hide-overflow');
    render(this._bodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
  }

  _hidePopup() {
    if (this._bodyElement.contains(this._popupComponent.getElement())) {
      this._bodyElement.removeChild(this._popupComponent.getElement());
    }

    this._popupComponent.removeClosePopupClickHandler();
    this._bodyElement.classList.remove('hide-overflow');
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hidePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopupClick() {
    this._showPopup();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleClosePopupClick() {
    this._hidePopup();
  }
}
