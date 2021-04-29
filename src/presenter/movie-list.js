import SortMenuView from '../view/sort-menu';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListEmptyView from '../view/films-list-empty';
import FilmsListLoadingView from '../view/films-list-loading';
import ShowMoreButtonView from '../view/show-more-button';
import {remove, render, RenderPosition} from '../utils/render';
import {FILMS_CARD_COUNT} from '../const';
import Movie from './movie';
import {updateItem} from '../utils/common';

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmsCount = FILMS_CARD_COUNT;
    this._filmPresenter = {};

    this._sortMenuComponent = new SortMenuView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListEmptyComponent = new FilmsListEmptyView();
    this._filmsListLoadingComponent = new FilmsListLoadingView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmPresenter = new Movie(this._filmsListContainerElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.film.id] = filmPresenter;
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

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.film.id].init(updatedFilm);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_CARD_COUNT);
    this._renderedFilmsCount += FILMS_CARD_COUNT;

    if (this._renderedFilmsCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
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

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCount = FILMS_CARD_COUNT;
    remove(this._showMoreButtonComponent);
  }
}
