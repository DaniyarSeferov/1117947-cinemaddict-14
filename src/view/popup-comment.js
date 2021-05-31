import he from 'he';
import {humanizeCommentDate} from '../utils/film';
import Abstract from './abstract';

const createPopupCommentTemplate = (data) => {
  const date = humanizeCommentDate(data.date);

  return `<span class="film-details__comment-emoji">
    <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-${data.emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(data.text)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${data.author ? data.author : ''}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete" data-id="${data.id}">Delete</button>
    </p>
  </div>`;
};

export default class PopupComment extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createPopupCommentTemplate(this._data);
  }
}
