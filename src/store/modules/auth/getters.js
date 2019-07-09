// store persistent data in local storage
export default {
    currentUser: state => state.currentUser,
    token: state => state.token,
    paymentspringApiKey: state => state.paymentspringApiKey,
    loginInProgress: state => state.loginInProgress
}