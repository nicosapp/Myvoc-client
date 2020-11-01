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
    term: {
      required: true,
      type: Object,
    },
  },
  computed: {
    rating() {
      return this.term.note ? parseInt(this.term.note) : 0
    },
  },
}
</script>
