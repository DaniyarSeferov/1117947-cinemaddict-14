import Abstract from './abstract';

const createPopupCommentsListTemplate = (comments) => {
  const listItems = comments.map((item) => `<li class="film-details__comment">${item}</li>`).join('');

  return `<ul class="film-details__comments-list">
    ${listItems}
  </ul>`;
};

export default class PopupCommentsList extends Abstract {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createPopupCommentsListTemplate(this._comments);
  }
}
