import AbstractView from './abstract-view.js';

const STATISTIC_FILTERS = ['all-time', 'today', 'week', 'month', 'year'];

const replaceStringSimbol = (str, old, replacement) => str.replace(new RegExp(old, 'g'), replacement);

const createStatisticFiltersInputTemplate = (filterType) => (
  STATISTIC_FILTERS.map((filter) => `<input
    type="radio"
    class="statistic__filters-input
    visually-hidden"
    name="statistic-filter"
    id="statistic-${filter}"
    value="${filter}"
    ${filterType === filter ? 'checked' : ''}>
  <label for="statistic-${filter}" class="statistic__filters-label">
  ${(replaceStringSimbol(filter, '-', ' ')).charAt(0).toUpperCase() + replaceStringSimbol(filter, '-', ' ').slice(1)}
  </label>`).join('')
);

const createStatisticTemplate = (filterType, duration, genre, watched) => (
  `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${createStatisticFiltersInputTemplate(filterType)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          You watched
        </h4>
        <p class="statistic__item-text">
          ${watched}
          <span class="statistic__item-description">
            movies
          </span>
        </p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          Total duration
        </h4>
        <p class="statistic__item-text">
          ${Math.trunc(duration / 60)}
          <span class="statistic__item-description">
            h
          </span>
          ${Math.trunc(duration % 60)}
          <span class="statistic__item-description">
            m
          </span>
        </p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          Top genre
        </h4>
        <p class="statistic__item-text">
          ${genre}
        </p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
);

export default class StatsView extends AbstractView {
  #filterType = null;
  #duration = null;
  #genre = null;
  #watched = null;

  constructor(filterType, duration, genre, watched) {
    super();
    this.#filterType = filterType;
    this.#duration = duration;
    this.#genre = genre;
    this.#watched = watched;
  }

  get template() {
    return createStatisticTemplate(this.#filterType, this.#duration, this.#genre, this.#watched);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelector('.statistic__filters').addEventListener('input', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}

