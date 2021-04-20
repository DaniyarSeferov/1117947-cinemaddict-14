import PopupCommentsList from './popup-comments-list';
import PopupCommentAdd from './popup-comment-add';
import PopupComment from './popup-comment';
import Abstract from './abstract';

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

export default class PopupComments extends Abstract {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createPopupCommentsTemplate(this._comments);
  }
}
