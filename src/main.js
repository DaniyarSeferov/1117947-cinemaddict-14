import SiteMenuView from './view/site-menu';
import UserProfileView from './view/user-profile';
import FooterStatisticsView from './view/footer-statistics';
import StatisticView from './view/statistic';
import {generateFilm} from './mock/film';
import {generateComments} from './mock/comment';
import {generateStatistic, generateUserStatistic} from './mock/statistic';
import {render, RenderPosition} from './utils/render';
import {getUserRank} from './utils/film';
import MovieListPresenter from './presenter/movie-list';
import Movies from './model/movies';
import FilterModel from './model/filter';

const FILMS_COUNT = 20;

const data = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateComments(),
  statistic: generateStatistic(),
}));

const filters = [{
  type: 'all',
  title: 'ALL',
  count: 0,
}];
const userStatistic = generateUserStatistic(data);
const userRank = getUserRank(userStatistic.watched.count);

const moviesModel = new Movies();
moviesModel.setMovies(data);

const filterModel = new FilterModel();

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, new UserProfileView(userRank), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters, 'all'), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement, bodyElement, moviesModel);
movieListPresenter.init();

render(siteFooterElement, new FooterStatisticsView(FILMS_COUNT), RenderPosition.BEFOREEND);
render(siteMainElement, new StatisticView(userStatistic), RenderPosition.BEFOREEND);
