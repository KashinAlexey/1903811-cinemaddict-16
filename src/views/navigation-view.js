import AbstractView from './abstract-view.js';
import { MenuItem } from '../constants.js';

const createMainNavigationTemplate = (filterItems, currentFilterType) => (`<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItems.map((filter) =>`<a href="#${filter.type}"
        class="main-navigation__item
        ${filter.type === currentFilterType ? 'main-navigation__item--active' : ''}"
        data-main-navigation-type="${filter.type}">
        ${filter.name}
        ${filter.type !== 'ALL' ? `<span class="main-navigation__item-count"
          data-main-navigation-type="${filter.type}">
          ${filter.count}
        </span>` : ''}
      </a>`).join('')}
    </div>
    <a href="#stats"
      class="main-navigation__additional"
      data-main-navigation-type="${MenuItem.STATS}">
      Stats
    </a>
  </nav>`
);

export default class NavigationView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createMainNavigationTemplate(this.#filters, this.#currentFilter);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-main-navigation-type="${menuItem}"]`);
    item.classList.toggle('main-navigation__item--active');
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    const filterButtons = this.element.querySelectorAll('.main-navigation__item');
    for (const filterButton of filterButtons) {
      filterButton.addEventListener('click', this.#filterChangeHandler);
      filterButton.addEventListener('click', this.#statsClickHandler);
    }
  }

  setStatsClickHandler = (callback) => {
    this._callback.statsClick = callback;
    this.element.querySelector('.main-navigation__additional').addEventListener('click', this.#statsClickHandler);
  }

  #filterChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'SPAN') {
      return;
    }
    evt.preventDefault();
    this._callback.filterChange(evt.target.dataset.mainNavigationType);
  }

  #statsClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.statsClick(evt.target.dataset.mainNavigationType);
  }
}
