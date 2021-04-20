import Abstract from './abstract';

const createFilmsListLoadingTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>`;
};

export default class FilmsListLoading extends Abstract {
  getTemplate() {
    return createFilmsListLoadingTemplate();
  }
}
