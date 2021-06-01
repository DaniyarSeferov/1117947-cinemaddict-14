import FilmCardView from '../view/film-card';
import PopupView from '../view/popup';
import {remove, render, RenderPosition, replace} from '../utils/render';
import {UserAction, UpdateType, FilterType, movieMode} from '../const';

export default class Movie {
  constructor(filmListContainer, popupContainer, changeData, changeMode, api, commentsModel, filterModel) {
    this._filmListContainer = filmListContainer;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = movieMode.DEFAULT;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCommentDelete = this._handleCommentDelete.bind(this);
  }

  init(film, comments, mode) {
    this._film = film;
    this._comments = comments;
    this._mode = mode;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(this._film);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleClick('favorite'));
    this._filmCardComponent.setWatchlistClickHandler(this._handleClick('watchlist'));
    this._filmCardComponent.setWatchedClickHandler(this._handleClick('watched'));

    if (prevFilmCardComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);

      if (this._mode === movieMode.POPUP) {
        this._initPopup();
      }
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    if (this._mode === movieMode.POPUP) {
      this._initPopup();
    }

    remove(prevFilmCardComponent);
  }

  _initPopup() {
    const prevPopupComponent = this._popupComponent;
    const prevState = prevPopupComponent ? prevPopupComponent.getState() : null;
    this._popupComponent = new PopupView(this._film, this._comments, prevState);

    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._popupComponent.setCommentDeleteHandler(this._handleCommentDelete);
    this._popupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._popupComponent.setFavoriteClickHandler(this._handleClick('favorite'));
    this._popupComponent.setWatchlistClickHandler(this._handleClick('watchlist'));
    this._popupComponent.setWatchedClickHandler(this._handleClick('watched'));
    this._mode = movieMode.POPUP;

    if (prevPopupComponent === null) {
      this._popupContainer.classList.add('hide-overflow');
      render(this._popupContainer, this._popupComponent, RenderPosition.BEFOREEND);
      this._popupComponent.restoreScrollPosition();
      return;
    }

    replace(this._popupComponent, prevPopupComponent);
    this._popupComponent.restoreScrollPosition();
    remove(prevPopupComponent);
  }

  getMode() {
    return this._mode;
  }

  destroy() {
    this._hidePopup();
    remove(this._filmCardComponent);
  }

  resetView() {
    if (this._mode === movieMode.POPUP) {
      this._hidePopup();
    }
  }

  _hidePopup() {
    if (this._popupComponent === null) {
      return;
    }

    remove(this._popupComponent);

    this._popupComponent.removeFormSubmitHandler();
    this._popupComponent.removeCommentDeleteHandler();
    this._popupComponent.removeClosePopupClickHandler();
    this._popupComponent.removeFavoriteClickHandler();
    this._popupComponent.removeWatchlistClickHandler();
    this._popupComponent.removeWatchedClickHandler();

    this._popupContainer.classList.remove('hide-overflow');
    this._mode = movieMode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hidePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
      remove(this._popupComponent);
    }
  }

  _handleOpenPopupClick() {
    this._changeMode();

    this._api.getComments(this._film.film.id)
      .then((response) => {
        this._commentsModel.setComments(response);
        this._comments = this._commentsModel.getComments();
        this._initPopup();
        document.addEventListener('keydown', this._escKeyDownHandler);
      })
      .catch(() => {
        this._initPopup();
        document.addEventListener('keydown', this._escKeyDownHandler);
      });
  }

  _handleClosePopupClick() {
    this._hidePopup();
    remove(this._popupComponent);
  }

  _getUpdateType(changeKey, filter) {
    const isWatchlist = changeKey === 'watchlist' && filter === FilterType.WATCHLIST;
    const isWatched = changeKey === 'watched' && filter === FilterType.HISTORY;
    const isFavorite = changeKey === 'favorite' && filter === FilterType.FAVORITES;

    return isWatchlist || isWatched || isFavorite ? UpdateType.MINOR : UpdateType.PATCH;
  }

  _handleClick(changeKey) {
    return () => {
      const watchingDate = changeKey === 'watched' ?
        !this._film.statistic.watched ? new Date() : null :
        this._film.statistic.watchingDate;
      const action = changeKey === 'watched' ? UserAction.UPDATE_MOVIE_WATCHED : UserAction.UPDATE_MOVIE;
      const filter = this._filterModel.getFilter();
      const updateType = this._getUpdateType(changeKey, filter);

      this._changeData(
        action,
        updateType,
        Object.assign(
          {},
          this._film,
          {
            statistic: Object.assign(
              {},
              this._film.statistic,
              {
                [changeKey]: !this._film.statistic[changeKey],
                'watchingDate': watchingDate,
              },
            ),
          },
        ),
      );
    };
  }

  _handleFormSubmit(data) {
    this._popupComponent.setSaving();
    this._api.addComment(data.comment, data.movie.film.id)
      .then((response) => {
        this._popupComponent.setSaved();
        this._changeData(
          UserAction.ADD_COMMENT,
          UpdateType.PATCH,
          response,
        );
      })
      .catch(() => {
        this._popupComponent.setAborting();
      });
  }

  _handleCommentDelete(commentId) {
    this._popupComponent.setDeleting(commentId);
    this._api.deleteComment(commentId)
      .then(() => {
        const movie = Object.assign(
          this._film,
          {
            comments: this._film.comments.filter((comment) => comment !== commentId),
          },
        );

        this._changeData(
          UserAction.DELETE_COMMENT,
          UpdateType.PATCH,
          Object.assign(
            {commentId: commentId},
            {movie: movie},
          ),
        );
      })
      .catch(() => {
        this._popupComponent.setAborting();
      });
  }
}
