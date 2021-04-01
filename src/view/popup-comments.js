import {createPopupCommentsListTemplate} from './popup-comments-list';
import {createPopupCommentAddTemplate} from './popup-comment-add';
import {createPopupCommentTemplate} from './popup-comment';

const POPUP_COMMENTS_COUNT = 4;

export const createPopupCommentsTemplate = () => {
  const comments = new Array(POPUP_COMMENTS_COUNT).fill(null).map(createPopupCommentTemplate);
  const commentsList = createPopupCommentsListTemplate(comments);
  const addComment = createPopupCommentAddTemplate();

  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    ${commentsList}

    ${addComment}
  </section>`;
};
