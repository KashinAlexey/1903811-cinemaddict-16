import { DataEvent } from '../constants.js';
import { remove } from '../utils/render.js';
import { render } from '../utils/render.js';
import { replace } from '../utils/render.js';
import HeaderProfileView from '../views/header-profile-view.js';
import { RenderPosition } from '../constants.js';
//import NavigationView from '../views/navigation-view.js';
import SortView from '../views/sort-view.js';
import { SortType } from '../constants.js';
import FilmsView from '../views/films-view.js';
//import FooterStatisticsView from '../views/footer-statistics-view.js';
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
//import FilterPresenter from './filter-presenter.js';
//import FilterModel from '../model/filter-model.js';
import { FilterType } from '../constants.js';
import { filter } from '../utils/filter.js';
import NoFilmsView from '../views/no-films-view.js';
import { sortNumber } from '../utils/commons.js';
import { sortDate } from '../utils/commons.js';
import LoadingView from '../views/loading-view.js';

//import StatsView from '../views/statistic-view.js';
//import StatisticPresenter from './statistic-presenter.js';

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FILM_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #film = null;
  #filmCards = new Map();

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #mode = Mode.DEFAULT;
  #isLoading = true;

  #dataModel = null;
  #filterModel = null;
  #siteHeaderContainer = null;
  #siteMainContainer = null;
  #siteFooterContainer = null;
  #siteBodyContainer = null;

  #showMoreButtonComponent = null;
  #filmListComponent = null;
  #filmListContainerComponent = null;
  #popupComponent = null;
  #commentsComponent = null;
  #noFilmsComponent = null;
  #sortComponent = null;
  #filmsComponent = null;
  #headerProfileComponent = null;
  #loadingComponent = null;

  constructor(dataModel, filterModel, siteHeaderContainer, siteMainContainer, siteFooterContainer, siteBodyContainer) {
    this.#dataModel = dataModel;
    this.#filterModel = filterModel;
    this.#siteHeaderContainer = siteHeaderContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#siteFooterContainer = siteFooterContainer;
    this.#siteBodyContainer = siteBodyContainer;
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#dataModel.films;
    const filteredfilms = filter[this.#filterType](films).slice();

    switch (this.#currentSortType) {
      case SortType.DATE:
        filteredfilms.sort((filmA, filmB) => sortDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date, 'Up'));
        break;
      case SortType.RATING:
        filteredfilms.sort((filmA, filmB) => sortNumber(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating, 'Up'));
        break;
    }

    return filteredfilms;
  }

  get commentedFilms() {
    const commentedFilms = this.#dataModel.films.slice();
    return commentedFilms.sort((filmA, filmB) => sortNumber(filmA.comments.length, filmB.comments.length, 'Up'));
  }

  get topFilms() {
    const topFilms = this.#dataModel.films.slice();
    return topFilms.sort((filmA, filmB) => sortNumber(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating, 'Up'));
  }

  get comments() {
    const comments = this.#dataModel.comments;
    return comments;
  }

  init = () => {
    this.#dataModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#renderFilmsContainer();
  }

  destroy = () => {
    remove(this.#sortComponent);
    remove(this.#filmsComponent);
  }

  #renderTopFilms = () => {
    const isZeroRating = (this.films.filter((film) => film.filmInfo.totalRating === 0)).length;

    if (this.topFilms.length === 0 || isZeroRating) {
      return;
    }

    const topRatedFilmListComponent = new TopRatedFilmsListView();
    const topRatefilmListContainerComponent = new FilmsListContainerView();
    render(this.#filmsComponent, topRatedFilmListComponent, RenderPosition.BEFOREEND);
    render(topRatedFilmListComponent, topRatefilmListContainerComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
      const filmCard = new FilmCardView(this.topFilms[i]);
      filmCard.setFilmCardClickHandler(this.#handleFilmCardClick);
      filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
      filmCard.setWatchedClickHandler(this.#handleWatchedClick);
      filmCard.setWatchlistClickHandler(this.#handleWatchlistClick);
      render(topRatefilmListContainerComponent, filmCard, RenderPosition.BEFOREEND);
    }
  }

  #renderCommentedFilms = () => {
    if (this.commentedFilms.length === 0) {
      return;
    }

    const mostCommentedFilmListComponent = new MostCommentedFilmsListView();
    const mostCommentedfilmListContainerComponent = new FilmsListContainerView();
    render(this.#filmsComponent, mostCommentedFilmListComponent, RenderPosition.BEFOREEND);
    render(mostCommentedFilmListComponent, mostCommentedfilmListContainerComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
      const filmCard = new FilmCardView(this.commentedFilms[i]);
      filmCard.setFilmCardClickHandler(this.#handleFilmCardClick);
      filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
      filmCard.setWatchedClickHandler(this.#handleWatchedClick);
      filmCard.setWatchlistClickHandler(this.#handleWatchlistClick);
      render(mostCommentedfilmListContainerComponent, filmCard, RenderPosition.BEFOREEND);
    }
  }

  #renderHeaderProfile = () => {
    if (this.#headerProfileComponent) {
      remove(this.#headerProfileComponent);
    }

    this.#headerProfileComponent = new HeaderProfileView(this.films);
    render(this.#siteHeaderContainer, this.#headerProfileComponent, RenderPosition.BEFOREEND);
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#filterType);
    render(this.#filmListComponent, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderFilmsContainer = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#filmsComponent = new FilmsView();
    render(this.#siteMainContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    this.#filmListComponent = new FilmsListView();
    render(this.#filmsComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
    this.#filmListContainerComponent = new FilmsListContainerView();
    render (this.#filmListComponent, this.#filmListContainerComponent, RenderPosition.BEFOREEND);
    this.#renderFilmList();
    this.#renderSort();

    this.#renderTopFilms();
    this.#renderCommentedFilms();
  }

  #clearFilmsContainer = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    remove(this.#sortComponent);
    this.#clearFilmList({resetRenderedTaskCount, resetSortType });
    remove(this.#filmsComponent);
  }

  #renderFilmList = () => {
    const films = this.films;
    const filmCount = films.length;

    this.#renderHeaderProfile();

    if (filmCount === 0) {
      this.#renderNoFilms();
      remove(this.#sortComponent);
      return;
    }

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  }

  #renderFilm = (film) => {
    const prevFilmCardComponent = this.#filmCards.get(film.id) || null;
    const filmCard = new FilmCardView(film);
    this.#filmCards.set(film.id, filmCard);
    filmCard.setFilmCardClickHandler(this.#handleFilmCardClick);
    filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    filmCard.setWatchedClickHandler(this.#handleWatchedClick);
    filmCard.setWatchlistClickHandler(this.#handleWatchlistClick);
    if (prevFilmCardComponent === null) {
      render(this.#filmListContainerComponent, filmCard, RenderPosition.BEFOREEND);
    } else {
      replace(filmCard, prevFilmCardComponent);
      remove(prevFilmCardComponent);
    }
  }

  #renderLoading = () => {
    this.#loadingComponent = new LoadingView();
    render(this.#siteMainContainer, this.#loadingComponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#filmsComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);

  }

  #renderPopup = (film) => {
    this.#film = film;
    this.#mode = Mode.EDITING;

    if (this.#popupComponent) {
      remove(this.#popupComponent);
    }

    this.#popupComponent = new FilmDetailsView(this.#film);
    this.#popupComponent.setCloseClickHandler(this.#handlePopupCloseClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setWatchlistClickHandler(this. #handleWatchlistClick);
    document.addEventListener('keydown', this.#escKeydownHandler);
    render(this.#siteBodyContainer, this.#popupComponent, RenderPosition.BEFOREEND);
    this.#dataModel.getComments(this.#film.id);
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

    this.#filmCards.forEach((filmCard) => remove(filmCard));
    this.#filmCards.clear();

    remove(this.#showMoreButtonComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

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

  #handleFilmCardClick = (film) => {
    this.#renderPopup(film);
  };

  #handleFavoriteClick = (film) => {
    let userDetails = Object.assign({}, film.userDetails);
    userDetails = {...userDetails, favorite: !userDetails.favorite};
    this.#handleViewAction(
      UserAction.UPDATE_DATA,
      {...film, userDetails});
  };

  #handleWatchedClick = (film) => {
    let userDetails = Object.assign({}, film.userDetails);
    userDetails = {...userDetails, alreadyWatched: !userDetails.alreadyWatched};
    this.#handleViewAction(
      UserAction.UPDATE_DATA,
      {...film, userDetails});
  };

  #handleWatchlistClick = (film) => {
    let userDetails = Object.assign({}, film.userDetails);
    userDetails = {...userDetails, watchlist: !userDetails.watchlist};
    this.#handleViewAction(
      UserAction.UPDATE_DATA,
      {...film, userDetails});
  };

  #handlePopupCloseClick = () => {
    this.#mode = Mode.DEFAULT;
    remove(this.#commentsComponent);
    remove(this.#popupComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #handleCommentDeleteClick = (id) => {
    const index = this.comments.findIndex((comment) => comment.id === id);
    const update = this.comments[index];
    this.#handleViewAction(
      UserAction.DELETE_DATA,
      update);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#handlePopupCloseClick();
      return;
    }

    this.#commentsComponent.commentInputHandler(evt);
  }

  #handlePopupCtrlEnterKeydown = (comment) => {
    this.#handleViewAction(
      UserAction.ADD_DATA,
      comment);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsContainer({resetRenderedTaskCount: true});
    this.#renderFilmsContainer();
  }

  #handleViewAction = async (actionType, update) => {
    switch (actionType) {
      case UserAction.DELETE_DATA:
        this.#commentsComponent.updateComment(update.id, {isDisabled: true, isDeleting: true});
        try {
          await this.#dataModel.deleteComment(update.id, this.#film.id);
        } catch(err) {
          this.#commentsComponent.setAborting(update.id);
        }
        break;
      case UserAction.ADD_DATA:
        try {
          this.#commentsComponent.updateComment(null, {isDisabled: true});
          await this.#dataModel.addComment(this.#film.id, update);
        } catch(err) {
          this.#commentsComponent.setAborting(null);
        }
        break;
      case UserAction.UPDATE_DATA:
        await this.#dataModel.updateFilm(update);
        break;
    }
  }

  #handleModelEvent = (eventType, data) => {
    switch (eventType) {
      case DataEvent.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmsContainer();
        break;
      case DataEvent.GETED:
        this.#renderComments();
        break;
      case DataEvent.ADDED:
        this.#renderComments();
        this.#clearFilmsContainer({resetRenderedTaskCount: false, resetSortType: false});
        this.#renderFilmsContainer();
        break;
      case DataEvent.UPDATED:
        if (this.#mode === Mode.EDITING) {
          this.#renderPopup(data);
          this.#clearFilmsContainer({resetRenderedTaskCount: false, resetSortType: false});
          this.#renderFilmsContainer();
        } else if (this.#mode === Mode.DEFAULT) {
          this.#clearFilmsContainer({resetRenderedTaskCount: false, resetSortType: true});
          this.#renderFilmsContainer();
        }
        break;
      case DataEvent.DELETED:
        this.#renderComments();
        this.#clearFilmsContainer({resetRenderedTaskCount: false, resetSortType: false});
        this.#renderFilmsContainer();
        break;
      case DataEvent.ERROR:
        break;
      case DataEvent.FILTERED:
        this.#clearFilmsContainer({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderFilmsContainer();
        break;

    }
  };
}
