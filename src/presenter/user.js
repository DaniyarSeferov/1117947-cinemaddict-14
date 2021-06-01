import {render, RenderPosition, replace, remove} from '../utils/render';
import UserProfileView from '../view/user-profile';
import {getUserRank} from '../utils/film';

export default class User {
  constructor(userContainer, userModel, moviesModel) {
    this._userContainer = userContainer;
    this._userModel = userModel;
    this._moviesModel = moviesModel;

    this._userComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._userModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevUserComponent = this._userComponent;
    const userWatched = this._userModel.getWatched();
    const userRank = getUserRank(userWatched);

    this._userComponent = new UserProfileView(userRank);

    if (prevUserComponent === null) {
      render(this._userContainer, this._userComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._userComponent, prevUserComponent);
    remove(prevUserComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
