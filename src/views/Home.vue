<template>
  <b-container>
    <b-row class="mt-3" align-h="end">
      <login />
    </b-row>
    <b-row class="mt-3">
      <b-jumbotron
        :header="title"
        lead="We're the world’s largest secondary marketplace for tickets to live events. Prices are set by sellers and may be below or above face value.">
        <b-button
          variant="primary"
          v-b-modal.modal-1
          v-if="!loginState">
          Create an Account Now
        </b-button>
        <b-button
          variant="primary"
          href="/user"
          v-else>
          View Your Cart
        </b-button>
      </b-jumbotron>
    </b-row>
    <b-row class="mt-3">
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
    </b-row>
  </b-container>
</template>

<script>
import { defaultTickets } from '@/utils/defaultTickets'
import { customUserTickets } from '@/utils/customUserTickets'
import login from '@/components/login.vue'

export default {
  name: 'Home',
  components: {
    login
  },
  data () {
    return {
      loading: false,
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
    posts() {
      return this.$store.state.allPosts
    },
    loginState() {
      return this.$store.state.loggedin
    }
  },
  methods: {
    login() {
      const id = this.userId
      this.$store.dispatch('loginSubmit', id)
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
