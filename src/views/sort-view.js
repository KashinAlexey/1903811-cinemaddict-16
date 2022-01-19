import AbstractView from './abstract-view.js';
import { SortType } from '../constants.js';

const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
    <li>
      <a href="#"
        class="sort__button
        ${SortType.DEFAULT === currentSortType ? 'sort__button--active' : ''}"
        data-sort-type="${SortType.DEFAULT}">
        Sort by default
      </a>
    </li>
    <li>
      <a href="#"
        class="sort__button
        ${SortType.DATE === currentSortType ? 'sort__button--active' : ''}"
        data-sort-type="${SortType.DATE}">
        Sort by date
      </a>
    </li>
    <li>
      <a href="#"
        class="sort__button
        ${SortType.RATING === currentSortType ? 'sort__button--active' : ''}"
        data-sort-type="${SortType.RATING}">
        Sort by rating
      </a>
    </li>
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
