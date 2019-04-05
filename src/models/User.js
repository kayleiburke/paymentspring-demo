// import JwtDecode from 'jwt-decode'

export default class User {
  // TODO: modify this code so that we're creating a user from parameters other than a token
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

  // TODO: modify the constructor parameters to accommodate user information we want to store
  constructor (userHash) {
    this.id = userHash.id // eslint-disable-line camelcase
    this.admin = userHash.sysAdmin
    this.accountId = userHash.accountId
    this.accountName = userHash.accountName
    this.currentAccountId = userHash.currentAccountId
    this.currentAccountName = userHash.currentAccountName
    this.hasAccount = userHash.hasAccount
    this.firstName = userHash.firstName
    this.lastName = userHash.lastName
    this.username = userHash.username
    this.hasMultipleAccounts = userHash.hasMultipleAccounts
  }

  get isAdmin () {
    return this.admin
  }
}
