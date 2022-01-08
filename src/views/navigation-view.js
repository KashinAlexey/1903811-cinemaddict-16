import AbstractView from './abstract-view.js';
import { MenuItem } from '../constants.js';
import { FILTERS } from '../constants.js';

const createMainNavigationItem = () => (
  FILTERS.map((filter) => `<a href="#${filter}"
  class="main-navigation__item">
  ${filter.charAt(0).toUpperCase() + filter.slice(1)}
  <span class="main-navigation__item-count">
    13
  </span>
  </a>`).join('')
);

const createMainNavigationTemplate = () => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all"
        class="main-navigation__item"
        data-main-navigation-type="${MenuItem.ALL}">
        All movies
      </a>
      ${createMainNavigationItem()}
    </div>
    <a href="#stats"
      class="main-navigation__additional"
      data-main-navigation-type="${MenuItem.STATS}">
      Stats
    </a>
  </nav>`
);

export default class NavigationView extends AbstractView {

  get template() {
    return createMainNavigationTemplate();
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-main-navigation-type="${menuItem}"]`);
    item.classList.toggle('main-navigation__item--active');
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.mainNavigationType);
  }
}
