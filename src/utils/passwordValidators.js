export const minLength = function (value) {
    return value && value.length >= 8
}

export const hasSpecialCharacter = function (value) {
    return /[@#$%^&.+=*]/.test(value)
}

export const hasLowercaseLetter = function (value) {
    return /[a-z]/.test(value)
}

export const hasUppercaseLetter = function (value) {
    return /[A-Z]/.test(value)
}

export const hasNumber = function (value) {
    return /[0-9]/.test(value)
}