import AbstractView from './abstract-view.js';
import { StatsFilterType } from '../constants.js';
import { updateRating } from '../utils/commons.js';

const createStatisticFiltersInputTemplate = (filterType) => (`
  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input
      type="radio"
      class="statistic__filters-input visually-hidden" name="statistic-filter"
      id="statistic-all-time"
      value="all-time"
      ${filterType === StatsFilterType.ALL ? 'checked' : ''}
    >
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input
      type="radio"
      class="statistic__filters-input visually-hidden" name="statistic-filter"
      id="statistic-today"
      value="today"
      ${filterType === StatsFilterType.TODAY ? 'checked' : ''}
    >
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input
      type="radio"
      class="statistic__filters-input visually-hidden" name="statistic-filter"
      id="statistic-week"
      value="week"
      ${filterType === StatsFilterType.WEEK ? 'checked' : ''}
    >
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input
      type="radio"
      class="statistic__filters-input visually-hidden" name="statistic-filter"
      id="statistic-month"
      value="month"
      ${filterType === StatsFilterType.MONTH ? 'checked' : ''}
    >
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input
      type="radio"
      class="statistic__filters-input visually-hidden" name="statistic-filter"
      id="statistic-year"
      value="year"
      ${filterType === StatsFilterType.YEAR ? 'checked' : ''}
    >
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>`
);

const createStatsRankTemplate = (films) => (
  `<p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">
    ${updateRating(films) !== null ? `${updateRating(films)}` : '-'}
    </span>
  </p>`
);

const createStatsTextTemplate = (watched, duration, genre) => (
  `<ul class="statistic__text-list">
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
  </ul>`
);

const createStatsChartTemplate = () => (
  `<div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>`
);

const createStatisticTemplate = (filterType, duration, genre, watched, films) => (
  `<section class="statistic">
    ${createStatsRankTemplate(films)}

    ${createStatisticFiltersInputTemplate(filterType)}

    ${createStatsTextTemplate(watched, duration, genre)}

    ${createStatsChartTemplate()}
  </section>`
);

export default class StatsView extends AbstractView {
  #filterType = null;
  #duration = null;
  #genre = null;
  #watched = null;
  #films = null;

  constructor(filterType, duration, genre, watched, films) {
    super();
    this.#films = films;
    this.#filterType = filterType;
    this.#duration = duration;
    this.#genre = genre;
    this.#watched = watched;
  }

  get template() {
    return createStatisticTemplate(this.#filterType, this.#duration, this.#genre, this.#watched, this.#films);
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

