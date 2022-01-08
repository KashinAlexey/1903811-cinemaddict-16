import AbstractView from './abstract-view.js';
import { SortType } from '../constants.js';

const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
    ${Object.entries(SortType).map(([name, type]) => `<li>
    <a href="#${type}"
      id="sort-${name}"
      class="sort__button
      ${type === currentSortType ? 'sort__button--active' : ''}"
      data-sort-type="${type}">
      Sort by ${type}
    </a>
    </li>`).join('')}
  </ul>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
