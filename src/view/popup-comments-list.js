export const createPopupCommentsListTemplate = (comments) => {
  const listItems = comments.map((item) => `<li class="film-details__comment">${item}</li>`).join('');

  return `<ul class="film-details__comments-list">
    ${listItems}
  </ul>`;
};
