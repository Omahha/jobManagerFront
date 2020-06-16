<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent>
        <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Delete</v-toolbar-title>
        </v-app-bar>
        <v-card tile>
            <v-card-text class="pt-5">
                <v-row justify="center">
                    <v-col>
                        <p class="text-center">Do you really want to Delete this user?</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-row justify="space-around">
                            <v-btn tile
                                color="primary"
                                class="white--text"
                                @click.prevent="closeDeleteModal"
                            >Cancel</v-btn>

                            <v-btn tile
                                color="red accent-4"
                                class="white--text"
                                @click.prevent="deleteUser"
                            >Delete User</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { eventBus } from '../../../../main.js'
export default {
    data() {
        return {
            dialog: false,
            data: {}
        }
    },
    created() {
        eventBus.$on('deleteDialog', (dialog) => {
            this.dialog = dialog
        })
        eventBus.$on('deleteData', (deleteData) => {
            this.data = deleteData
        })
    },
    methods: {
        closeDeleteModal() {
            this.dialog = false
        },
        deleteUser() {
            this.$store.dispatch('deleteUser', this.data)
            
            this.dialog = false
        }
    }
}
</script>