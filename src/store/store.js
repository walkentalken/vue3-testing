import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testState: 'default value goes here',
    loggedin: false
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
    }
  }, 
  actions: {
    updateVar: ({ commit }, newMsg) => {
      commit('newValue', newMsg)
    }
  }
})