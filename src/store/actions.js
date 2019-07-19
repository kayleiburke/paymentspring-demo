import Vue from 'vue'
import { getHeaders, getRecaptchaToken } from './helpers'
import { load } from "recaptcha-v3";

export default {
    charge ({ commit, state }, data) {
        return Vue.axios.post('/api/v1/payments', data, { headers: getHeaders(state) })
    },

    getPayments ({ commit, state }) {
        return Vue.axios.get('/api/v1/payments', { headers: getHeaders(state) })
    },

    async verifyRecaptchaV3 (data) {
        const recaptcha = await load(process.env.RECAPTCHA_SITE_KEY)
        return recaptcha.execute(data.action)
        // TODO: add call to back end to verify token returned by recaptcha login
    }
}
