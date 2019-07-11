import Vue from 'vue'
import { getHeaders } from './helpers'

export default {
    charge ({ commit, state }, data) {
        return Vue.axios.post('/api/v1/payments', data, { headers: getHeaders(state) })
    },

    getPayments ({ commit, state }) {
        return Vue.axios.get('/api/v1/payments', { headers: getHeaders(state) })
    }
}
