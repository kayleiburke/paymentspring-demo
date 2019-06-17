import Vue from 'vue'

export default {
    charge ({ commit, state }, data) {
        var headers = {'X-User-Token': state.auth.token, 'X-User-Email': state.auth.currentUser.email}
        return Vue.axios.post('/api/v1/payments', data, { headers: headers })
    }
}
