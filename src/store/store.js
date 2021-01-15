import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testState: 'default value goes here'
  },
  //showing things, not mutating state
  getters: {
    initState: state => {
      return state.testState
    }
  },
  //mutating the state
  //mutations are always synchronous
  mutations: {
    //showing passed with payload, represented as num
    newValue: (state, newMsg) => {
      state.testState = newMsg
    }
  }, 
  //commits the mutation, it's asynchronous
  actions: {
    // showing passed with payload, represented as asynchNum (an object)
    updateVar: ({ commit }, newMsg) => {
      commit('newValue', newMsg)
    }
  }
})