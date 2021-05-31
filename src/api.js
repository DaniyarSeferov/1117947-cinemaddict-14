import MovieModel from './model/movies';
import CommentsModel from './model/comments';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: 'movies'})
      .then(Api.toJSON)
      .then((movies) => movies.map(MovieModel.adaptToClient));
  }

  updateMovie(movie) {
    return this._load({
      url: `movies/${movie.film.id}`,
      method: Method.PUT,
      body: JSON.stringify(MovieModel.adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(MovieModel.adaptToClient);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  addComment(comment, movieId) {
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(({comments, movie}) => {
        const adaptedComments = comments.map(CommentsModel.adaptToClient);
        const adaptedMovie = MovieModel.adaptToClient(movie);
        return {
          comments: adaptedComments,
          movie: adaptedMovie,
        };
      });
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
