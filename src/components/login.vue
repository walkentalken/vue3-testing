<template>
  <div>
    <h3>Am I logged in? {{ loginState }}</h3>
    <h3>What is my user Id? {{ currentUserId }}</h3>
    <h3>My Name is {{ currentUserName }}</h3>
    <div>
      <a @click="show()">show</a>
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
export default {
  name: 'login',
  data () {
    return {
      userId: this.$store.state.currentUser
    }
  },
  computed: {
    loginState() {
      return this.$store.state.loggedin
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
    }
  }
}
</script>