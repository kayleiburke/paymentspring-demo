import * as MutationTypes from './mutation-types'
import User from '@/models/User'

export default {
    [MutationTypes.LOGIN] (state) {
        state.user = User.from(JSON.parse(localStorage.userInfo))
    },
    [MutationTypes.LOGOUT] (state) {
        state.user = null
    }
}