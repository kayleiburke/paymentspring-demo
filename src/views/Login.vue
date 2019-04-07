<template>
  <v-app>
    <div class="full-page-background">
      <v-container
              fill-height
              fluid
              grid-list-xs>
        <v-layout
                justify-center
                align-center
                wrap
        >
          <v-flex
                  xs12
                  md4
          >
            <material-card class="v-card-profile partial-transparent">
              <v-card-text class="text-center">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <flash-message variant="success"/>
                <flash-message variant="danger"/>
                <flash-message variant="warning"/>
                <v-form @submit.prevent="login()">
                  <v-container py-0>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                                class="purple-input"
                                label="Username"
                                v-model="username"
                        />
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                                class="purple-input"
                                label="Password"
                                v-model="password"
                                type="password"
                        />
                      </v-flex>
                      <v-flex sm12 v-if="error">
                        <material-notification
                                class="mb-3"
                                color="error"
                        >
                          {{error}}
                        </material-notification>
                      </v-flex>
                      <v-flex sm12 v-if="showProgressBar">
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                      </v-flex>
                      <v-flex
                              sm12>
                        <v-btn
                                color="success"
                                round
                                class="font-weight-light"
                                :disabled="loginDisabled"
                                type="submit"
                        >Login</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </material-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
const LOGIN_URL = '/users/sign_in'

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

      if (!req.data.authentication_token) {
        this.loginFailed(req)
        return
      }
      this.error = false
      localStorage.token = req.data.authentication_token
      // TODO: store more information about user, such as permissions and roles
      localStorage.userInfo = JSON.stringify({
        email: req.data.email
      })
      this.$store.dispatch('auth/login')

      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed (error) {
      this.error = 'Login failed!'

      if (error.response && error.response.data) {
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
      this.$store.dispatch('auth/logout')
      delete localStorage.token
    }
  }
}
</script>
