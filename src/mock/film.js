import {generateRandomDate, getRandom, getRandomArrayItem, getRandomArrayItems, getRandomInteger} from '../utils';

const FILM_DESCRIPTION_MIN_COUNT = 1;
const FILM_DESCRIPTION_MAX_COUNT = 5;
const FILM_RATING_MIN = 1;
const FILM_RATING_MAX = 9;
const FILM_YEAR_MIN = 1929;
const FILM_YEAR_MAX = 1964;
const FILM_GENRES_MIN = 1;
const FILM_GENRES_MAX = 7;
const FILM_WRITERS_MIN = 3;
const FILM_WRITERS_MAX = 7;
const FILM_ACTORS_MIN = 3;
const FILM_ACTORS_MAX = 7;
const FILM_RUNTIME_MINUTES_MIN = 16;
const FILM_RUNTIME_MINUTES_MAX = 80;

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other',
  ];

  return getRandomArrayItem(titles);
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const filmDescriptionStrings = getRandomArrayItems(descriptions, FILM_DESCRIPTION_MIN_COUNT, FILM_DESCRIPTION_MAX_COUNT);

  return filmDescriptionStrings.join(' ');
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomItem = getRandomArrayItem(posters);

  return `./images/posters/${randomItem}`;
};

const generateRating = () => {
  const randomRating = getRandom(FILM_RATING_MIN, FILM_RATING_MAX);

  return Number(randomRating.toFixed(1));
};

const generateDirector = () => {
  const directors = [
    'John Cromwell',
    'A. Edward Sutherland',
    'Armand Schaefer',
    'Otto Preminger',
    'Nicholas Webster',
    'Dave Fleischer',
    'Willard Bowsky',
    'Anthony Mann',
  ];

  return getRandomArrayItem(directors);
};

const generateCountry = () => {
  const countries = [
    'USA',
    'Canada',
    'France',
    'Germany',
    'Ireland',
    'Italy',
    'Mexico',
    'United Kingdom',
  ];

  return getRandomArrayItem(countries);
};

const generateGenres = () => {
  const genres = [
    'Crime',
    'Drama',
    'Romance',
    'Adventure',
    'Comedy',
    'Family',
    'Fantasy',
    'Sci-Fi',
    'Animation',
    'Musical',
    'Film-Noir',
    'Mystery',
    'Thriller',
  ];

  return getRandomArrayItems(genres, FILM_GENRES_MIN, FILM_GENRES_MAX);
};

const generateWriters = () => {
  const writers = [
    'Walter Newman',
    'Lewis Meltzer',
    'Nelson Algren',
    'Ben Hecht',
    'Glenville Mareth',
    'Paul L. Jacobson',
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Vicki Baum',
    'Jo Swerling',
    'Rose Franken',
    'Lindsley Parsons',
    'Benjamin Glazer',
    'Arthur Hopkins',
    'Julian Johnson',
    'George Manker Watters',
  ];

  return getRandomArrayItems(writers, FILM_WRITERS_MIN, FILM_WRITERS_MAX);
};

const generateActors = () => {
  const actors = [
    'Frank Sinatra',
    'Eleanor Parker',
    'Kim Novak',
    'Arnold Stang',
    'Darren McGavin',
    'Robert Strauss',
    'John Conte',
    'Doro Merande',
    'George E. Stone',
    'George Mathews',
    'Leonid Kinskey',
    'Emile Meyer',
    'John Call',
    'Leonard Hicks',
    'Vincent Beck',
    'Bill McCutcheon',
    'Lou Fleischer',
    'Jack Mercer',
    'Mae Questel',
    'Gus Wickie',
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Carole Lombard',
    'James Stewart',
    'Charles Coburn',
    'John Wayne',
    'Nancy Shubert',
    'Lane Chandler',
    'Hal Skelly',
    'Nancy Carroll',
    'Dorothy Revier',
  ];

  return getRandomArrayItems(actors, FILM_ACTORS_MIN, FILM_ACTORS_MAX);
};

const generateRuntime = () => {
  return getRandomInteger(FILM_RUNTIME_MINUTES_MIN, FILM_RUNTIME_MINUTES_MAX);
};

const generateAge = () => {
  const ages = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];

  return getRandomArrayItem(ages);
};

export const generateFilm = () => {
  const title = generateTitle();

  return {
    title: title,
    originalTitle: title,
    description: generateDescription(),
    poster: generatePoster(),
    rating: generateRating(),
    releaseDate: generateRandomDate(FILM_YEAR_MIN, FILM_YEAR_MAX),
    runtime: generateRuntime(),
    genres: generateGenres(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    country: generateCountry(),
    age: generateAge(),
  };
};
