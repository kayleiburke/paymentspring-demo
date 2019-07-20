import * as MutationTypes from './mutation-types'
import Vue from 'vue'

export default {
  login ({ commit, dispatch }, data) {
    commit('loginInProgress', true)

    dispatch('verifyRecaptchaV3', { action: 'login' }, {root:true}).then(function(token) {
        var headers = {
            'Authorization': 'Basic ' + btoa(data.email + ':' + data.password)
        }

        return Vue.axios.post('/users/sign_in', {}, { headers: headers })
            .then(function(response) {
                commit(MutationTypes.LOGIN, response.data)
                return response.data
            })
    }).finally(() => commit('loginInProgress', false))
  },

  logout ({ state, commit }) {
    var headers = {'Authorization': 'Token token=' + state.token}
    Vue.axios.delete('/users/sign_out', { headers: headers })
        .catch(error => error)

    commit(MutationTypes.LOGOUT)
  },

  register ({ commit, dispatch }, data) {
      commit('registrationInProgress', true)

      return dispatch('verifyRecaptchaV3', { action: 'register' }, {root:true}).then(function(token) {
          return Vue.axios.post('/users', data)
              .then(function (response) {
                  return response.data
              })
      }).finally(() => commit('registrationInProgress', false))
  },

  confirm ({ commit, dispatch }, data) {
      commit('confirmationInProgress', true)

      return Vue.axios.get('/users/confirmation', { params: data })
          .then(function (response) {
              return response.data
          }).finally(() => commit('confirmationInProgress', false))
  }
}
