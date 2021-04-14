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
