import AbstractView from './abstract-view.js';
import { reformatRuntime } from '../utils/commons.js';

const createFilmDetailsGenre = (genres = []) => (
  genres.map((genre) => `<span class="film-details__genre">
    ${genre}
  </span>`).join('')
);

const createFilmDetailsRow = (row = '', detail = '') => (
  `<tr class="film-details__row">
    <td class="film-details__term">${row}</td>
    <td class="film-details__cell">${detail}</td>
  </tr>`
);

const createFilmDetailsControlButton = (film) => {
  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  return `<section class="film-details__controls">
    <button
      type="button"
      class="film-details__control-button film-details__control-button--watchlist
      ${watchlist ? 'film-details__control-button--active': ''}"
      id="watchlist"
      name="watchlist">
      Add to watchlist
    </button>
    <button
      type="button"
      class="film-details__control-button  film-details__control-button--watched
      ${alreadyWatched ? 'film-details__control-button--active': ''}"
      id="watched"
      name="watched">
      Already watched
    </button>
    <button
      type="button"
      class="film-details__control-button film-details__control-button--favorite
      ${favorite ? 'film-details__control-button--active': ''}"
      id="favorite"
      name="favorite">
      Add to favorites
    </button>
  </section>`;
};

const createFilmDetailsTemplate = (film) => {
  const { poster, title, alternativeTitle, totalRating, director, writers, actors, release, runtime, genre, description, ageRating } = film.filmInfo;
  const {date, releaseCountry} = release;
  const genreTitle = genre.length !== 1 ? 'Genres' : 'Genre';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button
            class="film-details__close-btn"
            type="button">
            close
          </button>
        </div>

        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img
              class="film-details__poster-img"
              src=${poster}
              alt=""
            />
            <p class="film-details__age">
              ${ageRating}+
            </p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">
                  ${title}
                </h3>
                <p class="film-details__title-original">
                  Original: ${alternativeTitle}
                </p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">
                  ${totalRating}
                </p>
              </div>
            </div>

            <table class="film-details__table">
              ${createFilmDetailsRow('Derictor', director)}
              ${createFilmDetailsRow('Writers', writers.join(', '))}
              ${createFilmDetailsRow('Actors', actors.join(', '))}
              ${createFilmDetailsRow('Release Date', `${date.getDay()} ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric'})}`)}
              ${createFilmDetailsRow('Runtime', reformatRuntime(runtime))}
              ${createFilmDetailsRow('Country', releaseCountry)}
              <tr class="film-details__row">
                ${createFilmDetailsRow(genreTitle, createFilmDetailsGenre(genre))}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        ${createFilmDetailsControlButton(film)}
      </div>
    </form>
  </section>`;
};
export default class FilmDetailsView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('#favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('#watched').addEventListener('click', this.#watchedClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('#watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this.#film);
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(this.#film);
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(this.#film);
  }
}
