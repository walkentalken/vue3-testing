<template>
  <div>
    <b-button
      v-b-modal.modal-1
      variant="danger"
      v-if="!loginState">
      Login
    </b-button>
    <div v-else>
      Hi {{ currentUserName }}! <b-button variant="info" href="/user">View Cart ({{ cartTotal }})</b-button> <b-button variant="secondary" @click="logout()">Log Out</b-button>
    </div>

    <b-modal id="modal-1" title="Create an Account!" hide-footer>
      <p class="my-4">Please pick a user ID (shorthand for normal un/pw auth)</p>
      <label for="user">Pick a User</label>
      <b-form-select id="user" v-model="userId" class="mb-3">
        <b-form-select-option value="1">1</b-form-select-option>
        <b-form-select-option value="2">2</b-form-select-option>
        <b-form-select-option value="3">3</b-form-select-option>
        <b-form-select-option value="4">4</b-form-select-option>
        <b-form-select-option value="5">5</b-form-select-option>
      </b-form-select>
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
    },
    cartTotal() {
      const cartItems = this.$store.state.cart
      return cartItems.length
    }
  },
  methods: {
    login() {
      const id = this.userId
      this.$store.dispatch('loginSubmit', id)
      this.$bvModal.hide('modal-1')
    },
    logout() {
      const id = this.currentUserId
      this.$store.dispatch('logoutSubmit', id)
    }
  }
}
</script>