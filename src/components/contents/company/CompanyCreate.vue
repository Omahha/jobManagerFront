<template>
    <div>
        <v-card tile>
            <v-card-title>Create Company</v-card-title>
            <v-row justify="center">
                <v-col cols="6">
                    <v-card-text>
                        <v-form 
                            ref="form"
                            v-model="valid">

                            <v-text-field
                                v-model="data.name"
                                label="Name"
                                clearable
                                :clear-icon="input.clearIcon"
                                @blur="$v.data.name.$touch()"
                                :error-messages="nameErrors"
                            ></v-text-field>

                            <v-text-field
                                v-model="data.address"
                                label="Address"
                                clearable
                                :clear-icon="input.clearIcon"
                                @blur="$v.data.address.$touch()"
                                :error-messages="addressErrors"
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
                                @click:clear="previewUrl='/images/image2.jpg'"
                            ></v-file-input>

                            
                        </v-form>
                    </v-card-text>
                </v-col>
                <v-col cols="5">
                    <transition name="fade" mode="out-in">
                        <v-img
                            v-if="previewUrl"
                            :src="previewUrl"
                        ></v-img>
                    </transition>
                </v-col>
            </v-row>
            <v-row>
                <v-card-text>
                    <v-row justify="space-around">
                        <v-btn
                            tile
                            to="/companies"
                            color="red darken-3"
                            class="white--text"
                        >Cancel</v-btn>
                        <v-btn
                            tile
                            @click.prevent="createCompany"
                            :disabled="$v.$invalid">
                            Create
                        </v-btn>
                    </v-row>
                    
                </v-card-text>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators'
import { handleErrorsMixin, onFileChangeMixin } from '../../../formCheckMixin.js'
const imgSize = (value) => !helpers.req(value) ||  value.size<2000000

export default {
    mixins: [handleErrorsMixin, onFileChangeMixin],
    data() {
        return {
            valid: true,
            data: {
                    name: null,
                    address: null,
                    photo: null,
            },
            input: { 
                photoIcon: 'fas fa-camera-retro',
                clearIcon: 'fas fa-backspace'
            },
            previewUrl: '/images/image2.jpg',
        }
    },
    validations: {
        
        data: {
            name: {
                required,
                minLen: minLength(3),
                maxLen: maxLength(20)
            },
            address: {
                required,
                maxLen: maxLength(100)
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
        addressErrors() {
            return this.handleErrors('address')
        },
        photoErrors() {
            return this.handleErrors('photo')
        },
    },
    methods: {
        createCompany() {
            this.$store.dispatch('createCompany', {
                name: this.data.name,
                address: this.data.address,
                logo: this.data.photo,
            })
        }
    }
}
</script>

<style scoped>
.fade-enter-active {
    animation: forwards fade-in .7s;
}
.fade-leave-active {
    animation: forwards fade-out .7s;
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>