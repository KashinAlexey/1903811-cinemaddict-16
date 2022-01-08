import AbstractView from './abstract-view.js';

const updateRating = (films) => {
  let rating = null;
  const ratingCount = films.filter((film) => film.userDetails.alreadyWatched === true).length;

  if (ratingCount > 20) {
    rating = 'movie buff';
  } else if (ratingCount <= 20 && ratingCount > 10) {
    rating = 'fun';
  } else if (ratingCount <= 10 && ratingCount > 0) {
    rating = 'novice';
  }

  return rating;
};

const createHeaderProfileTemplate = (films) => (
  `<section class="header__profile profile">
    ${updateRating(films) !== null ? `<p class="profile__rating" >
      ${updateRating(films)}
    </p>` : ''}
    <img
      class="profile__avatar"
      src="images/bitmap@2x.png"
      alt="Avatar"
      width="35"
      height="35">
  </section>`
);

export default class HeaderProfileView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createHeaderProfileTemplate(this.#films);
  }
}
