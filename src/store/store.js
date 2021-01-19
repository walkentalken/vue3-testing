import Vue from 'vue'
import Vuex from 'vuex'
import sharedMutations from 'vuex-shared-mutations'
import { customUserTickets } from '@/utils/customUserTickets'
import { defaultTickets } from '@/utils/defaultTickets'
import { userEndpoint } from '@/utils/userEndpoint'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentFullUser: null,
    loggedin: false,
    allPosts: [],
    currentEvent: null,
    cart: []
  },
  mutations: {
    setCurrentUser (state, userId) {
      state.currentUser = userId
      window.$cookies.set('viaLogin', userId, 60 * 60 * 24 * 30, '/') // One Month
      state.loggedin = true
    },
    logoutCurrentUser (state) {
      window.$cookies.remove('viaLogin')
      state.currentUser = null
      state.currentFullUser = null
      state.loggedin = false
    },
    setCurrentUserId (state, userId) {
      state.currentUser = userId
    },
    setCurrentUserObject (state, userObject) {
      state.currentFullUser = userObject
    },
    newLogin: (state, loginBoolean) => {
      state.loggedin = loginBoolean
    },
    storePosts: (state, posts) => {
      state.allPosts = posts
    },
    storeEvent: (state, event) => {
      state.currentEvent = event
    },
    addToCart: (state, eventObject) => {
      state.cart.push(eventObject)
    }
  }, 
  actions: {
    async loginSubmit ({ commit }, userId) {
      commit('setCurrentUser', userId)
      const currentUserObject = await userEndpoint(userId)
      commit('setCurrentUserObject', currentUserObject)
      const postList = await customUserTickets()
      commit('storePosts', postList)
    },
    async logoutSubmit ({ commit }) {
      commit('logoutCurrentUser')
      const defaultTicketList = await defaultTickets()
      commit('storePosts', defaultTicketList)
    },
    async setUserId ({ commit }, userId) {
      commit('setCurrentUserId', userId)
      const currentUserObject = await userEndpoint(userId)
      commit('setCurrentUserObject', currentUserObject)
    },
    setLoginState: ({ commit }, loginBoolean) => {
      commit('newLogin', loginBoolean)
    },
    savePosts: ({ commit }, posts) => {
      commit('storePosts', posts)
    },
    setCurrentEvent: ({ commit }, event) => {
      commit('storeEvent', event)
    },
    addItemToCart: ({ commit }, eventObject) => {
      commit('addToCart', eventObject)
    }
  },
  plugins: [sharedMutations({ predicate: ['setCurrentUser', 'logoutCurrentUser', 'setCurrentUserId', 'setCurrentUserObject'] })]
})