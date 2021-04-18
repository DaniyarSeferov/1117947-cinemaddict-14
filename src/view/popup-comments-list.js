import {createElement} from '../utils';

const createPopupCommentsListTemplate = (comments) => {
  const listItems = comments.map((item) => `<li class="film-details__comment">${item}</li>`).join('');

  return `<ul class="film-details__comments-list">
    ${listItems}
  </ul>`;
};

export default class PopupCommentsList {
  constructor(comments) {
    this._element = null;
    this._comments = comments;
  }

  getTemplate() {
    return createPopupCommentsListTemplate(this._comments);
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
