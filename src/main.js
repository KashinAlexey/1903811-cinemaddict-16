import { renderTemplate } from './util.js';
import { RenderPosition, FILM_COUNT, EXTRA_FILM_COUNT } from './constants.js';
import { createMenuTemplate } from './views/profile-view.js';
import { createNavigationTemplate } from './views/navigation-view.js';
import { createSortTemplate } from './views/sort-view.js';
import { createFilmsTemplate } from './films-view.js';
import { createFilmListTemplate } from './views/film-list-view.js';
import { createShowMoreButtonTemplate } from './views/show-more-button-view.js';
import { createFilmCardTemplate } from './views/film-card-view.js';
import { createStatisticsTemplate } from './views/statistics-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteHeaderElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
renderTemplate(footerStatisticsElement, createStatisticsTemplate(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector('.films');

renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmListElement = filmsElement.querySelector('.films-list');

renderTemplate(filmListElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

const filmListContainerElement = filmListElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmListContainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmsElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmsElements = siteMainElement.querySelectorAll('.films-list');
const topRatedFilmListElement = filmsElements[1];
const mostCommentedFilmListElement = filmsElements[2];
topRatedFilmListElement.classList.add('films-list--extra');
mostCommentedFilmListElement.classList.add('films-list--extra');

topRatedFilmListElement.querySelector('h2').classList.remove('visually-hidden');
mostCommentedFilmListElement.querySelector('h2').classList.remove('visually-hidden');

const topRatedfilmListContainerElement = topRatedFilmListElement.querySelector('.films-list__container');
const mostCommentedFilmListContainerElement = mostCommentedFilmListElement.querySelector('.films-list__container');

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  renderTemplate(topRatedfilmListContainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  renderTemplate(mostCommentedFilmListContainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}
