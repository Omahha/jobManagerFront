<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent>
        <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Login</v-toolbar-title>
        </v-app-bar>
        <v-card tile>
            <v-card-text class="pt-5">
                <v-form>
                    <v-text-field
                        v-model="data.email"
                        type="text"
                        label="Email"
                        @blur="$v.data.email.$touch()"
                        :error-messages="emailErrors"
                    ></v-text-field>
                    <v-text-field
                        v-model="data.password"
                        type="password"
                        label="Password"
                        @blur="$v.data.password.$touch()"
                        :error-messages="passwordErrors"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-row justify="space-around">
                            <v-btn tile
                                color="red accent-4"
                                class="white--text"
                                @click.prevent="closeLoginModal"
                            >Cancel</v-btn>

                            <v-btn tile
                                color="primary"
                                class="white--text"
                                @click.prevent="login"
                                :disabled="$v.$invalid"
                            >Login</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { eventBus } from '../../../main.js'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { handleErrorsMixin } from '../../../formCheckMixin.js'

export default {
    mixins: [ handleErrorsMixin ],
    data() {
        return {
            dialog: false,
            data: {
                email: 'test@test.com',
                password: 'password'
            }
        }
    },
    validations: {
        data: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLen: minLength(4),
                maxLen: maxLength(20)
            }
        }
    },
    created() {
        eventBus.$on('loginDialog', (dialog) => {
            this.dialog = dialog
        })
        eventBus.$on('drawerLoginDialog', (dialog) => {
            this.dialog = dialog
        })
        
    },
    computed: {
        emailErrors() {
            return this.handleErrors('email')
        },
        passwordErrors() {
            return this.handleErrors('password')
        }
    },
    methods: {
        closeLoginModal() {
            this.data.email = null
            this.data.password = null
            this.dialog = false
        },
        login() {
            this.$store.dispatch('login', {
                email: this.data.email,
                password: this.data.password
            })

            this.data.email = null
            this.data.password = null
            this.dialog = false
        }
    }
}
</script>