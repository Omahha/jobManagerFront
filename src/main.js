import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueTextareaAutoSize from 'vue-textarea-autosize'
import axios from 'axios'

Vue.use(Vuelidate);

Vue.use(VueTextareaAutoSize);

axios.defaults.baseURL = 'http://jobmanagerapi.test:1443/api'

Vue.config.productionTip = false

export const eventBus = new Vue({

});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
