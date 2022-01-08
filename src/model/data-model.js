import AbstractObservable from '../utils/abstract-observable.js';
import { adaptToClient } from '../service/adapter-client.js';
import { adaptToServer } from '../service/adapter-server.js';
import { DataEvent, Url } from '../constants.js';

export default class DataModel extends AbstractObservable {
  #films = [];
  #apiService = null;
  #adaptToClient = adaptToClient;
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
      this._notify(DataEvent.GETED, comments);
    } catch(err) {
      this._notify(DataEvent.ERROR);
    }
  }
}
