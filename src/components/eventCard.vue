<template>
  <b-card
    :title="post.title"
    :img-src="placeholderImg(post.title)"
    :img-alt="post.title"
    img-top
    align="left"
  >
    <b-card-text>
      Event Id: {{ post.id }}
    </b-card-text>

    <b-button
      v-if="!loginState"
      v-b-modal.modal-1
      href="#"
      variant="primary">
      Buy Ticket
    </b-button>

    <b-button
      disabled
      variant="info"
      v-else-if="alreadyAdded">
      Added!
    </b-button>

    <b-button
      v-else
      variant="primary"
      @click="addToCart()">
      Add to Cart!
    </b-button>

    <template #footer>
      <small class="text-muted">[x] tickets remaining! (Last updated 3 mins ago)</small>
    </template>
  </b-card>
</template>

<script>
import { find } from 'lodash-es'

export default {
  name: 'eventCard',
  props: {
    post: Object
  },
  computed: {
    loginState() {
      return this.$store.state.loggedin
    },
    alreadyAdded() {
      const cart = this.$store.state.cart
      const currentItem = this.post
      return find(cart, currentItem)
    }
  },
  methods: {
    placeholderImg(title) {
      const shortendTitle = title.slice(0, 8).replace(' ', '+')
      return `https://via.placeholder.com/300/150/?text=`+ shortendTitle
    },
    addToCart() {
      this.$store.dispatch('addItemToCart', this.post)
    }
  }
}
</script>