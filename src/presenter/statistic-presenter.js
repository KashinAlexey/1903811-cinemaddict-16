import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RenderPosition } from '../constants.js';
import { render } from '../utils/render.js';
import { remove } from '../utils/render.js';
import { sortNumber } from '../utils/commons.js';
import { StatsFilterType } from '../constants.js';

import StatsView from '../views/statistic-view.js';

export const statsFilter = {
  [StatsFilterType.ALL]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [StatsFilterType.TODAY]: (films) => films.filter((film) => film.userDetails.alreadyWatched && film.userDetails.watchingDate === new Date()),
  [StatsFilterType.WEEK]: (films) => films.filter((film) => film.userDetails.alreadyWatched && film.userDetails.watchingDate.getDay() === new Date().getDate() && film.userDetails.watchingDate.getFullYear() === new Date().getFullYear()),
  [StatsFilterType.MONTH]: (films) => films.filter((film) => film.userDetails.alreadyWatched && film.userDetails.watchingDate.getMonth() === new Date().getMonth() && film.userDetails.watchingDate.getFullYear() === new Date().getFullYear()),
  [StatsFilterType.YEAR]: (films) => films.filter((film) => film.userDetails.alreadyWatched && film.userDetails.watchingDate.getFullYear() === new Date().getFullYear()),
};

const getCounts = (films) => {
  const data = {
    labels: [],
    values: [],
  };

  let arr = new Map();

  films.forEach((film) => {
    const { genre } = film.filmInfo;

    genre.forEach((_genre) => {
      if (arr.has(_genre)) {
        arr.set(_genre, arr.get(_genre) + 1);
      } else {
        arr.set(_genre, 1);
      }
    });

  });

  arr = [...arr].sort((typeA, typeB) => sortNumber(typeA[1], typeB[1], 'Up'));

  arr.forEach((item) => {
    data.labels.push(item[0]);
    data.values.push(item[1]);
  });

  return data;
};

const getDuration = (films) => {
  const arr = films.map((film) => film.filmInfo.runtime);
  return arr.length !== 0 ? arr.reduce((previous, current) =>  previous + current) : 0;
};

export default class StatisticPresenter {
  #siteMainContainer = null;
  #filmsModel = null;
  #statsComponent = null;
  #filterType = StatsFilterType.ALL;

  constructor (filmsModel, siteMainContainer) {
    this.#filmsModel = filmsModel;
    this.#siteMainContainer = siteMainContainer;
  }

  get films() {
    const films = this.#filmsModel.films;
    const filteredfilms = statsFilter[this.#filterType](films).slice();

    return filteredfilms;
  }

  init = () => {
    const {labels, values} = getCounts(this.films);
    const watched = this.films.length;
    const topGenre = labels[0] || '-';
    const duration = getDuration(this.films);

    this.#statsComponent = new StatsView(this.#filterType, duration, topGenre, watched);
    render(this.#siteMainContainer, this.#statsComponent, RenderPosition.BEFOREEND);

    this.#statsComponent.setFilterTypeChangeHandler(this.#handlefilterTypeChange);

    const statisticCtx = document.querySelector('.statistic__chart');

    const BAR_HEIGHT = 80;
    statisticCtx.height = BAR_HEIGHT * 5;
    this.#renderChart(statisticCtx, labels, values);
  }

  #renderChart = (Ctx, labels, values) => new Chart(Ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  #handlefilterTypeChange = (type) => {
    if (this.#filterType === type) {
      return;
    }

    this.#filterType = type;
    remove(this.#statsComponent);
    this.init();
  }
}
