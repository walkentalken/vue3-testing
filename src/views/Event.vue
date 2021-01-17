<template>
  <div class="event">
    <h1>This is an Event page</h1>
    <h2>{{ eventId }}</h2>
    <h3>Am I logged in? {{ loginState }}</h3>
    <h3>What is my user Id? {{ currentUserId }}</h3>
    <h3>My Name is {{ currentUserName }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Event',
  computed: {
    eventId() {
      return this.$route.params.id
    },
    loginState() {
      return this.$store.state.loggedin
    },
    currentUserId() {
      return this.$store.state.currentUser || 'Not logged in!'
    },
    currentUserName() {
      return this.$store.state.currentFullUser?.name || 'A man has no name!'
    }
  }
}
</script>
