import AbstractView from './abstract-view.js';
import { reformatRuntime } from '../utils/commons.js';

const createFilmCardControlsItem = () => (`
  <div class="film-card__controls">
    <button
      class="film-card__controls-item film-card__controls-item--add-to-watchlist"
      type="button">
      Add to watchlist
    </button>
    <button
      class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active"
      type="button">
      Mark as watched
    </button>
    <button
      class="film-card__controls-item film-card__controls-item--mark-as-favorite"
      type="button">
      Mark as favorite
    </button>
  </div>`
);

const createFilmDetailsGenre = (genres = []) => (
  genres.map((genre) => `<span class="film-card__genre">
    ${genre}
  </span>`).join('')
);

const createFilmCardTemplate = (film) => {
  const {poster, title, totalRating, release, runtime, genre, description} = film.filmInfo;
  const commentsCount = film.comments.length;

  return `<article class="film-card">
    <a id="${film.id}" class="film-card__link">
      <h3 class="film-card__title">
        ${title}
      </h3>
      <p class="film-card__rating">
        ${totalRating}
      </p>
      <p class="film-card__info">
        <span class="film-card__year">
          ${release.date.getFullYear()}
        </span>
        <span class="film-card__duration">
          ${reformatRuntime(runtime)}
        </span>
        ${createFilmDetailsGenre(genre)}
      </p>
      <img
        src=${poster}
        alt=""
        class="film-card__poster"
      />
      <p class="film-card__description">
        ${description.length > 140 ? `${description.slice(0, 140)}...`: description}
      </p>
      <span class="film-card__comments">
        ${commentsCount} comments
      </span>
    </a>
    ${createFilmCardControlsItem()}
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setFilmCardClickHandler = (callback) => {
    this._callback.filmCardClick = callback;
    this.element.querySelector('a').addEventListener('click', this.#filmCardClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmCardClick(evt.currentTarget.getAttribute('id'));
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(evt.target);
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(evt.target);
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(evt.target);
  }
}
