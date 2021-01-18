<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.id }}</p>
    <img :src="placeholderImg(post.title)">
  </div>
</template>

<script>
export default {
  name: 'event',
  props: {
    post: Object
  },
  methods: {
    placeholderImg(title) {
      const shortendTitle = title.slice(0, 8).replace(' ', '+')
      return `https://via.placeholder.com/300/150/?text=`+ shortendTitle
    }
  }
}
</script>