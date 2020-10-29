<template>
  <v-rating
    background-color="grey lighten-3"
    color="primary"
    length="5"
    size="30"
    readonly
    :value="rating"
  ></v-rating>
</template>

<script>
export default {
  props: {
    word: {
      required: true,
      type: Object,
    },
  },
  computed: {
    rating() {
      return this.word.note ? parseInt(this.word.note) : 0
    },
  },
}
</script>
