import he from 'he';
import {humanizeCommentDate} from '../utils/film';
import Abstract from './abstract';

const createPopupCommentTemplate = (data, state) => {
  const date = humanizeCommentDate(data.date);
  const {isDeleting, deletingCommentId} = state;
  const showDeleting = isDeleting && data.id === deletingCommentId;

  return `<span class="film-details__comment-emoji">
    <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-${data.emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(data.text)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${data.author ? data.author : ''}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete" data-id="${data.id}">${showDeleting ? 'Deleting...' : 'Delete'}</button>
    </p>
  </div>`;
};

export default class PopupComment extends Abstract {
  constructor(data, state) {
    super();
    this._data = data;
    this._state = state;
  }

  getTemplate() {
    return createPopupCommentTemplate(this._data, this._state);
  }
}
