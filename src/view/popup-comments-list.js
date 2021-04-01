export const createPopupCommentsListTemplate = (comments) => {
  const listItems = comments.map((item) => { return `<li class="film-details__comment">${item}</li>`;});

  return `<ul class="film-details__comments-list">
    ${listItems.join('')}
  </ul>`;
};
