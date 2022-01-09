import AbstractView from './abstract-view.js';

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

export const createFilmCardTemplate = () => (
  `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">
        The Dance of Life
      </h3>
      <p class="film-card__rating">
        8.3
      </p>
      <p class="film-card__info">
        <span class="film-card__year">
          1929
        </span>
        <span class="film-card__duration">
          1h 55m
        </span>
        <span class="film-card__genre">
          Musical
        </span>
      </p>
      <img
        src="./images/posters/the-dance-of-life.jpg"
        alt=""
        class="film-card__poster"
      />
      <p class="film-card__description">
        Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…
      </p>
      <span class="film-card__comments">
        5 comments
      </span>
    </a>
    ${createFilmCardControlsItem()}
  </article>
`);

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
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
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
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }
}
