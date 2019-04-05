<template></template>

<script>
    export default {
        name: 'Logout',
        created () {
            var headers = {'Authorization': 'Token ' + localStorage.token}
            this.$http.post('/authorize/logout', {}, { headers: headers })
                .catch()

            delete localStorage.token
            delete localStorage.userInfo
            this.$store.dispatch('logout')

            this.$router.push('/login')
        }
    }
</script>
