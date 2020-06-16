<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent>
        <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Modify</v-toolbar-title>
        </v-app-bar>
        <v-card tile>
            <v-card-text class="pt-5">
                <v-row justify="center">
                    <v-col>
                        <p class="text-center">Do you really want to change this User's data?</p>
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
                                @click.prevent="closeModifyModal"
                            >Cancel</v-btn>

                            <v-btn tile
                                color="warning"
                                class="white--text"
                                @click.prevent="modify"
                            >Apply change</v-btn>
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
        eventBus.$on('modifyDialog', (dialog) => {
            this.dialog = dialog
        })
        eventBus.$on('modifyData', (modifyData) => {
            this.data = modifyData
        })
    },
    methods: {
        closeModifyModal() {
            this.dialog = false
        },
        modify() {
            this.$store.dispatch('modifyUserData', this.data)

            this.dialog = false
        }
    }
}
</script>