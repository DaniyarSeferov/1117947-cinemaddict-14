import FilmCardView from '../view/film-card';
import PopupView from '../view/popup';
import {remove, render, RenderPosition, replace} from '../utils/render';
import {UserAction, UpdateType} from '../const';
import {nanoid} from 'nanoid';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(filmListContainer, popupContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCommentDelete = this._handleCommentDelete.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;
    const prevState = prevPopupComponent ? prevPopupComponent.getState() : null;

    this._filmCardComponent = new FilmCardView(this._film);
    this._popupComponent = new PopupView(this._film, this._comments, prevState);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleClick('favorite'));
    this._filmCardComponent.setWatchlistClickHandler(this._handleClick('watchlist'));
    this._filmCardComponent.setWatchedClickHandler(this._handleClick('watched'));
    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._popupComponent.setCommentDeleteHandler(this._handleCommentDelete);

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
    this._popupContainer.classList.add('hide-overflow');
    render(this._popupContainer, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.restoreScrollPosition();
    this._popupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._popupComponent.setFavoriteClickHandler(this._handleClick('favorite'));
    this._popupComponent.setWatchlistClickHandler(this._handleClick('watchlist'));
    this._popupComponent.setWatchedClickHandler(this._handleClick('watched'));
    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._popupComponent.setCommentDeleteHandler(this._handleCommentDelete);
    this._mode = Mode.POPUP;
  }

  _hidePopup() {
    if (this._popupContainer.contains(this._popupComponent.getElement())) {
      this._popupContainer.removeChild(this._popupComponent.getElement());
    }

    this._popupComponent.removeClosePopupClickHandler();
    this._popupContainer.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
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
    this._popupComponent = new PopupView(this._film, this._comments);
    this._showPopup();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleClosePopupClick() {
    this._hidePopup();
    remove(this._popupComponent);
  }

  _handleClick(changeKey) {
    return () => {
      const watchingDate = changeKey === 'watched' ?
        !this._film.statistic.watched ? new Date() : null :
        this._film.statistic.watchingDate;

      this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
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
    const commentId = nanoid();
    data.movie.comments.push(commentId);

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        data,
        {
          comment: Object.assign({id: commentId, date: new Date()}, data.comment),
        },
      ),
    );
  }

  _handleCommentDelete(commentId) {
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
  }
}
