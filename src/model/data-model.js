import AbstractObservable from '../utils/abstract-observable.js';
import { Method } from '../constants.js';
import { adaptToClient } from './adapters.js';

export default class DataModel extends AbstractObservable {
  #films = [];
  #apiService = null;
  #adaptToClient = adaptToClient;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(Method.GET);
  }

  updateTask = () => {
    this._notify(Method.PUT);
  }

  addTask = () => {
    this._notify(Method.POST);
  }

  deleteTask = () =>{
    this._notify(Method.DELETE);
  }
}
