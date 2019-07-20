import User from '@/models/User'

export default {
    currentUser: localStorage.currentUser ? User.from(JSON.parse(localStorage.currentUser)) : User.from(localStorage.currentUser),
    token: localStorage.token,
    paymentspringApiKey: localStorage.paymentspringApiKey,
    loginInProgress: false,
    registrationInProgress: false,
    confirmationInProgress: false
}