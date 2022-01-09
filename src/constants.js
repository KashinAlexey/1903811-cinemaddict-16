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
};

export const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const FILTERS = ['watchlist', 'history', 'favorites'];
const SORTS = ['Sort by default', 'Sort by date', 'Sort by rating'];

export const MenuItem = {
  ALL: 'All movies',
  STATS: 'Stats',
};

export const FilterType = {
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export { RenderPosition, EXTRA_FILM_COUNT, FILTERS, SORTS };
