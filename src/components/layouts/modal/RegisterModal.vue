<template>
    <v-dialog
        v-model="dialog"
        max-width="600"
        persistent>
        <v-app-bar
            color="blue-grey darken-4"
            dark>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-app-bar>
        <v-card tile>
            <v-card-text class="pt-5">
                <v-row>
                    <v-col>
                        <v-form>
                            <v-text-field
                                v-model="data.name"
                                label="Name"
                                clearable
                                :clear-icon="input.clearIcon"
                                @blur="$v.data.name.$touch()"
                                :error-messages="nameErrors"
                            ></v-text-field>

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

                            <v-text-field
                                v-model="data.confirm"
                                type="password"
                                label="Confirm Password"
                                @blur="$v.data.confirm.$touch()"
                                :error-messages="confirmErrors"
                            ></v-text-field>

                            <v-file-input
                                v-model="data.photo"
                                :prepend-icon="input.photoIcon"
                                accept="image/*"
                                clearable
                                :clear-icon="input.clearIcon"
                                show-size
                                @blur="$v.data.photo.$touch()"
                                :error-messages="photoErrors"
                                @change="onFileChange"
                                @click:clear="previewUrl='/images/image1.jpg'"
                            ></v-file-input>

                        </v-form>
                    </v-col>
                    <v-col align-self="center">
                        <v-row>
                                <v-img
                                    :src="previewUrl"
                                    width="150"
                                    height="200"
                                    min-width="150"
                                    min-height="200"
                                ></v-img>
                        </v-row>
                        
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
                                @click.prevent="closeRegisterModal"
                            >Cancel</v-btn>

                            <v-btn tile
                                color="primary"
                                class="white--text"
                                @click.prevent="register"
                                :disabled="$v.$invalid"
                            >Register</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { eventBus } from '../../../main.js'
import { required, email, minLength, maxLength, helpers, sameAs } from 'vuelidate/lib/validators'
import { handleErrorsMixin, onFileChangeMixin } from '../../../formCheckMixin.js'

const imgSize = (value) => !helpers.req(value) ||  value.size<2000000

export default {
    mixins: [handleErrorsMixin, onFileChangeMixin],
    data() {
        return {
            dialog: false,
            data: {
                name: 'test1',
                email: 'test1@test.com',
                password: 'password',
                confirm: 'password',
                photo: null
            },
            input: { 
                photoIcon: 'fas fa-camera-retro',
                clearIcon: 'fas fa-backspace'
            },
            previewUrl: '/images/image1.jpg'
        }
    },
    validations: {
        data: {
            name: {
                required,
                minLen: minLength(3),
                maxLen: maxLength(20)
            },
            email: {
                required,
                email,
            },
            password: {
                required,
                minLen: minLength(4),
                maxLen: maxLength(20)
            },
            confirm: {
                same: sameAs(function() {
                    return this.data.password
                })
            },
            photo: {
                imgSize
            }
        }
    },
    created() {
        eventBus.$on('registerDialog', (dialog) => {
            this.dialog = dialog
        })
        eventBus.$on('drawerRegisterDialog', (dialog) => {
            this.dialog = dialog
        })
    },
    computed: {
        nameErrors() {
            return this.handleErrors('name')
        },
        photoErrors() {
            return this.handleErrors('photo')
        },
        emailErrors() {
            return this.handleErrors('email')
        },
        passwordErrors() {
            return this.handleErrors('password')
        },
        confirmErrors() {
            return this.handleErrors('confirm')
        }
    },
    methods: {
        closeRegisterModal() {
            this.data.name = null
            this.data.email = null
            this.data.password = null
            this.data.confirm = null,
            this.dialog = false
        },
        register() {
            this.$store.dispatch('register', {
                name: this.data.name,
                email: this.data.email,
                password: this.data.password,
                c_password: this.data.confirm,
                photo: this.data.photo
            })

            this.data.name = null
            this.data.email = null
            this.data.password = null
            this.data.confirm = null,
            this.dialog = false
        }
    }
}
</script>