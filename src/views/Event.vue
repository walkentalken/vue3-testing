<template>
  <div class="event">
    <h1>This is an Event page</h1>
    <h2>{{ eventId }}</h2>
    <login />
  </div>
</template>

<script>
import login from '@/components/login.vue'

export default {
  name: 'Event',
  components: {
    login
  },
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
