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

export const createMainNavigationTemplate = () => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all"
        class="main-navigation__item
        main-navigation__item--active">
        All movies
      </a>
      ${createMainNavigationItem()}
    </div>
    <a href="#stats" class="main-navigation__additional">
      Stats
    </a>
  </nav>`
);
