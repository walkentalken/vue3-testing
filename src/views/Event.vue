<template>
  <div class="event">
    <h1>This is an Event page</h1>
    <h2>{{ eventId }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Event',
  computed: {
    eventId() {
      return this.$route.params.id
    }
  }
}
</script>
