<template>
  <v-card-text class="text-center">
    <h1>Register</h1>
    <p class="text-muted">Register for an account</p>
    <flash-message variant="success"/>
    <flash-message variant="danger"/>
    <flash-message variant="warning"/>
    <v-form @submit.prevent="login()">
      <v-container py-0>
        <v-layout wrap>

        </v-layout>
      </v-container>
    </v-form>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
