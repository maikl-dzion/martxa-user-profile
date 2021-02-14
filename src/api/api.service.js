import axios from "axios";

const API_URL = 'http://bolderfest.ru/user-profile/api/v1';
const AXIOS_HEADERS = {
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'multipart/form-data, apllication/json',
  'X-User-Jwt-Token' : '',
}

axios.defaults.headers = AXIOS_HEADERS;

// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Accept'] = 'application/json'
// axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
// axios.defaults.xsrfCookieName = 'csrftoken'

class ApiService {

  API_URL  = API_URL;
  HTTP_HEADERS = AXIOS_HEADERS;

  constructor(token='') {
      this.http = axios
      this.token = token
  }

  /**
   * Returns a axios configuration object given the following parameters
   * @param {String} method       HTTP Method
   * @param {String} url          Target URL
   * @param {Object} data         [Optional]: Body of the HTTP Post request
   * @param {Object} params       [Optional]: HTTP GET Parameters
   * @param {Object} extraConfig  [Optional]: Extra Axios configuration
   * @param {Object} headers      [Optional]: HTTP requests headers
   * @param {String} token        [Optional]: JWT Token
   *
   * @returns {Object}            Axios configuration object
   */
  makeAxiosConfig(method, url, { data={}, params={}, extraConfig={}, headers={}, token='' }) {

    headers = { ...headers, ...this.HTTP_HEADERS }

    if (token)
      headers['X-User-Jwt-Token'] = token

    return { method,  url, params, data, headers, ...extraConfig, }
  }

  /**
   * Makes a HTTP request
   * @param {String} method             HTTP Method
   * @param {String} url                Target URL
   * @param {Object} data               [Optional]: Body of the HTTP Post request
   * @param {Object} params             [Optional]: HTTP GET Parameters
   * @param {Object} extraConfig        [Optional]: Extra Axios configuration
   * @param {Object} headers            [Optional]: HTTP requests headers
   * @param {String} token              [Optional]: JWT Token
   * @param {String} responseProperty   [Optional]: Response property to return
   *
   * @returns {Object}            Response data from the server
   * @throws                      Exception to be captured
   */
  async request(method, url, { data={}, params={}, config={}, headers={}, token='', responseProperty='data' }) {
    const axiosConfig = this.makeAxiosConfig(method, url, { data, params, extraConfig: config, headers, token })

    try {
      const response = await this.http(axiosConfig)
      return response[responseProperty];
    } catch (error) {
      console.log('HTTP_ERROR', error);
      throw new Error(`[HTTP_ERROR] ApiService ${error}`);
    }
  }

  getToken() {
    return this.token
  }

  setToken(token) {
    this.token = token
  }

  getResourceUrl(url) {
    return this.API_URL + url
  }

  async get(uri) {
    const options = { token: this.getToken() }
    const url = this.getResourceUrl(uri)
    return this.request('GET', url, options)
  }

  async retrieve(uri) {
    const options = { token: this.getToken() }
    const url = this.getResourceUrl(uri)
    return this.request('GET', url, options)
  }

  async post(uri, data) {
    const options = { data , token: this.getToken() }
    const url = this.getResourceUrl(uri)
    return this.request('POST', url, options)
  }

  async put(uri, data) {
    const options = { data, token: this.getToken() }
    const url = this.getResourceUrl(uri)
    return this.request('PUT', url, options)
  }

  async delete(uri) {
    const options = { token: this.getToken() }
    const url = this.getResourceUrl(uri)
    return this.request('DELETE', url, options)
  }

  // handleError(error) {
  //   switch (error.response.status) {
  //     case 401:
  //       this.redirectTo(document, '/')
  //       break;
  //     case 404:
  //       this.redirectTo(document, '/404')
  //       break;
  //     default:
  //       this.redirectTo(document, '/500')
  //       break;
  //   }
  //   return Promise.reject(error)
  // }
  //
  // redirectTo(document, path) {
  //   document.location = path
  // }

}

export default ApiService


