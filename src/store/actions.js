import { Theater, TheaterSpectacles } from '../partials/models.js'

export default {
  async loginByToken ({ rootGetters, commit, state }) {
    const data = await rootGetters.api.getUserByToken()
    if (data) commit('setUser', { rowUser: data, token: state.token })
  },

  async authorizeUser ({ rootGetters, commit }, authorizationData) {
    const data = await rootGetters.api.authorizeUser({ data: authorizationData })
    if (data.has_erros) return false

    const rowUser = data.user
    const token = data.token
    rootGetters.api.setToken(token)
    commit('setUser', { rowUser, token })

    return true
  },

  async createUser ({ rootGetters }, rowUser) {
    try {
      const data = await rootGetters.api.createUser({ data: rowUser })
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async deauthorizeUser ({ rootGetters, commit }) {
    rootGetters.api.logout()
    commit('deauthorizeUser')
  },

  async getTheaters ({ rootGetters, commit }) {
    try {
      const rowTheaters = await rootGetters.api.getTheaters()
      commit('setTheaters', rowTheaters)
    } catch (err) {
      if (err.response.status === 404) this.$router.push('/404')
      throw err
    }
  },

  async getTheaterSpectacles ({ rootGetters, commit }, theaterId) {
    try {
      const data = await rootGetters.api.getSpectacles({ args: { theaterId: theaterId } })
      return Promise.resolve(TheaterSpectacles.produceTheaterSpectacles(data.spectacles))
    } catch (err) {
      if (err.response.status === 404) this.$router.push('/404')
      throw err
    }
  },

  async uploadSpectaclePoster ({ rootGetters, commit }, photoData) {
    try {
      const data = await rootGetters.api.uploadSpectaclePoster({ data: photoData })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async uploadSpectacleFirstExtraPhoto ({ rootGetters, commit }, photoData) {
    try {
      const data = await rootGetters.api.uploadSpectacleFirstExtraPhoto({ data: photoData })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async uploadSpectacleSecondExtraPhoto ({ rootGetters, commit }, photoData) {
    try {
      const data = await rootGetters.api.uploadSpectacleSecondExtraPhoto({ data: photoData })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async getTheater ({ rootGetters, commit }, theaterId) {
    try {
      const data = await rootGetters.api.getTheater({ args: { theaterId: theaterId } })
      return Promise.resolve(Theater.produceTheater(data.theater))
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async uploadTheaterPhoto ({ rootGetters, commit }, photoData) {
    try {
      const data = await rootGetters.api.uploadTheaterPhoto({ data: photoData })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async updateTheater ({ rootGetters, commit }, { theaterId, rawData }) {
    try {
      const data = await rootGetters.api.updateTheater({
        args: { theaterId: theaterId },
        data: rawData
      })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async createSpectacle ({ rootGetters, commit }, rawData) {
    try {
      const data = await rootGetters.api.addSpectacle({
        data: rawData
      })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  },

  async updateSpectacle ({ rootGetters, commit }, { spectacleId, rawData }) {
    try {
      const data = await rootGetters.api.updateSpectacle({
        args: { spectacleId: spectacleId },
        data: rawData
      })
      return Promise.resolve(data)
    } catch (err) {
      if (err.response.status === 404) return Promise.reject(err)
      throw err
    }
  }
}
