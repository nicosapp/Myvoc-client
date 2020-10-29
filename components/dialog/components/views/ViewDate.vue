<template>
  <div class="text-subtitle-2">
    <div class="d-flex justify-space-around text--disabled">
      <div>{{ createdAt }}</div>
      <div>{{ updatedAt }}</div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    word: {
      required: true,
      type: Object,
    },
  },
  computed: {
    createdAt() {
      return moment(this.word.created_at).format('LL')
    },
    updatedAt() {
      return moment(this.word.updated_at).format('LL')
    },
  },
}
</script>
