import SortMenuView from '../view/sort-menu';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListEmptyView from '../view/films-list-empty';
import FilmsListLoadingView from '../view/films-list-loading';
import ShowMoreButtonView from '../view/show-more-button';
import {remove, render, RenderPosition} from '../utils/render';
import {FILMS_CARD_COUNT} from '../const';
import FilmCardView from '../view/film-card';
import PopupView from '../view/popup';

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._sortMenuComponent = new SortMenuView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListEmptyComponent = new FilmsListEmptyView();
    this._filmsListLoadingComponent = new FilmsListLoadingView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._bodyElement = document.querySelector('body');
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmCardComponent = new FilmCardView(film);
    const popupComponent = new PopupView(film);

    const showPopup = () => {
      this._bodyElement.classList.add('hide-overflow');
      render(this._bodyElement, popupComponent, RenderPosition.BEFOREEND);
      document.addEventListener('keydown', onEscKeyDown);
    };

    const hidePopup = () => {
      if (this._bodyElement.contains(popupComponent.getElement())) {
        this._bodyElement.removeChild(popupComponent.getElement());
      }

      popupComponent.removeClosePopupClickHandler();
      this._bodyElement.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        hidePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onFilmCardClick = () => {
      showPopup();
      document.addEventListener('keydown', onEscKeyDown);
      popupComponent.setClosePopupClickHandler(hidePopup);
    };

    filmCardComponent.setOpenPopupClickHandler(onFilmCardClick);

    render(this._filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_CARD_COUNT));

    if (this._boardFilms.length > FILMS_CARD_COUNT) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsMainContainer() {
    render(this._boardContainer, this._filmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsListContainer() {
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._filmsComponent, this._filmsListEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    render(this._filmsComponent, this._filmsListLoadingComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    let renderedFilmCount = FILMS_CARD_COUNT;

    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderedFilmCount, renderedFilmCount + FILMS_CARD_COUNT)
        .forEach((film) => this._renderFilm(film));

      renderedFilmCount += FILMS_CARD_COUNT;

      if (renderedFilmCount >= this._boardFilms.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderBoard() {
    if (!this._boardFilms.length) {
      this._renderFilmsMainContainer();
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderFilmsMainContainer();
    this._renderFilmsListContainer();

    this._renderFilmsList();
  }
}
