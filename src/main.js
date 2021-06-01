import FooterStatisticsView from './view/footer-statistics';
import StatisticView from './view/statistic';
import {remove, render, RenderPosition, replace} from './utils/render';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import UserPresenter from './presenter/user';
import Movies from './model/movies';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';
import SiteMenuView from './view/site-menu';
import {MenuItem, UpdateType} from './const';
import Api from './api';
import User from './model/user';
import {countUserWatchedFilms} from './utils/film';

const AUTHORIZATION = 'Basic sfhhfwrio45jkjgve';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const userModel = new User();
const moviesModel = new Movies();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const siteMenuComponent = new SiteMenuView();
const footerStatisticsView = new FooterStatisticsView();
const userPresenter = new UserPresenter(siteHeaderElement, userModel, moviesModel);
const filterPresenter = new FilterPresenter(siteMenuComponent.getElement(), filterModel, moviesModel);
const movieListPresenter = new MovieListPresenter(siteMainElement, bodyElement, moviesModel, filterModel, commentsModel, api, userModel);

userPresenter.init();
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
    const userWatched = countUserWatchedFilms(movies);
    userModel.setWatched(UpdateType.INIT, userWatched);
    moviesModel.setMovies(UpdateType.INIT, movies);

    render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    replace(new FooterStatisticsView(movies.length), footerStatisticsView);

    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    userModel.setWatched(UpdateType.INIT, 0);
    moviesModel.setMovies(UpdateType.INIT, []);

    render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    render(siteFooterElement, new FooterStatisticsView(0), RenderPosition.BEFOREEND);

    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
