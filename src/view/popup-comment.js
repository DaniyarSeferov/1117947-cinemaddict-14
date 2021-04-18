import {createElement, humanizeCommentDate} from '../utils';

const createPopupCommentTemplate = (data) => {
  const date = humanizeCommentDate(data.date);

  return `<span class="film-details__comment-emoji">
    <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-${data.emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${data.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${data.author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>`;
};

export default class PopupComment {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return createPopupCommentTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
