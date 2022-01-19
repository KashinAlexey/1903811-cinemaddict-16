import AbstractView from './abstract-view.js';
import { updateRating } from '../utils/commons.js';

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
