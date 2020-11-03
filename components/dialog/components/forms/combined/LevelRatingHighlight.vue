<template>
  <div class="d-flex">
    <Level v-model="currentTerm.level" class="flex-grow-1 mr-2" />
    <Rating v-model="currentTerm.note" class="flex-grow-1 mx-2" />
    <Highlight v-model="currentTerm.imp" class="flex-grow-1 ml-2" />
  </div>
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
      currentTerm: this.value,
    }
  },
  watch: {
    currentTerm: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
