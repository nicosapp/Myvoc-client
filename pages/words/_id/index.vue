<template>
  <v-container>{{ word }}</v-container>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`words/${params.id}`)

    return {
      word: response.data.data,
    }
  },
  data() {
    return {
      word: null,
    }
  },
}
</script>
