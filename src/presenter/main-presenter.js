import { DataEvent } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import HeaderProfileView from '../views/header-profile-view.js';
import { RenderPosition } from '../constants.js';
import NavigationView from '../views/navigation-view.js';
import SortView from '../views/sort-view.js';
import { SortType } from '../constants.js';
import FilmsView from '../views/films-view.js';
import FooterStatisticsView from '../views/footer-statistics-view.js';
import FilmsListView from '../views/films-list-view.js';
import ShowMoreButtonView from '../views/show-more-button-view.js';
import FilmsListContainerView from '../views/film-list-container-view.js';
import FilmCardView from '../views/film-card-view.js';
import { EXTRA_FILM_COUNT } from '../constants.js';
import TopRatedFilmsListView from '../views/top-rated-film-list-view.js';
import MostCommentedFilmsListView from '../views/most-commented-film-list-view.js';
import FilmDetailsView from '../views/film-details-view.js';
import CommentsView from '../views/comments-view.js';
import { UserAction } from '../constants.js';
//import StatsView from '../views/statistic-view.js';

const FILM_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #film = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;

  #dataModel = null;
  #siteHeaderContainer = null;
  #siteMainContainer = null;
  #siteFooterContainer = null;
  #siteBodyContainer = null;

  #showMoreButtonComponent = null;
  #filmListComponent = null;
  #filmListContainerComponent = null;
  #popupComponent = null;
  #commentsComponent = null;

  constructor(dataModel, siteHeaderContainer, siteMainContainer, siteFooterContainer, siteBodyContainer) {
    this.#dataModel = dataModel;
    this.#siteHeaderContainer = siteHeaderContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#siteFooterContainer = siteFooterContainer;
    this.#siteBodyContainer = siteBodyContainer;
  }

  get films() {
    const films = this.#dataModel.films;
    return films;
  }

  get comments() {
    const comments = this.#dataModel.comments;
    return comments;
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

    this.#filmListComponent = new FilmsListView();
    render(filmsComponent, this.#filmListComponent, RenderPosition.BEFOREEND);

    this.#filmListContainerComponent = new FilmsListContainerView();
    render (this.#filmListComponent, this.#filmListContainerComponent, RenderPosition.BEFOREEND);

    this.#renderFilmList();

    const topRatedFilmListComponent = new TopRatedFilmsListView();
    const topRatefilmListContainerComponent = new FilmsListContainerView();
    render(filmsComponent, topRatedFilmListComponent, RenderPosition.BEFOREEND);
    render(topRatedFilmListComponent, topRatefilmListContainerComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
      const filmCard = new FilmCardView(this.films[i]);
      render(topRatefilmListContainerComponent, filmCard, RenderPosition.BEFOREEND);
    }

    const mostCommentedFilmListComponent = new MostCommentedFilmsListView();
    const mostCommentedfilmListContainerComponent = new FilmsListContainerView();
    render(filmsComponent, mostCommentedFilmListComponent, RenderPosition.BEFOREEND);
    render(mostCommentedFilmListComponent, mostCommentedfilmListContainerComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
      const filmCard = new FilmCardView(this.films[i]);
      render(mostCommentedfilmListContainerComponent, filmCard, RenderPosition.BEFOREEND);
    }

    //const statsComponent = new StatsView();
    //render(this.#siteMainContainer, statsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilm = (film) => {
    const filmCard = new FilmCardView(film);
    filmCard.setFilmCardClickHandler(this.#handleFilmCardClick);
    filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    filmCard.setWatchedClickHandler(this.#handleWatchedClick);
    filmCard.setWatchlistClickHandler(this.#handleWatchlistClick);
    render(this.#filmListContainerComponent, filmCard, RenderPosition.BEFOREEND);
  }

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  }

  #renderFilmList = () => {
    const films = this.films;
    const filmCount = films.length;

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderPopup = (film) => {
    this.#popupComponent = new FilmDetailsView(film);
    this.#popupComponent.setCloseClickHandler(this.#handlePopupCloseClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setWatchlistClickHandler(this. #handleWatchlistClick);
    document.addEventListener('keydown', this.#escKeydownHandler);
    render(this.#siteBodyContainer, this.#popupComponent, RenderPosition.BEFOREEND);
  }

  #renderComments = () => {
    if (this.#commentsComponent) {
      remove(this.#commentsComponent);
    }

    this.#commentsComponent = new CommentsView(this.comments);
    this.#commentsComponent.setDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#commentsComponent.setCommentInputHandler(this.#handlePopupCtrlEnterKeydown);
    render(this.#popupComponent, this.#commentsComponent, RenderPosition.BEFOREEND);
  }

  #clearFilmList = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    if (resetRenderedTaskCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setShowMoreClickHandler(this.#handleShowMoreButton);
    render(this.#filmListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  #handleShowMoreButton = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #handleFilmCardClick = (id) => {
    const index = this.films.findIndex((film) => film.id === id);
    this.#film = this.films[index];
    this.#renderPopup(this.#film);
    this.#dataModel.getComments(id);
  };

  #handleFavoriteClick = () => {};

  #handleWatchedClick = () => {};

  #handleWatchlistClick = () => {};

  #handlePopupCloseClick = () => {
    remove(this.#commentsComponent);
    remove(this.#popupComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #handleCommentDeleteClick = (id) => {
    const index = this.comments.findIndex((comment) => comment.id === id);
    const update = this.comments[index];
    this.#handleViewAction(UserAction.DELETE_DATA, update);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#handlePopupCloseClick();
      document.removeEventListener('keydown', this.#escKeydownHandler);
      return;
    }

    this.#commentsComponent.commentInputHandler(evt);
  }

  #handlePopupCtrlEnterKeydown = (comment) => {
    this.#handleViewAction(UserAction.ADD_DATA, comment);
  }

  #handleViewAction = async (actionType, update) => {
    switch (actionType) {
      case UserAction.DELETE_DATA:
        try {
          await this.#dataModel.deleteComment(update.id);
        } catch(err) {
          ///console.log('err');
        }
        break;
      case UserAction.ADD_DATA:
        try {
          await this.#dataModel.addComment(this.#film.id, update);
        } catch(err) {
          ///console.log('err');
        }
        break;
    }
  }

  #handleModelEvent = (eventType) => {
    switch (eventType) {
      case DataEvent.INIT:
        this.renderSite();
        break;
      case DataEvent.GETED:
        this.#renderComments();
        break;
      case DataEvent.ADDED:
        this.#renderComments();
        //console.log(this.comments);
        break;
      case DataEvent.UPDATED:
        break;
      case DataEvent.DELETED:
        this.#renderComments();
        break;
      case DataEvent.ERROR:
        break;
    }
  };
}
