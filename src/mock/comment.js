import {generateRandomDate, getRandomArrayItem} from '../utils/common';
import {nanoid} from 'nanoid';

const COMMENT_YEAR_MIN = 1990;
const COMMENT_YEAR_MAX = 2021;
const COMMENTS_COUNT = 20;

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
    id: nanoid(),
    emotion: generateEmotion(),
    date: generateRandomDate(COMMENT_YEAR_MIN, COMMENT_YEAR_MAX),
    author: generateAuthor(),
    text: generateCommentText(),
  };
};

export const generateComments = () => {
  return new Array(COMMENTS_COUNT).fill(null).map(generateComment);
};
