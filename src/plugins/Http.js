import Vue from 'vue'
import axios from 'axios'

const HEADER_JWT_TOKEN_NAME = 'X-User-Jwt-Token'

const axiosHeaders = {
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'multipart/form-data, apllication/json',
}

axiosHeaders[HEADER_JWT_TOKEN_NAME] = null

axios.defaults.headers = axiosHeaders

const Http = {

  install (Vue) {
    Vue.mixin({

      data () {
        return {
          apiUrl: 'http://bolderfest.ru/user-profile/api/v1'
        }
      },

      methods: {

        async send (url, method = 'get', data = null) {
          const _url = this.apiUrl + url
          const token = this.getToken()
          axios.defaults.headers[HEADER_JWT_TOKEN_NAME] = token
          const response = await axios[method](_url, data)
          return response.data
        },

        setToken (token) {
          localStorage.setItem(HEADER_JWT_TOKEN_NAME, token)
        },

        getToken () {
          return localStorage.getItem(HEADER_JWT_TOKEN_NAME)
        },

        // --- EVENT BUS -----
        sendEventBus (eventName, data = null) {
          this.$eventBus.$emit(eventName, data)
        },

        getEventBus (eventName, callBack) {
          this.$eventBus.$on(eventName, (item) => {
            callBack(item)
          })
        },

        // -- LOCAL STORE SERVICE
        store (key, value = null) {
          if (value) {
            localStorage.setItem(key, value)
          } else {
            return localStorage.getItem(key)
          }
        },

        storeRemove (key) {
          localStorage.removeItem(key)
        },

        saveResponse (response, successMessage = null, errorMessage = null, param = null) {

          this.setPreloader(false)

          let status = false
          let info   = {}
          let error  = {}
          let json   = {}

          let messageInfo = { message : successMessage, json : null }
          if(param && param.color)
            messageInfo['color'] = param.color;

          let errorJson   = { message : errorMessage, color : 'red' };

          if (response.error) {
            error = response.error
            console.log('Error Message : ', error);
            errorJson['json'] = error
            messageInfo = errorJson
            alert(error);
          } else {
            if (response.save_result)
              status = response.save_result
            else
              messageInfo = errorJson
          }

          this.setAlertInfo(messageInfo);

          return {
            status, error, info
          }
        }

      } // --- Methods --

    })
  }
}

export default Http
