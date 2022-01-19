import AbstractObservable from '../utils/abstract-observable.js';
import { adaptToClient } from '../service/adapter-client.js';
import { adaptToServer } from '../service/adapter-server.js';
import { adaptCommentsToClient } from '../service/adapter-client.js';
import { DataEvent } from '../constants.js';
import { Url } from '../constants.js';

export default class DataModel extends AbstractObservable {
  #films = [];
  #comments = [];
  #apiService = null;
  #adaptToClient = adaptToClient;
  #adaptCommentsToClient = adaptCommentsToClient;
  #adaptToServer = adaptToServer;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }

  init = async () => {
    try {
      const films = await this.#apiService.getData(Url.MOVIES);
      this.#films = films.map(this.#adaptToClient);
      this._notify(DataEvent.INIT);
    } catch(err) {
      this._notify(DataEvent.ERROR_FILM);
    }
  }

  getComments = async (id) => {
    try {
      const comments = await this.#apiService.getData(Url.COMMENTS, id);
      this.#comments = comments.map(this.#adaptCommentsToClient);
      this._notify(DataEvent.GETED);
    } catch(err) {
      this._notify(DataEvent.ERROR_COMMENTS);
    }
  }

  deleteComment = async (id, filmId) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);
    const filmIndex = this.#films.findIndex((film) => film.id === filmId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting data');
    }

    try {
      await this.#apiService.deleteData(Url.COMMENTS, id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      const update = this.#comments.map((_comment) => _comment.id);
      this.#films[filmIndex].comments = update;
      this._notify(DataEvent.DELETED);
    } catch(err) {
      throw new Error('Can\'t deleted data');
    }
  }

  addComment = async (id, comment) => {
    const index = this.#films.findIndex((film) => film.id === id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting data');
    }

    try {
      const response = await this.#apiService.addData(Url.COMMENTS, id, comment);
      this.#comments = response.comments.map(this.#adaptCommentsToClient);
      const update = this.#comments.map((_comment) => _comment.id);
      this.#films[index].comments = update;
      this._notify(DataEvent.ADDED);
    } catch(err) {
      throw new Error('Can\'t added data');
    }
  }

  updateFilm = async (update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting data');
    }

    try {
      const response = await this.#apiService.updateData(Url.MOVIES, update.id, this.#adaptToServer(update));
      const updatedData = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        update,
        ...this.#films.slice(index + 1),
      ];
      this._notify(DataEvent.UPDATED, updatedData);
    } catch(err) {
      throw new Error('Can\'t update data');
    }
  }
}
