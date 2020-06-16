<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent>
        <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Logout</v-toolbar-title>
        </v-app-bar>
        <v-card tile>
            <v-card-text class="pt-5">
                <v-row justify="center">
                    <v-col>
                        <p class="text-center">Do you really want to Logout?</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-row justify="space-around">
                            <v-btn tile
                                color="red accent-4"
                                class="white--text"
                                @click.prevent="closeLogoutModal"
                            >Cancel</v-btn>

                            <v-btn tile
                                color="primary"
                                class="white--text"
                                @click.prevent="logout"
                            >Logout</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { eventBus } from '../../../main.js'
export default {
    data() {
        return {
            dialog: false,
        }
    },
    created() {
        eventBus.$on('logoutDialog', (dialog) => {
            this.dialog = dialog
        })
        eventBus.$on('drawerLogoutDialog', (dialog) => {
            this.dialog = dialog
        })
    },
    methods: {
        closeLogoutModal() {
            this.dialog = false
        },
        logout() {
            this.$store.dispatch('logout')

            this.dialog = false
        }
    }
}
</script>