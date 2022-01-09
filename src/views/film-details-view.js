import AbstractView from './abstract-view.js';
import { reformatRuntime } from '../utils/commons.js';
//const FILM_DETAILS_ROWS = ['Director', 'Writers', 'Actors', 'Release Date', 'Runtime', 'Country', 'Genres'];

const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

const FILM_DETAILS_CONTROL_BUTTON = {
  'watchlist': 'Add to watchlist',
  'watched': 'Already watched',
  'favorite': 'Add to favorites',
};

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

const createFilmDetailsControlButton = (isWatched = false) => (Object.entries(FILM_DETAILS_CONTROL_BUTTON).map(([button, text]) =>
  `<button
    type="button"
    class="film-details__control-button
    ${isWatched ? 'film-details__control-button--active' : ''}
    film-details__control-button--${button}"
    id="${button}"
    name="${button}">
    ${text}
  </button>`).join('')
);

const createFilmDetailsComment = () => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img
        src="./images/emoji/smile.png"
        width="55"
        height="55"
        alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">
        Interesting setting and a good cast
      </p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">
          Tim Macoveev
        </span>
        <span class="film-details__comment-day">
          2019/12/31 23:59
        </span>
        <button class="film-details__comment-delete">
          Delete
        </button>
      </p>
    </div>
  </li>`
);

const createFilmDetailsEmojiItem = () => (
  EMOJIS.map((emoji) => `<input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emoji}"
    value="${emoji}"
  />
  <label
    class="film-details__emoji-label"
    for="emoji-${emoji}">
    <img
      src="./images/emoji/${emoji}.png"
      width="30"
      height="30"
      alt="emoji"
    />
  </label>`).join('')
);

const createFilmDetailsTemplate = (film) => {
  const { poster, title, alternativeTitle, totalRating, director, writers, actors, release, runtime, genre, description, ageRating } = film.filmInfo;
  const {date, releaseCountry} = release;
  const genreTitle = genre.length !== 1 ? 'Genres' : 'Genre';
  const commentsCount = film.comments.length;

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
              ${createFilmDetailsRow('Writers', writers)}
              ${createFilmDetailsRow('Actors', actors)}
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

        <section class="film-details__controls">
          ${createFilmDetailsControlButton()}
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments
            <span class="film-details__comments-count">
              ${commentsCount}
            </span>
          </h3>

          <ul class="film-details__comments-list">
            ${createFilmDetailsComment()}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label
              class="film-details__comment-label">
              <textarea
                class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                name="comment">
              </textarea>
            </label>

            <div class="film-details__emoji-list">
              ${createFilmDetailsEmojiItem()}
            </div>
          </div>
        </section>
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
}
