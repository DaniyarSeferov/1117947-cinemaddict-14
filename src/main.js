import SiteMenuView from './view/site-menu';
import SortMenuView from './view/sort-menu';
import UserProfileView from './view/user-profile';
import FooterStatisticsView from './view/footer-statistics';
import FilmsView from './view/films';
import PopupView from './view/popup';
import StatisticView from './view/statistic';
import {generateFilm} from './mock/film';
import {generateComments} from './mock/comment';
import {generateStatistic, generateUserStatistic} from './mock/statistic';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './utils/render';
import {
  getMostCommentedFilms,
  getTopRatedFilms,
  getUserRank
} from './utils/film';
import {FILMS_CARD_COUNT} from './const';
import ShowMoreButtonView from './view/show-more-button';
import FilmCardView from './view/film-card';
import FilmsListView from './view/films-list';
import FilmsListExtraView from './view/films-list-extra';
import FilmsListEmptyView from './view/films-list-empty';

const FILMS_COUNT = 20;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
  statistic: generateStatistic(),
}));
const filters = generateFilter(data);
const userStatistic = generateUserStatistic(data);
const userRank = getUserRank(userStatistic.watched.count);

const siteBodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, new UserProfileView(userRank), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatisticsView(FILMS_COUNT), RenderPosition.BEFOREEND);

const renderFilmCard = (filmsListContainer, film) => {
  const filmCardComponent = new FilmCardView(film);
  const popupComponent = new PopupView(film);

  const showPopup = () => {
    siteBodyElement.classList.add('hide-overflow');
    render(siteBodyElement, popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', onEscKeyDown);
  };

  const hidePopup = () => {
    siteBodyElement.removeChild(popupComponent.getElement());
    popupComponent.getElement().querySelector('.film-details__close-btn').removeEventListener('click', hidePopup);
    siteBodyElement.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      hidePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onFilmCardClick = () => {
    showPopup();
    document.addEventListener('keydown', onEscKeyDown);
    popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', hidePopup);
  };

  filmCardComponent.getElement().querySelector('.film-card__title').addEventListener('click', onFilmCardClick);
  filmCardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', onFilmCardClick);
  filmCardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', onFilmCardClick);

  render(filmsListContainer, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilmsContainer = (filmsContainer, data) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView();

  render(filmsContainer, filmsComponent, RenderPosition.BEFOREEND);

  if (!data.length) {
    render(filmsComponent, new FilmsListEmptyView(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
  const filmsListContainer = filmsListComponent.getElement().querySelector('.films-list__container');
  const topRatedComponent = new FilmsListExtraView('Top rated');
  const mostCommentedComponent = new FilmsListExtraView('Most commented');
  const topRatedContainer = topRatedComponent.getElement().querySelector('.films-list__container');
  const mostCommentedContainer = mostCommentedComponent.getElement().querySelector('.films-list__container');

  render(filmsComponent, topRatedComponent, RenderPosition.BEFOREEND);
  render(filmsComponent, mostCommentedComponent, RenderPosition.BEFOREEND);

  data
    .slice(0, Math.min(data.length, FILMS_CARD_COUNT))
    .forEach((film) => renderFilmCard(filmsListContainer, film));

  getTopRatedFilms(data).forEach((film) => renderFilmCard(topRatedContainer, film));
  getMostCommentedFilms(data).forEach((film) => renderFilmCard(mostCommentedContainer, film));

  if (data.length > FILMS_CARD_COUNT) {
    let renderedFilmCount = FILMS_CARD_COUNT;

    render(filmsListComponent, new ShowMoreButtonView(), RenderPosition.BEFOREEND);

    const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      data
        .slice(renderedFilmCount, renderedFilmCount + FILMS_CARD_COUNT)
        .forEach((film) => renderFilmCard(filmsListContainer, film));

      renderedFilmCount += FILMS_CARD_COUNT;

      if (renderedFilmCount >= data.length) {
        showMoreButton.remove();
      }
    });
  }
};

renderFilmsContainer(siteMainElement, data);
render(siteMainElement, new StatisticView(userStatistic), RenderPosition.BEFOREEND);
