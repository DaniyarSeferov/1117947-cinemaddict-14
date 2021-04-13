import {createSiteMenuTemplate} from './view/site-menu';
import {createSortMenuTemplate} from './view/sort-menu';
import {createUserProfileTemplate} from './view/user-profile';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmsTemplate} from './view/films';
import {createPopupTemplate} from './view/popup';
import {createStatisticTemplate} from './view/statistic';
import {generateFilm} from './mock/film';
import {generateComment} from './mock/comment';

const FILMS_COUNT = 20;
const COMMENTS_COUNT = 5;

const comments = new Array(COMMENTS_COUNT).fill(null).map(generateComment);
const films = new Array(FILMS_COUNT).fill(null).map(() => {
  return generateFilm(comments);
});

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
render(siteMainElement, createFilmsTemplate(films), 'beforeend');
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(), 'beforeend');
render(siteBodyElement, createPopupTemplate(films[0], comments), 'beforeend');
render(siteMainElement, createStatisticTemplate(), 'beforeend');
