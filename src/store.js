import Vue from 'vue'
import Vuex from 'vuex'
import User from './store/User'

Vue.use(Vuex)

export default new Vuex.Store({
  //----------
  state: {
     preloder : false,
     preloaderMessage : 'Подождите, идет запрос к серверу',

     _alertColor   : 'green',
     _alertMessage : '',
     _alertJson    : {},
  },
  //----------
  mutations: {},
  //----------
  actions: {

    setPreloader(context, value ) {
      context.state.preloder = value
    },

    setAlertInfo(context, data ) {

        const color = (data.color) ? data.color : 'green'
        const timer = (data.timer) ? data.timer : 10000;
        const json  = (data.json)  ? data.json  : {};

        context.state._alertColor   = color
        context.state._alertMessage = data.message;
        context.state._alertJson    = json

        setTimeout(() => {
          context.state._alertColor   = 'green';
          context.state._alertMessage = '';
          context.state._alertJson    = {};
        }, timer)
    },

  },
  //---------
  getters : {

    getPreloader: state => {
      return state.preloder
    },

    getPreloaderMessage: state => {
      return state.preloaderMessage
    },

    alertColor: state => {
      return state._alertColor
    },

    alertMessage: state => {
      return state._alertMessage
    },

    alertJson: state => {
      if (Object.keys(state._alertJson).length == 0) {
        return null;
      }
      return state._alertJson
    },

  },
  //----------
  modules: {
     User
  }

})
