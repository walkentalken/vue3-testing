<template>
  <div>
    <h3>Am I logged in? {{ loginState }}</h3>
    <h3>What is my user Id? {{ currentUserId }}</h3>
    <h3>My Name is {{ currentUserName }}</h3>

    <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
      <label for="user">Pick a User</label>
      <select id="user" v-model="userId">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <b-button @click="login()">Log on</b-button>
    </b-modal>
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
    }
  }
}
</script>