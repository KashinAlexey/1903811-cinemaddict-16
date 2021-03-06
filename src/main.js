import { AUTHORIZATION } from './constants.js';
import ApiService from './service/api-service.js';
import DataModel from './model/data-model.js';
import { END_POINT } from './constants.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FooterStatisticsView from './views/footer-statistics-view.js';
import MainPresenter from './presenter/main-presenter.js';
import { MenuItem } from './constants.js';
import { remove } from './utils/render.js';
import { render } from './utils/render.js';
import { RenderPosition } from './constants.js';
import StatisticPresenter from './presenter/statistic-presenter.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const dataModel = new DataModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(dataModel, filterModel, siteHeaderElement, siteMainElement, siteBodyElement);

let statisticPresenter = null;
let currentMenu = null;

const handleSiteMenuClick = (menuItem) => {
  if (currentMenu === menuItem) {
    return;
  }

  currentMenu = menuItem;

  switch (menuItem) {
    case MenuItem.STATS:
      filterModel.setFilter(null, MenuItem.STATS);
      mainPresenter.destroy();
      statisticPresenter = new StatisticPresenter(dataModel, siteMainElement);
      statisticPresenter.init();
      break;
    default:
      if (statisticPresenter) {
        statisticPresenter.destroy();
      }
      break;
  }
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, dataModel, handleSiteMenuClick);

filterPresenter.init();
mainPresenter.init();

let footerStatsComponent = new FooterStatisticsView(dataModel.films);
render(siteFooterElement, footerStatsComponent, RenderPosition.BEFOREEND);

dataModel.init().finally(() => {
  remove(footerStatsComponent);
  footerStatsComponent = new FooterStatisticsView(dataModel.films);
  render(siteFooterElement, footerStatsComponent, RenderPosition.BEFOREEND);
});

