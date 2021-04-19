import PopupCommentsList from './popup-comments-list';
import PopupCommentAdd from './popup-comment-add';
import PopupComment from './popup-comment';
import {createElement} from '../utils';

const createPopupCommentsTemplate = (comments) => {
  const commentsElement = comments.map((comment) => new PopupComment(comment).getTemplate());
  const commentsList = new PopupCommentsList(commentsElement).getTemplate();
  const addComment = new PopupCommentAdd().getTemplate();

  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    ${commentsList}

    ${addComment}
  </section>`;
};

export default class PopupComments {
  constructor(comments) {
    this._element = null;
    this._comments = comments;
  }

  getTemplate() {
    return createPopupCommentsTemplate(this._comments);
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
