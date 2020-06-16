<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent>
        <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Profile Data Change</v-toolbar-title>
        </v-app-bar>
        <v-card tile>
            <v-card-text class="pt-5">
                <v-row justify="center">
                    <v-col>
                        <p class="text-center">Are you sure you want to change the data?</p>
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
                                @click.prevent="closeChangeModal"
                            >Cancel</v-btn>

                            <v-btn tile
                                color="warning"
                                class="white--text"
                                @click.prevent="changeData"
                            >Change</v-btn>
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
        }
    },
    props: {
        data: Object
    },
    created() {
        eventBus.$on('changeDialog', (dialog) => {
            this.dialog = dialog
        })
        
    },
    computed: {
        name() {
            return this.data.name
        },
        email() {
            return this.data.email
        },
        photo() {
            return this.data.photo
        }
    },
    methods: {
        closeChangeModal() {
            this.dialog = false
        },
        changeData() {
            this.$store.dispatch('updateUserData', {
                name: this.name,
                email: this.email,
                avatar: this.photo
            })
            this.dialog = false
        }
    }
}
</script>