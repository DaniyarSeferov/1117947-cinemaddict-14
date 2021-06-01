import Observer from '../utils/observer';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies.slice();
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.film.id === update.film.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        film: Object.assign(
          {},
          movie.film_info,
          {
            id: movie.id,
            age: movie.film_info.age_rating,
            country: movie.film_info.release.release_country,
            originalTitle: movie.film_info.alternative_title,
            genres: movie.film_info.genre,
            rating: movie.film_info.total_rating,
            releaseDate: movie.film_info.release.date !== null ? new Date(movie.film_info.release.date) : movie.film_info.release.date,
          },
        ),
        statistic: Object.assign(
          {},
          movie.user_details,
          {
            watched: movie.user_details.already_watched,
            watchingDate: movie.user_details.watching_date !== null ? new Date(movie.user_details.watching_date) : movie.user_details.watching_date,
          },
        ),
      },
    );

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;
    delete adaptedMovie.id;
    delete adaptedMovie.film.age_rating;
    delete adaptedMovie.film.alternative_title;
    delete adaptedMovie.film.genre;
    delete adaptedMovie.film.total_rating;
    delete adaptedMovie.film.release;
    delete adaptedMovie.statistic.already_watched;
    delete adaptedMovie.statistic.watching_date;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        id: movie.film.id,
        film_info: Object.assign(
          {},
          movie.film,
          {
            age_rating: movie.film.age,
            alternative_title: movie.film.originalTitle,
            genre: movie.film.genres,
            release: {
              date: movie.film.releaseDate instanceof Date ? movie.film.releaseDate.toISOString() : null,
              release_country: movie.film.country,
            },
            total_rating: movie.film.rating,
          },
        ),
        user_details: Object.assign(
          {},
          movie.statistic,
          {
            already_watched: movie.statistic.watched,
            watching_date: movie.statistic.watchingDate instanceof Date ? movie.statistic.watchingDate.toISOString() : null,
          },
        ),
      },
    );

    delete adaptedMovie.film;
    delete adaptedMovie.film_info.id;
    delete adaptedMovie.film_info.age;
    delete adaptedMovie.film_info.country;
    delete adaptedMovie.film_info.originalTitle;
    delete adaptedMovie.film_info.genres;
    delete adaptedMovie.film_info.rating;
    delete adaptedMovie.film_info.releaseDate;
    delete adaptedMovie.user_details.watched;
    delete adaptedMovie.user_details.watchingDate;
    delete adaptedMovie.statistic;

    return adaptedMovie;
  }
}
