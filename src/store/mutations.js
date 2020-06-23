import { User, PlatformTheaters, TheaterSpectacles } from '../partials/models.js'

export default {
  setUser (state, { rowUser, token }) {
    state.user = User.produceUser(rowUser)
    state.token = token
    if (state.user.id === 2) state.theaterId = 8
    else if (state.user.id === 3) state.theaterId = 10
    else if (state.user.id === 4) state.theaterId = 11
    else if (state.user.id === 5) state.theaterId = 12
    else if (state.user.id === 6) state.theaterId = 13
    else if (state.user.id === 7) state.theaterId = 9
  },

  deauthorizeUser (state) {
    state.user = null
    state.token = null
  },

  setTheaters (state, rowTheaters) {
    state.theaters = PlatformTheaters.producePlatformTheaters(rowTheaters.theaters)
  },

  setTheaterSpectacles (state, rowSpectacles) {
    state.mainPagePremieres = TheaterSpectacles.produceTheaterSpectacles(rowSpectacles.spectacles)
  }
}
