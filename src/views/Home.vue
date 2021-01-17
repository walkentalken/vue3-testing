<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ title }}</h2>
    <login />
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState({
      stateVar: 'testState'
    }),
    posts() {
      return this.$store.state.allPosts
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
