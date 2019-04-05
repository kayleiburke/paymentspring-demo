import * as MutationTypes from './mutation-types'

export default {
  login ({ commit }) {
    commit(MutationTypes.LOGIN)
  },

  logout ({ commit }) {
    commit(MutationTypes.LOGOUT)
  }
}
