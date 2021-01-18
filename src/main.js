import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VModal)
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
