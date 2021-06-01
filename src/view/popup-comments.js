import PopupCommentsList from './popup-comments-list';
import PopupCommentAdd from './popup-comment-add';
import PopupComment from './popup-comment';
import Abstract from './abstract';

const createPopupCommentsTemplate = (comments, state) => {
  const commentsElement = comments.map((comment) => new PopupComment(comment, state).getTemplate());
  const commentsList = new PopupCommentsList(commentsElement).getTemplate();
  const addComment = new PopupCommentAdd(state).getTemplate();

  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    ${commentsList}

    ${addComment}
  </section>`;
};

export default class PopupComments extends Abstract {
  constructor(comments, state) {
    super();
    this._comments = comments;
    this._state = state;
  }

  getTemplate() {
    return createPopupCommentsTemplate(this._comments, this._state);
  }
}
