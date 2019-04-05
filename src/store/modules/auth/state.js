import User from '@/models/User'

export default {
    user: localStorage.userInfo ? User.from(JSON.parse(localStorage.userInfo)) : User.from(localStorage.userInfo)
}