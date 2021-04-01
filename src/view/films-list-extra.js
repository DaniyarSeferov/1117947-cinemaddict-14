export const createFilmsListExtraTemplate = (title, films) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
      ${films.join('')}
    </div>
  </section>`;
};
