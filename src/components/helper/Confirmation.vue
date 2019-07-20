<script>
    export default {
        render () {
            this.$store.dispatch('auth/confirm', { confirmation_token: this.$route.query.confirmation_token })
                .then(function (data) {
                    this.flash({ message: "Your account has been successfully confirmed. Please sign in.", variant: 'success' })
                    this.$router.replace(this.$route.query.redirect || '/')
                }.bind(this))
                .catch(function (error) {
                    this.flash({ message: "Account was not confirmed. Please try again.", variant: 'error' })
                    this.$router.replace(this.$route.query.redirect || '/')
                }.bind(this))
        }
    }
</script>