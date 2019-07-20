<template>
    <v-card-text class="text-center">
        <v-layout align-start justify-center row fill-height>
            <v-flex>
                <h2>
                    Please wait...
                </h2>
            </v-flex>
            <v-flex sm12 v-if="confirmationInProgress">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-card-text>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        mounted () {
            this.confirm()
        },
        computed: {
            ...mapGetters('auth', ['confirmationInProgress'])
        },
        methods: {
            confirm() {
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
    }
</script>