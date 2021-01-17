import Vue from 'vue'
import Vuex from 'vuex'
import sharedMutations from 'vuex-shared-mutations'
import { customUserTickets } from '@/utils/customUserTickets'
import { userEndpoint } from '@/utils/userEndpoint'
const vue = new Vue()

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentFullUser: null,
    loggedin: false,
    allPosts: []
  },
  mutations: {
    setCurrentUser (state, userId) {
      state.currentUser = userId
      window.$cookies.set('viaLogin', userId, 60 * 60 * 24 * 30, '/') // One Month
      state.loggedin = true
      vue.$modal.hide('loginModal')
    },
    setCurrentUserId (state, userId) {
      state.currentUser = userId
      vue.$modal.hide('loginModal')
    },
    setCurrentUserObject (state, userObject) {
      state.currentFullUser = userObject
      vue.$modal.hide('loginModal')
    },
    newLogin: (state, loginBoolean) => {
      state.loggedin = loginBoolean
    },
    storePosts: (state, posts) => {
      state.allPosts = posts
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
    }
  },
  plugins: [sharedMutations({ predicate: ['setCurrentUser', 'setCurrentUserId', 'setCurrentUserObject'] })]
})