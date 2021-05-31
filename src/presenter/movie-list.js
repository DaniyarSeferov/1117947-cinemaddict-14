import SortMenuView from '../view/sort-menu';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListEmptyView from '../view/films-list-empty';
import FilmsListLoadingView from '../view/films-list-loading';
import ShowMoreButtonView from '../view/show-more-button';
import {remove, render, RenderPosition} from '../utils/render';
import {FILMS_CARD_COUNT, SortType, UpdateType, UserAction} from '../const';
import Movie from './movie';
import FilmsListExtraView from '../view/films-list-extra';
import {getMostCommentedFilms, getTopRatedFilms, sortFilmDate, sortFilmRating} from '../utils/film';
import {filter} from '../utils/filter';

export default class MovieList {
  constructor(boardContainer, popupContainer, moviesModel, filterModel, commentsModel, api) {
    this._boardContainer = boardContainer;
    this._popupContainer = popupContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._isLoading = true;
    this._api = api;

    this._Presenter = {
      main: {},
      topRated: {},
      mostCommented: {},
    };
    this._currentSortType = SortType.DEFAULT;

    this._sortMenuComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListEmptyComponent = new FilmsListEmptyView();
    this._filmsListLoadingComponent = new FilmsListLoadingView();
    this._topRatedComponent = new FilmsListExtraView('Top rated');
    this._mostCommentedComponent = new FilmsListExtraView('Most commented');

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderedMoviesCount = FILMS_CARD_COUNT;

    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');
    this._topRatedContainerElement = this._topRatedComponent.getElement().querySelector('.films-list__container');
    this._mostCommentedContainerElement = this._mostCommentedComponent.getElement().querySelector('.films-list__container');

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderMovieList();
  }

  destroy() {
    this._clearMovieList({resetRenderedTaskCount: true, resetSortType: true});

    remove(this._filmsListComponent);
    remove(this._topRatedComponent);
    remove(this._mostCommentedComponent);
    remove(this._filmsComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortFilmDate);
      case SortType.RATING:
        return filteredMovies.sort(sortFilmRating);
    }

    return filteredMovies;
  }

  _getComments(commentIds) {
    return this._commentsModel.getComments()
      .filter((comment) => commentIds.includes(comment.id));
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList();

    this._renderSort();
    this._renderFilmsList();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _renderSort() {
    if (this._sortMenuComponent !== null) {
      this._sortMenuComponent = null;
    }

    this._sortMenuComponent = new SortMenuView(this._currentSortType);
    this._sortMenuComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsComponent, this._sortMenuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film, container, presenter) {
    const filmPresenter = new Movie(container, this._popupContainer, this._handleViewAction, this._handleModeChange);
    const comments = this._getComments(film.comments);
    filmPresenter.init(film, comments);
    presenter[film.film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._filmsListContainerElement, this._Presenter.main));
  }

  _renderFilmsList() {
    const moviesCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(moviesCount, FILMS_CARD_COUNT));

    this._renderFilms(movies);

    if (moviesCount > FILMS_CARD_COUNT) {
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
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRatedFilmsContainer() {
    render(this._filmsComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRatedFilms() {
    const movies = this._getMovies();
    getTopRatedFilms(movies)
      .forEach((film) => this._renderFilm(film, this._topRatedContainerElement, this._Presenter.topRated));
  }

  _renderMostCommentedFilmsContainer() {
    render(this._filmsComponent, this._mostCommentedComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilms() {
    const movies = this._getMovies();
    getMostCommentedFilms(movies)
      .forEach((film) => this._renderFilm(film, this._mostCommentedContainerElement, this._Presenter.mostCommented));
  }

  _renderMovieList() {
    if (this._isLoading) {
      this._renderFilmsMainContainer();
      this._renderLoading();
      return;
    }

    if (!this._getMovies().length) {
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

  _clearMovieList({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const movieCount = this._getMovies().length;

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

    remove(this._sortMenuComponent);
    remove(this._filmsListEmptyComponent);
    remove(this._showMoreButtonComponent);
    remove(this._filmsListLoadingComponent);

    if (resetRenderedMovieCount) {
      this._renderedMoviesCount = FILMS_CARD_COUNT;
    } else {
      this._renderedMoviesCount = Math.min(movieCount, this._renderedMoviesCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._api.updateMovie(update)
          .then((response) => {
            this._moviesModel.updateMovie(updateType, response);
          });
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update.comment);
        this._moviesModel.updateMovie(updateType, update.movie);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update.commentId);
        this._moviesModel.updateMovie(updateType, update.movie);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        Object.values(this._Presenter).forEach((presenter) => {
          if (presenter[data.film.id]) {
            const comments = this._getComments(data.comments);
            presenter[data.film.id].init(data, comments);
          }
        });
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedMovieCount: true, resetSortType: true});
        this._renderMovieList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._filmsListLoadingComponent);
        this._renderMovieList();
        break;
    }
  }

  _handleShowMoreButtonClick() {
    const moviesCount = this._getMovies().length;
    const newRenderedMoviesCount = Math.min(moviesCount, this._renderedMoviesCount + FILMS_CARD_COUNT);
    const movies = this._getMovies().slice(this._renderedMoviesCount, newRenderedMoviesCount);

    this._renderFilms(movies);
    this._renderedMoviesCount = newRenderedMoviesCount;

    if (this._renderedMoviesCount >= moviesCount) {
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
