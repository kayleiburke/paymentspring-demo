import * as MutationTypes from './mutation-types'
import User from '@/models/User'
import { set, toggle } from '@/utils/vuex'
export default {
    // store persistent data in local storage
    [MutationTypes.LOGIN] (state, data) {
        localStorage.token = data.authentication_token
        localStorage.paymentspringApiKey = data.paymentspring_api_key
        localStorage.currentUser = JSON.stringify(User.from(data))

        state.token = data.authentication_token
        state.paymentspringApiKey = data.paymentspring_api_key
        state.currentUser = User.from(data)
    },
    [MutationTypes.LOGOUT] (state) {
        delete localStorage.currentUser
        delete localStorage.token
        delete localStorage.paymentspringApiKey

        state.currentUser = null
        state.token = null
        state.paymentspringApiKey = null
    },
    loginInProgress: set('loginInProgress'),
    registrationInProgress: set('registrationInProgress'),
    confirmationInProgress: set('confirmationInProgress')
}
