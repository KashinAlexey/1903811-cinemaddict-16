const STATISTIC_FILTERS = ['all-time', 'today', 'week', 'month', 'year'];

const replaceStringSimbol = (str, old, replacement) => str.replace(new RegExp(old, 'g'), replacement);

const createStatisticFiltersInputTemplate = () => (
  STATISTIC_FILTERS.map((filter) => `<input
    type="radio"
    class="statistic__filters-input
    visually-hidden"
    name="statistic-filter"
    id="statistic-${filter}"
    value="${filter}"
    checked>
  <label for="statistic-${filter}" class="statistic__filters-label">
  ${(replaceStringSimbol(filter, '-', ' ')).charAt(0).toUpperCase() + replaceStringSimbol(filter, '-', ' ').slice(1)}
  </label>`).join('')
);

export const createStatisticTemplate = () => (
  `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${createStatisticFiltersInputTemplate()}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          You watched
        </h4>
        <p class="statistic__item-text">
          28
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
          69
          <span class="statistic__item-description">
            h </span> 41 <span class="statistic__item-description">m
          </span>
        </p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          Top genre
        </h4>
        <p class="statistic__item-text">
          Drama
        </p>
      </li>
    </ul>

    <!-- Пример диаграммы -->
    <img src="images/cinemaddict-stats-markup.png" alt="Пример диаграммы">

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
);
