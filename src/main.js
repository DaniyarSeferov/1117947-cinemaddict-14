import UserProfileView from './view/user-profile';
import FooterStatisticsView from './view/footer-statistics';
import StatisticView from './view/statistic';
import {generateCommentIds, generateFilm} from './mock/film';
import {generateComments} from './mock/comment';
import {generateStatistic} from './mock/statistic';
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

const FILMS_COUNT = 20;

const comments = generateComments();
const movies = new Array(FILMS_COUNT).fill(null).map(() => ({
  film: generateFilm(),
  comments: generateCommentIds(comments),
  statistic: generateStatistic(),
}));

const userStatistic = generateUserStatistic(movies);
const userRank = getUserRank(userStatistic.watched.count);

const moviesModel = new Movies();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const siteMenuComponent = new SiteMenuView();

render(siteHeaderElement, new UserProfileView(userRank), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
render(siteFooterElement, new FooterStatisticsView(FILMS_COUNT), RenderPosition.BEFOREEND);

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

