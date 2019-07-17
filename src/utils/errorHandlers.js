export const getErrorMessages = function (error) {
    if (error.response && error.response.data) {
        if (error.response.data.errors) {
            return error.response.data.errors
        } else {
            if (typeof error.response.data === 'string' || error.response.data instanceof String) {
                return [error.response.data]
            }
        }
    } else
        return []
}