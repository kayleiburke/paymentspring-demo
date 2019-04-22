
export default class User {
static from (userInfo) {
    try {
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
