
import AbstractView from '../views/abstract-view.js';

const createErrorCommentsTemplate = () => (
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title" style="font-size: 20px">
        Can't load comments. Try to reload page later
        <span class="film-details__comments-count">
        </span>
      </h3>
    </section>
  </div>`
);

export default class ErrorCommentsView extends AbstractView {

  get template() {
    return createErrorCommentsTemplate();
  }
}
