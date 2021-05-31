<template>
  <v-card-text class="text-center">
    <v-layout align-start justify-center row fill-height>
      <v-flex>
        <h1>
          Login
        </h1>
      </v-flex>
      <span text-sm-right>
          <router-link to="/register">
            <a
                    :class="{disabled: loginInProgress}"
            >Register</a>
          </router-link>
        </span>
    </v-layout>
    <p class="text-muted">Sign In to your account</p>
    <flash-message variant="success"/>
    <flash-message variant="error"/>
    <flash-message variant="warning"/>
    <v-form ref="loginForm" @submit.prevent="login()">
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field
                  class="purple-input"
                  label="Email"
                  :rules="[rules.required, rules.notEmpty, rules.isEmail]"
                  v-model="loginData.email"
                  :disabled="loginInProgress"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
                  class="purple-input"
                  label="Password"
                  :rules="[rules.required, rules.notEmpty]"
                  v-model="loginData.password"
                  :disabled="loginInProgress"
                  type="password"
          />
        </v-flex>
        <v-flex
                sm12
                v-for="error in errors" :key="error">
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
      </v-layout>
      <v-flex sm12>
        <v-btn
                color="success"
                round
                class="font-weight-light"
                :disabled="loginInProgress"
                type="submit"
        >Login</v-btn>
        <v-btn
                color="purple"
                round
                class="font-weight-light pull-right"
                :disabled="loginInProgress"
                @click="autoPopulate"
        >Try Me!</v-btn>
      </v-flex>
    </v-form>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex'
import { email } from 'vuelidate/lib/validators'
import { getErrorMessages } from "@/utils/errorHandlers"

export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      },
      errors: [],
      loginDisabled: false,
      showProgressBar: false,
      rules: {
        required: value => !!value || 'Field is required.',
        notEmpty: value => value.replace(/\s/g, "") != "" || 'Field is required.',
        isEmail: value => email(value) || 'Email is not valid'
      }
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
    isFormValid () {
      return this.$refs['loginForm'].validate()
    },

    checkCurrentLogin () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    },

    autoPopulate () {
      this.loginData = {
        email: "kaylei.burke@gmail.com",
        password: "*paymentspring*"
      }
    },

    login () {
      if (this.isFormValid()) {
        this.errors = []
        this.$store.dispatch('auth/login', this.loginData)
                .then(() => {
                  this.$router.replace(this.$route.query.redirect || '/')
                })
                .catch(error => {
                  console.log(error)
                  this.loginFailed(error)
                })
      }
    },

    loginFailed (error) {
      var errorMessages = getErrorMessages(error)
      this.errors = errorMessages.length > 0 ? errorMessages : ['Login failed!']
    }
  }
}
</script>
