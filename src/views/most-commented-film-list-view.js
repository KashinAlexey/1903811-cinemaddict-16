import AbstractView from './abstract-view.js';

const createMostCommentedFilmListTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">
      Most commented
    </h2>
  </section>`
);

export default class MostCommentedFilmsListView extends AbstractView {
  get template() {
    return createMostCommentedFilmListTemplate();
  }
}
