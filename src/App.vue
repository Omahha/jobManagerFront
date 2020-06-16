<template>
  <v-app>
    
    <app-navbar></app-navbar>
    <app-navbar-drawer></app-navbar-drawer>
    <app-login-modal></app-login-modal>
    <app-register-modal></app-register-modal>
    <app-logout-modal></app-logout-modal>
    
    <v-container fluid style="margin-top:80px">
      <v-row justify="center">
        <v-col cols="10">
          <v-content>
            <transition name="slide" mode="out-in">
              <router-view></router-view>
            </transition>
          </v-content>
        </v-col>
      </v-row>
    </v-container>
    
  </v-app>
</template>

<script>
import Navbar from './components/layouts/nav/Navbar'
import NavbarDrawer from './components/layouts/nav/NavbarDrawer'
import LoginModal from './components/layouts/modal/LoginModal'
import LogoutModal from './components/layouts/modal/LogoutModal'
import RegisterModal from './components/layouts/modal/RegisterModal'

export default {
  components: {
    appNavbar: Navbar,
    appNavbarDrawer: NavbarDrawer,
    appLoginModal: LoginModal,
    appLogoutModal: LogoutModal,
    appRegisterModal: RegisterModal
  },

  data() {
    return {
      dialog: false,
    }
  },
  created() {
    this.$store.dispatch('tryAutoLogin')
  }
};
</script>

<style scoped>
.slide-enter-active {
  animation: slide-in 1s forwards;
}
.slide-leave-active {
  animation: slide-out 1s forwards;
}
@keyframes slide-in {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
@keyframes slide-out {
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(-30px);
    opacity: 0;
  }
}
</style>