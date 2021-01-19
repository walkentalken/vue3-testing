<template>
  <b-container>
    <b-row class="mt-3" align-h="end">
      <login />
    </b-row>
    <b-row class="mt-3">
      <b-jumbotron
        :header="`Welcome to Event #${ eventId }`"
        :lead="eventDescription"
        class="w-100">
        <b-button
          variant="danger"
          v-b-modal.modal-1
          v-if="!loginState">
          Create an Account To Purchase Tickets 
          <b-icon
            icon="exclamation-circle-fill"
            shift-v="2">
          </b-icon>
        </b-button>
        <b-button
          variant="info"
          @click="addToCart(eventId)"
          v-else>
          {{ ticketButton }}
        </b-button>
      </b-jumbotron>
    </b-row>
  </b-container>
</template>

<script>
import login from '@/components/login.vue'
import { eventEndpoint } from '@/utils/eventEndpoint'

export default {
  name: 'Event',
  components: {
    login
  },
  data () {
    return {
      error: null,
      loading: false,
      event: null,
      eventInCart: false
    }
  },
  computed: {
    eventId() {
      return this.$route.params.id
    },
    loginState() {
      return this.$store.state.loggedin
    },
    eventDescription() {
      return this.$store.state.currentEvent?.title
    },
    ticketButton() {
      return this.eventInCart ? 'Added!' : 'Buy Tickets Now!'
    }
  },
  mounted () {
    this.fetchEvent()
  },
  methods: {
    async fetchEvent () {
      this.error = null
      this.loading = true
      
      await eventEndpoint(this.eventId)
      this.loading = false
    },
    addToCart(eventId) {
      console.log('eventId')
      console.log(eventId)
      this.eventInCart = true
    }
  }
}
</script>
