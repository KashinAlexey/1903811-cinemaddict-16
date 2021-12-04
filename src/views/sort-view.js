import { SORTS } from '../constants.js';

export const createSortTemplate = () => (
  `<ul class="sort">
    ${SORTS.map((sort) => `<li>
    <a href="#"
      class="sort__button
      sort__button--active">
      ${sort}
    </a>
    </li>`).join('')}
  </ul>`
);
