import Abstract from './abstract';

const createFilmsListEmptyTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`;
};

export default class FilmsListEmpty extends Abstract {
  getTemplate() {
    return createFilmsListEmptyTemplate();
  }
}
