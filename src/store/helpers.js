export const getHeaders = function (state) {
    return {'X-User-Token': state.auth.token, 'X-User-Email': state.auth.currentUser.email, 'Authorization': 'Token token=' + state.auth.token }
}

