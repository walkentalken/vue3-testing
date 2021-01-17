import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Event from '../views/Event.vue'
import { store } from '@/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/event/:id',
    name: 'Event',
    component: Event
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loginCookieState = window.$cookies.isKey('viaLogin') ? true : false
  store.dispatch('setLoginState', loginCookieState)
  const userIdValue = window.$cookies.isKey('viaLogin') ? window.$cookies.get('viaLogin') : null
  if (userIdValue) {
    store.dispatch('setUserId', userIdValue)
  }
  next()
})

export default router
