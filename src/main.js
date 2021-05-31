import UserProfileView from './view/user-profile';
import FooterStatisticsView from './view/footer-statistics';
import StatisticView from './view/statistic';
import {generateComments} from './mock/comment';
import {remove, render, RenderPosition} from './utils/render';
import {getUserRank} from './utils/film';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import Movies from './model/movies';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';
import SiteMenuView from './view/site-menu';
import {MenuItem} from './const';
import {generateUserStatistic} from './utils/statistic';
import Api from './api';

const AUTHORIZATION = 'Basic sfhhfwrio45jkjgve';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const comments = generateComments();


const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new Movies();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const siteMenuComponent = new SiteMenuView();

const filterPresenter = new FilterPresenter(siteMenuComponent.getElement(), filterModel, moviesModel);
const movieListPresenter = new MovieListPresenter(siteMainElement, bodyElement, moviesModel, filterModel, commentsModel);

filterPresenter.init();
movieListPresenter.init();

let statisticsComponent = null;
let previousMenuItem = MenuItem.MOVIES;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.MOVIES:
      if (previousMenuItem !== menuItem) {
        movieListPresenter.init();
      }
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      movieListPresenter.destroy();
      statisticsComponent = new StatisticView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
  previousMenuItem = menuItem;
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

api.getMovies().then((movies) => {
  moviesModel.setMovies(movies);

  const userStatistic = generateUserStatistic(movies);
  const userRank = getUserRank(userStatistic.watched.count);

  render(siteHeaderElement, new UserProfileView(userRank), RenderPosition.BEFOREEND);
  render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  render(siteFooterElement, new FooterStatisticsView(movies.length), RenderPosition.BEFOREEND);
});
