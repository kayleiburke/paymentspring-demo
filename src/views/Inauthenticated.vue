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
                                <v-fade-transition mode="out-in">
                                    <router-view></router-view>
                                </v-fade-transition>
                            </v-card-text>
                        </material-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>

<script>
</script>
