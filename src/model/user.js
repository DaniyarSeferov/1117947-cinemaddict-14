import Observer from '../utils/observer';

export default class User extends Observer {
  constructor() {
    super();
    this._watched = 0;
  }

  setWatched(updateType, watched) {
    this._watched = watched;
    this._notify(updateType, watched);
  }

  getWatched() {
    return this._watched;
  }
}
