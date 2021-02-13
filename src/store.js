import Vue from 'vue'
import Vuex from 'vuex'

import User from './store/User'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
     preloder : false,
     preloaderMessage : 'Сохраняем данные'
  },

  mutations: {},

  actions: {},

  modules: {
    user : User
  }

})
