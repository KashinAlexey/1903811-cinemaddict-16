export const SHAKE_ANIMATION_TIMEOUT = 600;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const AUTHORIZATION = 'Basic pouigwdbbhvwv9653';
export const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';

export const Url = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

export const UserAction = {
  GET_DATA: 'GET_DATA',
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA',
  DELETE_DATA: 'DELETE_DATA',
};

export const DataEvent = {
  INIT: 'INIT',
  GETED: 'GETED',
  ADDED: 'ADDED',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',
  ERROR: 'ERROR',
  FILTERED: 'FILTERED',
};

export const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const SORTS = ['Sort by default', 'Sort by date', 'Sort by rating'];

export const MenuItem = {
  DEFAULT: 'DEFAULT',
  STATS: 'Stats',
};

export const FilterType = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITES: 'FAVORITES',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const StatsFilterType = {
  ALL: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export { RenderPosition, EXTRA_FILM_COUNT, SORTS };
