<template>
    
    <v-card tile>
        <v-card-title>Profile</v-card-title>
        <app-user-data-change-confirm-modal
            :data="data"
        ></app-user-data-change-confirm-modal>
        <v-row justify="center">
            <v-col cols="3">
                <v-card-text>
                    <transition name="fade" mode="out-in">
                        <v-img
                            :src="getImg(previewUrl)"
                            width="150"
                            height="200"
                            min-width="150"
                            min-height="200"
                        ></v-img>
                    </transition>
                </v-card-text>
            </v-col>
            <v-col cols="7">
                <v-card-text>
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
                            label="Email"
                            readonly
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
                            
                        ></v-file-input>
                    </v-form>
                </v-card-text>
            </v-col>
        </v-row>
        <v-row>
            <v-card-text>
                <v-row justify="space-around">
                    <v-btn
                        tile
                        to="/home"
                        color="red darken-3"
                        class="white--text"
                    >Cancel</v-btn>
                    <v-btn
                        tile
                        @click.prevent="profileChange"
                        :disabled="$v.$invalid">
                        Confirm Change
                    </v-btn>
                </v-row>
            </v-card-text>
        </v-row>
    </v-card>
    
</template>

<script>
import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators'
import { handleErrorsMixin, onFileChangeMixin } from '../../../formCheckMixin.js'
import { eventBus } from '../../../main.js'
import UserDataChangeConfirmModal from './modal/UserDataChangeConfirm'
import { mapGetters } from 'vuex'

const imgSize = (value) => !helpers.req(value) ||  value.size<2000000

export default {
    mixins: [handleErrorsMixin, onFileChangeMixin],
    data() {
        return {
            valid: true,
            data: {
                name: 'user1',
                email: 'test@test.com',
                photo: null
            },
            input: { 
                photoIcon: 'fas fa-camera-retro',
                clearIcon: 'fas fa-backspace'
            },
            dialog: {
                changeToggle: false
            },
            previewUrl: '/images/image1.jpg'
        }
    },
    components: {
        appUserDataChangeConfirmModal: UserDataChangeConfirmModal
    },
    validations: {
        data: {
            name: {
                required,
                minLen: minLength(3),
                maxLen: maxLength(20)
            },
            photo: {
                imgSize
            }
        }
    },
    computed: {
        nameErrors() {
            return this.handleErrors('name')
        },
        photoErrors() {
            return this.handleErrors('photo')
        },
        ...mapGetters([
            'user'
        ])

    },
    created() {
        let user = this.$store.getters.user
        if(user){
            this.setValue(user)
        }
    },
    watch: {
        user() {
            this.setValue(this.user)
        }
    },
    methods: {
        getImg(path) {
            return `${path}`
        },
        profileChange() {
            this.dialog.changeToggle = true
            eventBus.$emit('changeDialog', this.dialog.changeToggle)
        },
        setValue(obj) {
            this.data.name = obj.name
            this.data.email = obj.email
            this.previewUrl = obj.avatar
        }
    }
}
</script>