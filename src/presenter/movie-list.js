import SortMenuView from '../view/sort-menu';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListEmptyView from '../view/films-list-empty';
import FilmsListLoadingView from '../view/films-list-loading';
import ShowMoreButtonView from '../view/show-more-button';
import {remove, render, RenderPosition} from '../utils/render';
import {FILMS_CARD_COUNT, SortType} from '../const';
import Movie from './movie';
import {updateItem} from '../utils/common';
import FilmsListExtraView from '../view/films-list-extra';
import {getMostCommentedFilms, getTopRatedFilms, sortFilmDate, sortFilmRating} from '../utils/film';

export default class MovieList {
  constructor(boardContainer, popupContainer) {
    this._boardContainer = boardContainer;
    this._popupContainer = popupContainer;
    this._renderedFilmsCount = FILMS_CARD_COUNT;
    this._Presenter = {
      main: {},
      topRated: {},
      mostCommented: {},
    };
    this._currentSortType = SortType.DEFAULT;

    this._sortMenuComponent = new SortMenuView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListEmptyComponent = new FilmsListEmptyView();
    this._filmsListLoadingComponent = new FilmsListLoadingView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._topRatedComponent = new FilmsListExtraView('Top rated');
    this._mostCommentedComponent = new FilmsListExtraView('Most commented');

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');
    this._topRatedContainerElement = this._topRatedComponent.getElement().querySelector('.films-list__container');
    this._mostCommentedContainerElement = this._mostCommentedComponent.getElement().querySelector('.films-list__container');

    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortFilmRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsList();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _renderSort() {
    render(this._boardContainer, this._sortMenuComponent, RenderPosition.BEFOREEND);
    this._sortMenuComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container, presenter) {
    const filmPresenter = new Movie(container, this._popupContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    presenter[film.film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, this._filmsListContainerElement, this._Presenter.main));
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
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderTopRatedFilmsContainer() {
    render(this._filmsComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRatedFilms() {
    getTopRatedFilms(this._boardFilms).forEach((film) => this._renderFilm(film, this._topRatedContainerElement, this._Presenter.topRated));
  }

  _renderMostCommentedFilmsContainer() {
    render(this._filmsComponent, this._mostCommentedComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilms() {
    getMostCommentedFilms(this._boardFilms).forEach((film) => this._renderFilm(film, this._mostCommentedContainerElement, this._Presenter.mostCommented));
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
    this._renderTopRatedFilmsContainer();
    this._renderMostCommentedFilmsContainer();

    this._renderFilmsList();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _clearFilmList() {
    Object.values(this._Presenter).forEach((presenters) => {
      Object
        .values(presenters)
        .forEach((presenter) => presenter.destroy());
    });

    this._Presenter = {
      main: {},
      topRated: {},
      mostCommented: {},
    };
    this._renderedFilmsCount = FILMS_CARD_COUNT;
    remove(this._showMoreButtonComponent);
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    Object.values(this._Presenter).forEach((presenters) => {
      if (Object.prototype.hasOwnProperty.call(presenters, updatedFilm.film.id)) {
        presenters[updatedFilm.film.id].init(updatedFilm);
      }
    });
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_CARD_COUNT);
    this._renderedFilmsCount += FILMS_CARD_COUNT;

    if (this._renderedFilmsCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleModeChange() {
    Object.values(this._Presenter).forEach((presenters) => {
      Object
        .values(presenters)
        .forEach((presenter) => presenter.resetView());
    });
  }
}
