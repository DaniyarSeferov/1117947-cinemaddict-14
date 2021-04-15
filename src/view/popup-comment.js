import {humanizeCommentDate} from '../utils';

export const createPopupCommentTemplate = (data) => {
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
