import AbstractView from './abstract-view.js';

const createTopRatedFilmListTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">
      Top rated
    </h2>
  </section>`
);

export default class TopRatedFilmsListView extends AbstractView {
  get template() {
    return createTopRatedFilmListTemplate();
  }
}
