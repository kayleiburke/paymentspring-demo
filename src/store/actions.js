import Vue from 'vue'
import { getHeaders, getRecaptchaToken } from './helpers'
import { load } from "recaptcha-v3";

export default {
    charge ({ commit, state }, data) {
        return Vue.axios.post('/api/v1/payments', data, { headers: getHeaders(state) })
    },

    getPayments ({ commit, state }, data) {
        return Vue.axios.get('/api/v1/payments', { headers: getHeaders(state), params: { page: data.page, per_page: data.per_page } })
    },

    getPaymentChartData ({ commit, state }) {
        return Vue.axios.get('/api/v1/payments/chart_data', { headers: getHeaders(state) })
    },

    async verifyRecaptchaV3 (data) {
        const recaptcha = await load(process.env.RECAPTCHA_SITE_KEY)
        return recaptcha.execute(data.action).then(token => {
            return Vue.axios.post('/api/v1/recaptchas/verify', { token: token })
        })
    }
}
