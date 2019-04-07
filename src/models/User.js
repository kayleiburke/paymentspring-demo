// import JwtDecode from 'jwt-decode'

export default class User {
  // (since the token we're using is not JWT encoded and contains no meaningful information about the user...that is, the token is only used for authorization purposes)
  static from (userInfo) {
    try {
      // let obj = JwtDecode(token)
      // return new User(obj)
      return new User(userInfo)
    } catch (_) {
      return null
    }
  }

  constructor (userHash) {
    this.email = userHash.email
    this.admin = userHash.admin
  }

  get isAdmin () {
    return this.admin
  }
}
