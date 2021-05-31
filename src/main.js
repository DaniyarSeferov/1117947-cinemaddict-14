import UserProfileView from './view/user-profile';
import FooterStatisticsView from './view/footer-statistics';
import StatisticView from './view/statistic';
import {generateComments} from './mock/comment';
import {remove, render, RenderPosition, replace} from './utils/render';
import {getUserRank} from './utils/film';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import Movies from './model/movies';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';
import SiteMenuView from './view/site-menu';
import {MenuItem, UpdateType} from './const';
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
const footerStatisticsView = new FooterStatisticsView();
const filterPresenter = new FilterPresenter(siteMenuComponent.getElement(), filterModel, moviesModel);
const movieListPresenter = new MovieListPresenter(siteMainElement, bodyElement, moviesModel, filterModel, commentsModel, api);

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

render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
render(siteFooterElement, footerStatisticsView, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);

    const userStatistic = generateUserStatistic(movies);
    const userRank = getUserRank(userStatistic.watched.count);

    render(siteHeaderElement, new UserProfileView(userRank), RenderPosition.BEFOREEND);
    render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    replace(new FooterStatisticsView(movies.length), footerStatisticsView);

    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);

    render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
    render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    render(siteFooterElement, new FooterStatisticsView(0), RenderPosition.BEFOREEND);

    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
