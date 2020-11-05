<template>
  <v-container>{{ term }}</v-container>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`terms/${params.id}`)

    return {
      term: response.data.data,
    }
  },
  data() {
    return {
      term: null,
    }
  },
}
</script>
