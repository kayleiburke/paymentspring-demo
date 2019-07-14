import * as MutationTypes from './mutation-types'
import Vue from 'vue'

export default {
  login ({ commit }, data) {
    commit('loginInProgress', true)
    var headers = {
      'Authorization': 'Basic ' + btoa(data.email + ':' + data.password)
    }

    return Vue.axios.post('/users/sign_in', {}, { headers: headers })
        .then(function(response) {
          commit(MutationTypes.LOGIN, response.data)
          return response.data
        })
        .finally(() => commit('loginInProgress', false))
  },

  logout ({ state, commit }) {
    var headers = {'Authorization': 'Token token=' + state.token}
    Vue.axios.delete('/users/sign_out', { headers: headers })
        .catch(error => error)

    commit(MutationTypes.LOGOUT)
  },

  register ({ commit }, data) {
      commit('registrationInProgress', true)

      return Vue.axios.post('/users', data)
          .then(function(response) {
              return response.data
          })
          .finally(() => commit('registrationInProgress', false))
  }
}
