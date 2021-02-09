import Vue from 'vue'
import axios from 'axios'

const HEADER_JWT_TOKEN_NAME = 'X-User-Jwt-Token'

const axiosHeaders = {
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
}

axiosHeaders[HEADER_JWT_TOKEN_NAME] = null

axios.defaults.headers = axiosHeaders

const HttpService = {

  install (Vue) {
    Vue.mixin({

      data () {
        return {
          apiUrl: 'http://bolderfest.ru/foldin-test-app/api/public/v1'
        }
      },

      created () {
        this.setToken(null)
      },

      methods: {

        async send (url, method = 'get', data = null) {
          const _url = this.apiUrl + url
          const token = this.getToken()
          axios.defaults.headers[HEADER_JWT_TOKEN_NAME] = token
          const response = await axios[method](_url, data)
          return response
        },

        setToken (token) {
          localStorage.setItem(HEADER_JWT_TOKEN_NAME, token)
        },

        getToken () {
          return localStorage.getItem(HEADER_JWT_TOKEN_NAME)
        }

      } // --- Methods --

    })
  }
}

export default HttpService
