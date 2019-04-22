<template></template>

<script>
    export default {
        name: 'Logout',
        created () {
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        }
    }
</script>
