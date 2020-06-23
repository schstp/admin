import Vue from 'vue'
import Vuex from 'vuex'
import ApiClient from '../partials/api.js'
import actions from './actions.js'
import mutations from './mutations.js'
import { genres, prices, durations } from '../partials/static_data.js'
import { TheaterSpectacles } from '../partials/models.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiClient: ApiClient,
    token: localStorage.getItem('token') || null,
    user: {},
    theaterId: 8,
    mainPagePremieres: new TheaterSpectacles([]),
    genres: genres,
    prices: prices,
    durations: durations,
    // fake data
    spectacles: [
    ]
  },
  mutations,
  actions,
  getters: {
    api: state => state.apiClient,
    isLoggedIn: state => !!state.token
  },
  modules: {
  }
})
