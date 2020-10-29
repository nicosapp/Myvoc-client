<template>
  <v-row class="mb-4">
    <v-col cols="4">
      <Level v-model="currentWord.level" />
    </v-col>
    <v-col cols="4">
      <Rating v-model="currentWord.note" />
    </v-col>
    <v-col cols="4">
      <Highlight v-model="currentWord.imp" />
    </v-col>
  </v-row>
</template>

<script>
import Highlight from '../Highlight'
import Rating from '../Rating'
import Level from '../Level'
export default {
  components: {
    Highlight,
    Rating,
    Level,
  },
  props: {
    value: {
      required: false,
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      currentWord: this.value,
    }
  },
  watch: {
    currentWord: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
