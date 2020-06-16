<template>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        width="300px"
        temporary>
        <v-list-item>
            <v-list-item-avatar>
                <img src="https://api.adorable.io/avatars/50/abott@adorable.png" alt="">
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">
                    Welcome! {{ userData.user }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{  userData.email }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav dense two-line>
            <v-list-item-group 
                active-class="grey--text text--darken-3">

                <v-list-item @click="toggleLogin" v-if="!isAuthenticated">
                    <v-list-item-avatar class="mx-5">
                        <v-icon>fas fa-sign-in-alt</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title class="subtitle-1">Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="toggleRegister" v-if="!isAuthenticated">
                    <v-list-item-avatar class="mx-5">
                        <v-icon>fas fa-edit</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title class="subtitle-1">Register</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/home" v-if="isAuthenticated">
                    <v-list-item-avatar class="mx-5">
                        <v-icon>fas fa-home</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title class="subtitle-1">Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                
                <v-list-item @click="toggleLogout" v-if="isAuthenticated">
                    <v-list-item-avatar class="mx-5">
                        <v-icon>fas fa-sign-out-alt</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="ml-5">
                        <v-list-item-title class="subtitle-1">Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { eventBus } from '../../../main';
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            drawer: false,
            userData: {
                user: 'Guest',
                email: null
            },
            loginDialog: false,
            logoutDialog: false,
            registerDialog: false
            
        }
    },
    computed: {
        ...mapGetters([
            'user', 'isAuthenticated'
        ])
    },
    created() {
        eventBus.$on('toggleNavDrawer', (info) => {
            this.drawer = info
        }),
        eventBus.$on('loginDialog', (dialog) => {
            this.loginDialog = dialog
        }),
        eventBus.$on('logoutDialog', (dialog) => {
            this.logoutDialog = dialog
        }),
        eventBus.$on('registerDialog', (dialog) => {
            this.registerDialog = dialog
        })

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
        toggleLogin() {
            this.loginDialog = true
            eventBus.$emit('drawerLoginDialog', this.loginDialog)
        },
        toggleLogout() {
            this.logoutDialog = true
            eventBus.$emit('drawerLogoutDialog', this.logoutDialog)
        },
        toggleRegister() {
            this.registerDialog = true
            eventBus.$emit('drawerRegisterDialog', this.registerDialog)
        },
        setValue(obj) {
            this.userData.user = obj.name
            this.userData.email = obj.email
        }
    }
}
</script>