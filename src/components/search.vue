<template>
  <div class="w-100">
    <b-form-input
      list="my-list-id"
      placeholder="Search for an Event"
      v-model="text"
      @keyup="searchTrigger" />

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
      events: [{
        "id":"0",
        "createdAt":"2021-01-19T10:09:32.193Z",
        "name":"Enter a Name!",
        "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/catadeleon/128.jpg"
      }]
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