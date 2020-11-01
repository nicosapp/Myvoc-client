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
    term: {
      required: true,
      type: Object,
    },
  },
  computed: {
    createdAt() {
      return moment(this.term.created_at).format('LL')
    },
    updatedAt() {
      return moment(this.term.updated_at).format('LL')
    },
  },
}
</script>
