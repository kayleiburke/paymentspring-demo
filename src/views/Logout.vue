<template></template>

<script>
    export default {
        name: 'Logout',
        created () {
            var headers = {'Authorization': 'Token token=' + localStorage.token}
            this.$http.delete('/users/sign_out', { headers: headers })
                .catch()

            delete localStorage.token
            delete localStorage.paymentspringApiKey
            delete localStorage.paymentspringPrivateApiKey
            delete localStorage.userInfo
            this.$store.dispatch('auth/logout')

            this.$router.push('/login')
        }
    }
</script>
