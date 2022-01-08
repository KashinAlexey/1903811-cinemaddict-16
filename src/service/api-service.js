const ServerMethod = {
  HEAD: 'HEAD',
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  getHeaders = async (url) => (
    await this.#load({
      url: url,
      method: ServerMethod.HEAD,
    })
  );

  getData = async (url, id) => {
    url = id ? `${url}/${id}` : url;
    return await this.#load({
      url: url,
    }).then(ApiService.parseResponse);
  }

  updateData = async (url, id, data) => (
    await this.#load({
      url: `${url}/${id}`,
      method: ServerMethod.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'}),
    }).then(ApiService.parseResponse)
  );

  addData = async (url, id, data) => (
    await this.#load({
      url: `${url}/${id}`,
      method: ServerMethod.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'}),
    }).then(ApiService.parseResponse)
  );

  deleteData = async (url, id) => (
    await this.#load({
      url: `${url}/${id}`,
      method: ServerMethod.DELETE,
    })
  );

  #load = async ({
    url,
    method = ServerMethod.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}

