import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testState: 'default value goes here',
    loggedin: false,
    allPosts: []
  },
  getters: {
    initState: state => {
      return state.testState
    }
  },
  mutations: {
    newValue: (state, newMsg) => {
      state.testState = newMsg
      window.$cookies.set('viaLogin', true, 60 * 60 * 24 * 30) // One Month
      state.loggedin = true
    },
    newLogin: (state, loginBoolean) => {
      state.loggedin = loginBoolean
    },
    storePosts: (state, posts) => {
      state.allPosts = posts
    }
  }, 
  actions: {
    updateVar: ({ commit }, newMsg) => {
      commit('newValue', newMsg)
    },
    setLoginState: ({ commit }, loginBoolean) => {
      commit('newLogin', loginBoolean)
    },
    savePosts: ({ commit }, posts) => {
      commit('storePosts', posts)
    }
  }
})