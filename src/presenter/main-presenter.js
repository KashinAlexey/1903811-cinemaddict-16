import { DataEvent } from '../constants.js';
//import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import HeaderProfileView from '../views/header-profile-view.js';
import { RenderPosition } from '../constants.js';
import NavigationView from '../views/navigation-view.js';
import SortView from '../views/sort-view.js';
import { SortType } from '../constants.js';
import FilmsView from '../views/films-view.js';
import FooterStatisticsView from '../views/footer-statistics-view.js';
import FilmsListView from '../views/films-list-view.js';

export default class MainPresenter {
  #dataModel = null;
  #siteHeaderContainer = null;
  #siteMainContainer = null;
  #siteFooterContainer = null;

  constructor(dataModel, siteHeaderContainer, siteMainContainer, siteFooterContainer) {
    this.#dataModel = dataModel;
    this.#siteHeaderContainer = siteHeaderContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#siteFooterContainer = siteFooterContainer;
  }

  get films() {
    const films = this.#dataModel.films;
    return films;
  }

  init = () => {
    this.#dataModel.addObserver(this.#handleModelEvent);
  }

  renderSite = () => {
    const headerProfileComponent = new HeaderProfileView(this.films);
    render(this.#siteHeaderContainer, headerProfileComponent, RenderPosition.BEFOREEND);

    const navigationComponent = new NavigationView();
    render(this.#siteMainContainer, navigationComponent, RenderPosition.AFTERBEGIN);

    const sortComponent = new SortView(SortType.DEFAULT);
    render(this.#siteMainContainer, sortComponent, RenderPosition.BEFOREEND);

    const filmsComponent = new FilmsView();
    render(this.#siteMainContainer, filmsComponent, RenderPosition.BEFOREEND);

    const footerStatsComponent = new FooterStatisticsView(this.films);
    render(this.#siteFooterContainer, footerStatsComponent, RenderPosition.BEFOREEND);

    const filmListComponent = new FilmsListView();
    render(filmsComponent, filmListComponent, RenderPosition.BEFOREEND);

  }

  #handleModelEvent = (eventType) => {
    switch (eventType) {
      case DataEvent.INIT:
        this.renderSite();
        break;
      case DataEvent.GETED:

        break;
      case DataEvent.ADDED:

        break;
      case DataEvent.UPDATED:

        break;
      case DataEvent.DELETED:

        break;
      case DataEvent.ERROR:

        break;
    }
  };
}
