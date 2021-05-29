import UserProfileView from './view/user-profile';
import FooterStatisticsView from './view/footer-statistics';
import StatisticView from './view/statistic';
import {generateCommentIds, generateFilm} from './mock/film';
import {generateComments} from './mock/comment';
import {generateStatistic, generateUserStatistic} from './mock/statistic';
import {render, RenderPosition} from './utils/render';
import {getUserRank} from './utils/film';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import Movies from './model/movies';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';

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

render(siteHeaderElement, new UserProfileView(userRank), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);
const movieListPresenter = new MovieListPresenter(siteMainElement, bodyElement, moviesModel, filterModel, commentsModel);

filterPresenter.init();
movieListPresenter.init();

render(siteFooterElement, new FooterStatisticsView(FILMS_COUNT), RenderPosition.BEFOREEND);
render(siteMainElement, new StatisticView(userStatistic), RenderPosition.BEFOREEND);
