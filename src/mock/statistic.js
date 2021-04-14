import {getRandomInteger} from '../utils';

export const generateStatistic = () => {
  return {
    favorite: Boolean(getRandomInteger(0, 1)),
    watchlist: Boolean(getRandomInteger(0, 1)),
    watched: Boolean(getRandomInteger(0, 1)),
  };
};
