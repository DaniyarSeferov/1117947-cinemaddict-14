import {createSiteMenuTemplate} from './view/site-menu';
import {createSortMenuTemplate} from './view/sort-menu';
import {createUserProfileTemplate} from './view/user-profile';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmsTemplate} from './view/films';
import {createPopupTemplate} from './view/popup';
import {createStatisticTemplate} from './view/statistic';
import {generateFilm} from './mock/film';
import {generateComments} from './mock/comment';
import {generateStatistic, generateUserStatistic} from './mock/statistic';
import {generateFilter} from './mock/filter';
import {getUserRank} from './utils';
import {FILMS_CARD_COUNT} from './const';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createFilmCardTemplate} from './view/film-card';

const FILMS_COUNT = 20;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
  statistic: generateStatistic(),
}));
const filters = generateFilter(data);
const userStatistic = generateUserStatistic(data);
const userRank = getUserRank(userStatistic.watched.count);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, createUserProfileTemplate(userRank), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(filters), 'beforeend');
render(siteMainElement, createSortMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(data), 'beforeend');
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(FILMS_COUNT), 'beforeend');
render(siteBodyElement, createPopupTemplate(data[0]), 'beforeend');
render(siteMainElement, createStatisticTemplate(userStatistic), 'beforeend');

const siteFilmsListElement = document.querySelector('.films-list');
const siteFilmsListContainerElement = siteFilmsListElement.querySelector('.films-list__container');

if (data.length > FILMS_CARD_COUNT) {
  let renderedFilmCount = FILMS_CARD_COUNT;

  render(siteFilmsListElement, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    data
      .slice(renderedFilmCount, renderedFilmCount + FILMS_CARD_COUNT)
      .forEach((film) => render(siteFilmsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILMS_CARD_COUNT;

    if (renderedFilmCount >= data.length) {
      showMoreButton.remove();
    }
  });
}
