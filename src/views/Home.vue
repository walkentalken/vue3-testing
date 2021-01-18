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
          variant="danger"
          v-b-modal.modal-1
          v-if="!loginState">
          Create an Account Now 
          <b-icon
            icon="exclamation-circle-fill"
            shift-v="2">
          </b-icon>
        </b-button>
        <b-button
          variant="info"
          href="/user"
          v-else>
          View Your Cart
        </b-button>
      </b-jumbotron>
    </b-row>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <b-card-group
      deck 
      v-for="(group, i) in groupedCards"
      :key="i"
      class="mb-5"
      >
      <event-card
        v-for="post in group"
        :key="post.id"
        :post="post"
        deck>
        <router-link :to="'/event/' + post.id">
          <event-card :post="post" />
        </router-link>
      </event-card>
    </b-card-group>
  </b-container>
</template>

<script>
import { chunk } from 'lodash-es'
import { defaultTickets } from '@/utils/defaultTickets'
import { customUserTickets } from '@/utils/customUserTickets'
import login from '@/components/login.vue'
import eventCard from '@/components/eventCard.vue'

export default {
  name: 'Home',
  components: {
    login,
    eventCard
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
    },
    groupedCards() {
      return chunk(this.posts, 3)
    }
  },
  methods: {
    login() {
      const id = this.userId
      this.$store.dispatch('loginSubmit', id)
    },
    async fetchPosts () {
      this.error = null
      this.loading = true

      // If we're logged in, get custom tickets
      if (this.$store.state.loggedin) {
        await customUserTickets()
        this.loading = false
      } else { // Get the default list
        await defaultTickets()
        this.loading = false
      }
    }
  }
}
</script>
