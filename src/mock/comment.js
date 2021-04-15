import {generateRandomDate, getRandomArrayItem, getRandomInteger} from '../utils';

const COMMENT_YEAR_MIN = 1990;
const COMMENT_YEAR_MAX = 2021;
const COMMENTS_MIN_COUNT = 0;
const COMMENTS_MAX_COUNT = 5;

const generateEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];
  return getRandomArrayItem(emotions);
};

const generateAuthor = () => {
  const authors = [
    'Tim Macoveev',
    'John Doe',
    'Caridad Adkins',
    'Cassandra Jones',
    'Anastasia Lowder',
    'Helen Reiter',
    'Diane Robinson',
    'Krista Whittemore',
  ];
  return getRandomArrayItem(authors);
};

const generateCommentText = () => {
  const comments = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];
  return getRandomArrayItem(comments);
};

export const generateComment = () => {
  return {
    emotion: generateEmotion(),
    date: generateRandomDate(COMMENT_YEAR_MIN, COMMENT_YEAR_MAX),
    author: generateAuthor(),
    text: generateCommentText(),
  };
};

export const generateComments = () => {
  const randomIndex = getRandomInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT);
  return new Array(randomIndex).fill(null).map(generateComment);
};
