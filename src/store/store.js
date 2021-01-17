import Vue from 'vue'
import Vuex from 'vuex'
import { customUserTickets } from '@/utils/customUserTickets'
const vue = new Vue()

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    loggedin: false,
    allPosts: []
  },
  mutations: {
    setCurrentUser (state, userId) {
      state.currentUser = userId
      window.$cookies.set('viaLogin', userId, true, 60 * 60 * 24 * 30) // One Month
      state.loggedin = true
      vue.$modal.hide('loginModal')
    },
    setCurrentUserId (state, userId) {
      state.currentUser = userId
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
      const postList = await customUserTickets()
      commit('storePosts', postList)
    },
    setLoginState: ({ commit }, loginBoolean) => {
      commit('newLogin', loginBoolean)
    },
    setUserId: ({ commit }, userId) => {
      commit('setCurrentUserId', userId)
    },
    savePosts: ({ commit }, posts) => {
      commit('storePosts', posts)
    }
  }
})