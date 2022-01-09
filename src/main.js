import { AUTHORIZATION } from './constants.js';
import ApiService from './service/api-service.js';
import DataModel from './model/data-model.js';
import { END_POINT } from './constants.js';
import MainPresenter from './presenter/main-presenter.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const dataModel = new DataModel(new ApiService(END_POINT, AUTHORIZATION));
const mainPresenter = new MainPresenter(dataModel, siteHeaderElement, siteMainElement, siteFooterElement, siteBodyElement);
dataModel.init();
mainPresenter.init();
