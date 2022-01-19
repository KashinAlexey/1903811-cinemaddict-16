import AbstractView from './abstract-view.js';

const createErrorTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">
        Can't loading data. Try to reload page later
      </h2>
    </section>
  </section>`
);

export default class ErrorView extends AbstractView {

  get template() {
    return createErrorTemplate();
  }
}
