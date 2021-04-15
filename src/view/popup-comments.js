import {createPopupCommentsListTemplate} from './popup-comments-list';
import {createPopupCommentAddTemplate} from './popup-comment-add';
import {createPopupCommentTemplate} from './popup-comment';

export const createPopupCommentsTemplate = (comments) => {
  const commentsElement = comments.map(createPopupCommentTemplate);
  const commentsList = createPopupCommentsListTemplate(commentsElement);
  const addComment = createPopupCommentAddTemplate();

  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    ${commentsList}

    ${addComment}
  </section>`;
};
