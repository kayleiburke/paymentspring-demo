<template>
  <router-view></router-view>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
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
        if (!this.currentUser && this.$route.path !== '/') {
          if (this.$route.path !== '/forgot_password' && this.$route.path !== '/reset_password' && this.$route.path !== '/register' &&
                  this.$route.path !== '/request_confirmation' && this.$route.path !== '/confirmation') {
            this.$router.push('/login')
          }
        }
      }
    }
  }
</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
