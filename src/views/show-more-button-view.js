import AbstractView from './abstract-view.js';

const createShowMoreButtonTemplate = () => (
  `<button class="films-list__show-more">
    Show more
  </button>`
);

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setShowMoreClickHandler = (callback) => {
    this._callback.showMoreClick = callback;
    this.element.querySelector('.films-list__show-more').addEventListener('click', this.#showMoreClickHandler);
  }

  #showMoreClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showMoreClick();
  }
}
