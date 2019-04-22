import * as MutationTypes from './mutation-types'
import User from '@/models/User'
import { set, toggle } from '@/utils/vuex'

export default {
    [MutationTypes.LOGIN] (state, data) {
        state.token = data.authentication_token
        state.paymentspringApiKey = data.paymentspring_api_key
        state.paymentspringPrivateApiKey = data.paymentspring_private_api_key
        state.currentUser = User.from(data)
    },
    [MutationTypes.LOGOUT] (state) {
        state.currentUser = null
        state.token = null
        state.paymentspringApiKey = null
        state.paymentspringPrivateApiKey = null
    },
    loginInProgress: set('loginInProgress')
}