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
                      {{currentUser}}
                      <v-flex xs12>
                        <v-text-field
                                class="purple-input"
                                label="Email"
                                v-model="loginData.email"
                        />
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                                class="purple-input"
                                label="Password"
                                v-model="loginData.password"
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
                      <v-flex sm12 v-if="loginInProgress">
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
                                :disabled="loginInProgress"
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

export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      },
      error: false,
      loginDisabled: false,
      showProgressBar: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser', 'loginInProgress'])
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
      this.error = ''
      this.$store.dispatch('auth/login', this.loginData)
        .then(function() {
          this.$router.replace(this.$route.query.redirect || '/')
        }.bind(this))
        .catch(error => this.loginFailed(error))
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
    }
  }
}
</script>
