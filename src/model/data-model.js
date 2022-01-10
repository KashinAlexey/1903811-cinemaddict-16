import AbstractObservable from '../utils/abstract-observable.js';
import { adaptToClient } from '../service/adapter-client.js';
import { adaptToServer } from '../service/adapter-server.js';
import { adaptCommentsToClient } from '../service/adapter-client.js';
import { DataEvent, Url } from '../constants.js';

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

  init = async () => {
    try {
      const films = await this.#apiService.getData(Url.MOVIES);
      this.#films = films.map(this.#adaptToClient);
      this._notify(DataEvent.INIT);
    } catch(err) {
      this._notify(DataEvent.ERROR);
    }
  }

  getComments = async (id) => {
    try {
      const comments = await this.#apiService.getData(Url.COMMENTS, id);
      this.#comments = comments.map(this.#adaptCommentsToClient);
      this._notify(DataEvent.GETED, this.#comments);
    } catch(err) {
      this._notify(DataEvent.ERROR);
    }
  }

  deleteComment = async (id) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting data');
    }

    try {
      await this.#apiService.deleteData(Url.COMMENTS, id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(DataEvent.DELETED, this.#comments);
    } catch(err) {
      this._notify(DataEvent.ERROR);
    }
  }
}
