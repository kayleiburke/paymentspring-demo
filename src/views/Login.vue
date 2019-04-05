<template>
  <div class="app flex-row align-items-center full-page-background">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-4">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <flash-message variant="success"/>
                <flash-message variant="danger"/>
                <flash-message variant="warning"/>
                <form @submit.prevent="login()">
                  <div class="input-group mb-3">
                    <span class="input-group-addon"><i class="icon-user"/></span>
                    <input
                      v-model="username"
                      type="text"
                      class="form-control"
                      placeholder="Username">
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"><i class="icon-lock"/></span>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      placeholder="Password">
                  </div>
                  <div
                    v-if="error"
                    class="alert alert-danger">{{ error }}</div>
                  <p v-if="showProgressBar">
                    <b-progress
                      show-progress
                      animated>
                      <b-progress-bar :value="100">
                        Please wait...
                      </b-progress-bar>
                    </b-progress>
                  </p>
                  <div class="row">
                    <div class="col-6">
                      <button
                        :disabled="loginDisabled"
                        type="submit"
                        class="btn btn-primary px-4">Login</button>
                    </div>
                    <div class="col-6 text-right">
                      <a
                        role="button"
                        href="/forgot_password"
                        class="btn btn-link px-0">Forgot password?</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              class="card text-white bg-primary py-5 d-md-down-none"
              style="width:44%">
              <div class="card-body text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <a
                    role="button"
                    href="/register"
                    class="btn btn-primary active mt-3">Register Now!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<script>
export default {
  name: 'Login'
}
</script>-->

<script>
import { mapGetters } from 'vuex'
const LOGIN_URL = ''

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false,
      loginDisabled: false,
      showProgressBar: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser'])
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    },
    login () {
      this.loginDisabled = true
      this.showProgressBar = true

      var headers = {
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      }

      this.$http.post(LOGIN_URL, {}, { headers: headers })
        .then(request => this.loginSuccessful(request))
        .catch(error => this.loginFailed(error))
    },
    loginSuccessful (req) {
      this.showProgressBar = false

      if (!req.data.status.token) {
        this.loginFailed(req)
        return
      }
      this.error = false
      localStorage.token = req.data.status.token
      // TODO: store more information about user, such as permissions and roles
      localStorage.userInfo = JSON.stringify({
        id: req.data.status.id,
        firstName: req.data.status.first_name,
        lastName: req.data.status.last_name
      })
      this.$store.dispatch('login')

      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed (error) {
      if (error.response && error.response.data) {
        this.error = 'Login failed!'

        if (error.response.data.errors) {
          this.error = error.response.data.errors
        } else {
          if (typeof error.response.data === 'string' || error.response.data instanceof String) {
            this.error = error.response.data
          }
        }
      }

      this.loginDisabled = false
      this.showProgressBar = false
      this.$store.dispatch('logout')
      delete localStorage.token
    }
  }
}
</script>
