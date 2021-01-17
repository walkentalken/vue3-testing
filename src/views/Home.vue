<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ title }}</h2>
    <h3>Am I logged in? {{ loginState }}</h3>
    <h3>What is my user Id? {{ currentUserId }}</h3>
    <h3>My Name is {{ currentUserName }}</h3>
    <div>
      <a @click="message('updated state')">{{ stateVar }}</a>
    </div>

    <div>
      <a @click="show()">show</a>
    </div>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-for="post in posts" :key="post.id" class="content">
      <router-link :to="'/event/' + post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.id }}</p>
        <img :src="placeholderImg(post.title)">
      </router-link>
    </div>

    <modal name="loginModal">
      <div slot="top-right">
        <button @click="hide()">
          x
        </button>
      </div>
      <div>
        <label for="user">Pick a User</label>
        <select id="user" v-model="userId">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button @click="login()">Log on</button>
      </div>
      <div>
        <a @click="hide()">hide</a>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultTickets } from '@/utils/defaultTickets'
import { customUserTickets } from '@/utils/customUserTickets'

export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      error: null,
      userId: null
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
      return this.$store.state.loggedin
    },
    posts() {
      return this.$store.state.allPosts
    },
    currentUserId() {
      return this.$store.state.currentUser || 'Not logged in!'
    },
    currentUserName() {
      return this.$store.state.currentFullUser?.name || 'A man has no name!'
    }
  },
  methods: {
    login() {
      const id = this.userId
      this.$store.dispatch('loginSubmit', id)
    },
    show () {
      this.$modal.show('loginModal')
    },
    hide () {
      this.$modal.hide('loginModal')
    },
    placeholderImg(title) {
      const shortendTitle = title.slice(0, 8).replace(' ', '+')
      return `https://via.placeholder.com/300/150/?text=`+ shortendTitle
    },
    async fetchPosts () {
      this.error = null
      this.loading = true

      // If we're logged in, get custom tickets
      if (this.$store.state.loggedin) {
        console.log('fetch custom tickets')
        await customUserTickets()
        this.loading = false
      } else { // Get the default list
        console.log('fetch default tickets')
        await defaultTickets()
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
