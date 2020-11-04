<template>
  <div v-if="timelineTermIndex >= 0" class="d-flex align-center">
    <v-btn text :disabled="prevDisabled" @click.prevent="navigate('prev')"
      >Prev</v-btn
    >
    <div>{{ timelineTermIndex + 1 }}</div>
    <v-btn text :disabled="nextDisabled" @click.prevent="navigate('next')"
      >Next</v-btn
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editHelper from '@/mixins/edit'

export default {
  mixins: [editHelper],
  props: {
    dialogIndex: {
      required: true,
      type: Number,
    },
    term: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      terms: 'timeline/terms',
    }),
    timelineTermIndex() {
      if (!this.terms || !this.term) return -1
      return this.terms.findIndex(
        (t) => parseInt(t.id) === parseInt(this.term.id)
      )
    },
    prevDisabled() {
      return this.timelineTermIndex <= 0
    },
    nextDisabled() {
      return this.timelineTermIndex >= this.terms.length - 1
    },
  },
  methods: {
    navigate(direction) {
      if (!this[`${direction}Disabled`]) {
        const i =
          direction === 'prev'
            ? this.timelineTermIndex - 1
            : this.timelineTermIndex + 1
        const term = this.terms[i]
        const index = this.dialogIndex
        const dialog = {
          termId: term.id,
          edit: true,
        }
        this.updateDialog({ index, dialog })
      }
    },
  },
}
</script>
