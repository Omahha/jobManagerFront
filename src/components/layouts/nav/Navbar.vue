<template>
    
        <v-app-bar
            app
            color="blue-grey darken-4"
            dark
        >
            <v-app-bar-nav-icon @click="toggleNavDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="display-1 font-weight-black">Job manager</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <img src="https://api.adorable.io/avatars/59/abott@adorable.png" alt="" v-if="auth">

                <v-hover v-slot:default="{ hover }" v-if="!auth">
                    <v-btn text 
                        @mouseover="navControlBtn.loginSelectedComponent='app-login-text'" 
                        @mouseleave="navControlBtn.loginSelectedComponent='app-login-icon'" 
                        :elevation="hover ? 16:0" min-width="107"
                        @click.stop="toggleLogin">
                        <transition name="fade" mode="out-in">
                            <component :is="navControlBtn.loginSelectedComponent">
                                <template v-slot:icon><v-icon>{{ navParts[0].icon }}</v-icon></template>
                                <template v-slot:text><span>{{ navParts[0].text }}</span></template>
                            </component>
                        </transition>
                    </v-btn>
                </v-hover>
                
                <v-hover v-slot:default="{ hover }" v-if="!auth">
                    <v-btn text 
                        @mouseover="navControlBtn.registerSelectedComponent='app-register-text'" 
                        @mouseleave="navControlBtn.registerSelectedComponent='app-register-icon'" 
                        :elevation="hover ? 16:0" min-width="107"
                        @click.stop="toggleRegister">
                        <transition name="fade" mode="out-in">
                            <component :is="navControlBtn.registerSelectedComponent">
                                <template v-slot:icon><v-icon>{{ navParts[1].icon }}</v-icon></template>
                                <template v-slot:text><span>{{ navParts[1].text }}</span></template>
                            </component>
                        </transition>
                    </v-btn>
                </v-hover>

                <v-hover v-slot:default="{ hover }" v-if="auth">
                    <v-btn text 
                        @mouseover="navControlBtn.homeSelectedComponent='app-home-text'" 
                        @mouseleave="navControlBtn.homeSelectedComponent='app-home-icon'" 
                        :elevation="hover ? 16:0" min-width="107"
                        to="/home">
                        <transition name="fade" mode="out-in">
                            <component :is="navControlBtn.homeSelectedComponent">
                                <template v-slot:icon><v-icon>{{ navParts[2].icon }}</v-icon></template>
                                <template v-slot:text><span>{{ navParts[2].text }}</span></template>
                            </component>
                        </transition>
                    </v-btn>
                </v-hover>

                <v-hover v-slot:default="{ hover }" v-if="auth">
                    <v-btn text 
                        @mouseover="navControlBtn.logoutSelectedComponent='app-logout-text'" 
                        @mouseleave="navControlBtn.logoutSelectedComponent='app-logout-icon'" 
                        :elevation="hover ? 16:0" min-width="107"
                        @click.stop="toggleLogout">
                        <transition name="fade" mode="out-in">
                            <component :is="navControlBtn.logoutSelectedComponent">
                                <template v-slot:icon><v-icon>{{ navParts[3].icon }}</v-icon></template>
                                <template v-slot:text><span>{{ navParts[3].text }}</span></template>
                            </component>
                        </transition>
                    </v-btn>
                </v-hover>
                
            </v-toolbar-items>
        </v-app-bar>
        
    
</template>

<script>
import NavbarIcon from './btn/NavbarIcon';
import NavbarText from './btn/NavbarText'
import { eventBus } from '../../../main';
export default {
    data() {
        return {
            navControlBtn: {
                loginSelectedComponent: 'app-login-icon',
                registerSelectedComponent: 'app-register-icon',
                homeSelectedComponent: 'app-home-icon',
                logoutSelectedComponent: 'app-logout-icon'
            },
            navDrawer: {
                toggle: false,
            },
            navParts: [
                {icon: 'fas fa-sign-in-alt', text: 'Login'},
                {icon: 'fas fa-edit', text: 'Register'},
                {icon: 'fas fa-home', text: 'Home'},
                {icon: 'fas fa-sign-out-alt', text: 'Logout'},
            ],
            dialog: {
                loginToggle: false,
                logoutToggle: false,
                registerToggle: false
            },
        }
    },
    components: {
        appLoginText: NavbarText,
        appLoginIcon: NavbarIcon,
        appHomeText: NavbarText,
        appHomeIcon: NavbarIcon,
        appLogoutText: NavbarText,
        appLogoutIcon: NavbarIcon,
        appRegisterText: NavbarText,
        appRegisterIcon: NavbarIcon
    },
    created() {
        eventBus.$on('drawerLoginDialog', (dialog) => {
            this.dialog.loginToggle = dialog
        })
        eventBus.$on('drawerLogoutDialog', (dialog) => {
            this.dialog.logoutToggle = dialog
        })
        eventBus.$on('drawerRegisterDialog', (dialog) => {
            this.dialog.RegisterToggle = dialog
        })
    },
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        toggleNavDrawer() {
            this.navDrawer.toggle = true
            eventBus.$emit('toggleNavDrawer', this.navDrawer.toggle)
        },
        toggleLogin() {
            this.dialog.loginToggle = true
            eventBus.$emit('loginDialog', this.dialog.loginToggle)
        },
        toggleLogout() {
            this.dialog.logoutToggle = true
            eventBus.$emit('logoutDialog', this.dialog.logoutToggle)
        },
        toggleRegister() {
            this.dialog.registerToggle = true
            eventBus.$emit('registerDialog', this.dialog.registerToggle)
        }
    }
}
</script>

<style scoped>
.fade-enter-active {
    animation: fade-in 0.2s forwards
}
.fade-leave-active {
    animation: fade-out 0.2s forwards
}
@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateX(-20px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
@keyframes fade-out {
    0% {
        opacity: 1;
        transform: translateX(0px);
    }
    100% {
        opacity: 0;
        transform: translateX(20px);
    }
}
</style>