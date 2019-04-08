<template>
  <v-flex sm12 v-if="error && error != ''">
    <material-notification
            class="mb-3"
            color="error"
    >
      {{error}}
    </material-notification>
  </v-flex>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: ''
    }
  }
}
</script>
