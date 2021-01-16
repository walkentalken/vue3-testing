<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ title }}</h2>
    <h3>Am I logged in? {{ loginState }}</h3>
    <div>
      <a @click="message('updated state')">{{ stateVar }}</a>
    </div>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-for="post in posts" :key="post.id" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultTickets } from '@/utils/defaultTickets'

export default {
  name: 'HelloWorld',
  data () {
    return {
      loading: false,
      posts: [],
      error: null
    }
  },
  props: {
    msg: String
  },
  mounted () { // mounted hook to run after login state determined
    this.fetchPosts()
  },
  computed: {
    title() {
      return process.env.VUE_APP_TITLE
    },
    ...mapState({
      stateVar: 'testState'
    }),
    loginState() {
      const login = this.$store.state.loggedin
      if (!login) {
        const loginCookie = window.$cookies.isKey('viaLogin') ? window.$cookies.get('viaLogin') : false
        this.$store.dispatch('setLoginState', loginCookie)
        return loginCookie
      } else {
        return true
      }
    }
  },
  methods: {
    message(msg) {
      this.$store.dispatch('updateVar', msg)
    },
    async fetchPosts () {
      this.error = null
      this.loading = true

      // If we're logged in, get custom tickets
      if (this.$store.state.loggedin) {
        console.log('fetch custom tickets')
        const customTickets = await defaultTickets()
        this.posts = customTickets
        this.loading = false
      } else { // Get the default list
        console.log('fetch default tickets')
        const standardTickets = await defaultTickets()
        this.posts = standardTickets
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
