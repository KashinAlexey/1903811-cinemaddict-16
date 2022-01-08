import { DataEvent } from '../constants.js';

export default class MainPresenter {
  #dataModel = null;

  constructor(dataModel) {
    this.#dataModel = dataModel;
  }

  get films() {
    const films = this.#dataModel.films;
    return films;
  }

  init = () => {
    this.#dataModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (eventType) => {
    switch (eventType) {
      case DataEvent.INIT:
        //console.log(data);
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
