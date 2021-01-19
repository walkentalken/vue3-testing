<template>
  <div>
    <b-form-input
      list="my-list-id"
      debounce="500"
      v-model="text"
      @change="searchTrigger" />

    <datalist id="my-list-id">
      <option v-for="(event, i) in events" :key="i">{{ event.name }}</option>
    </datalist>
  </div>
</template>

<script>
import { searchEvents } from '@/utils/searchEvents'

export default {
  data() {
    return {
      text: '',
      events: []
    }
  },
  methods: {
    async searchTrigger (text) {
      const debouncedResults = await searchEvents(text)
      this.events = debouncedResults
    }
  }
}
</script>