import SiteMenu from './view/site-menu';
import SortMenu from './view/sort-menu';
import UserProfile from './view/user-profile';
import FooterStatistics from './view/footer-statistics';
import Films from './view/films';
import Popup from './view/popup';
import Statistic from './view/statistic';
import {generateFilm} from './mock/film';
import {generateComments} from './mock/comment';
import {generateStatistic, generateUserStatistic} from './mock/statistic';
import {generateFilter} from './mock/filter';
import {getUserRank, renderElement, RenderPosition, renderTemplate} from './utils';
import {FILMS_CARD_COUNT} from './const';
import ShowMoreButton from './view/show-more-button';
import FilmCard from './view/film-card';

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

renderElement(siteHeaderElement, new UserProfile(userRank).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortMenu().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Films(data).getElement(), RenderPosition.BEFOREEND);
renderElement(siteFooterElement, new FooterStatistics(FILMS_COUNT).getElement(), RenderPosition.BEFOREEND);
renderElement(siteBodyElement, new Popup(data[0]).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Statistic(userStatistic).getElement(), RenderPosition.BEFOREEND);

const siteFilmsListElement = document.querySelector('.films-list');
const siteFilmsListContainerElement = siteFilmsListElement.querySelector('.films-list__container');

if (data.length > FILMS_CARD_COUNT) {
  let renderedFilmCount = FILMS_CARD_COUNT;

  renderElement(siteFilmsListElement, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    data
      .slice(renderedFilmCount, renderedFilmCount + FILMS_CARD_COUNT)
      .forEach((film) => renderTemplate(siteFilmsListContainerElement, new FilmCard(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += FILMS_CARD_COUNT;

    if (renderedFilmCount >= data.length) {
      showMoreButton.remove();
    }
  });
}
