import {createSiteMenuTemplate} from './view/site-menu';
import {createSortMenuTemplate} from './view/sort-menu';
import {createUserProfileTemplate} from './view/user-profile';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmsTemplate} from './view/films';
import {createPopupTemplate} from './view/popup';
import {createStatisticTemplate} from './view/statistic';
import {generateFilm} from './mock/film';
import {generateComments} from './mock/comment';

const FILMS_COUNT = 20;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
}));

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(data), 'beforeend');
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(FILMS_COUNT), 'beforeend');
render(siteBodyElement, createPopupTemplate(data[0]), 'beforeend');
render(siteMainElement, createStatisticTemplate(), 'beforeend');
