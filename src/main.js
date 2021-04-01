import {createSiteMenuTemplate} from './view/site-menu';
import {createSortMenuTemplate} from './view/sort-menu';
import {createUserProfileTemplate} from './view/user-profile';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmsTemplate} from './view/films';
import {createPopupTemplate} from './view/popup';
import {createStatisticTemplate} from './view/statistic';

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
render(siteMainElement, createFilmsTemplate(), 'beforeend');
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(), 'beforeend');
render(siteBodyElement, createPopupTemplate(), 'beforeend');
render(siteMainElement, createStatisticTemplate(), 'beforeend');
