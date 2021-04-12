import {generateRandomDate, getRandomArrayItem} from '../utils';

const COMMENT_YEAR_MIN = 1990;
const COMMENT_YEAR_MAX = 2021;

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
