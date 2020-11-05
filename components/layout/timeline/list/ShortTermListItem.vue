<template>
  <div
    class="term-list-item d-flex flex-column justify-center"
    :class="[backgroundColorClass]"
  >
    <div v-if="show('term')" class="px-2 d-flex align-baseline first-line">
      <span v-if="index" class="index mr-2">{{ index }}.</span>
      <div
        class="term-item grey--text text--darken-3 cursor-pointer"
        @click.prevent="edit"
      >
        {{ term || 'Undefined' | fullTerm }}
      </div>
      <div v-if="show('native')">{{ term.fra }}</div>
      <v-spacer></v-spacer>
      <div v-if="show('translation')" style="width: 60%">
        <ViewTranslation
          :dictionnaries="filterTranslation"
          :with-label="false"
          :list="true"
          :term="term"
        />
      </div>

      <RatingButtons :term="term" :rating="rating" />
    </div>
    <TermListItemDefinition
      v-if="show('definition')"
      class="px-2"
      :term="term"
    />
    <TermListItemExample v-if="show('example')" class="px-2" :term="term" />
  </div>
</template>

<script>
import editHelper from '@/mixins/edit'

import { mapGetters } from 'vuex'
export default {
  mixins: [editHelper],
  props: {
    term: {
      required: true,
      type: Object,
    },
    index: {
      required: false,
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      filterTranslation: 'filters/translation',
      filterDisplay: 'filters/display',
      rating: 'timeline/rating',
    }),
    backgroundColorClass() {
      if (this.term.cross_dico) return 'cross-dico'
      else if (this.term.imp > 0) return `highlight-${this.term.imp}`
      else if (this.term.note > 0) return `rating-${this.term.note}`
      return ''
    },
  },
  methods: {
    edit() {
      this.pushDialog({ edit: true, termId: this.term.id })
    },
    show(prop) {
      return this.filterDisplay.includes(prop)
    },
  },
}
</script>

<style lang="scss" scoped>
.term-list-item {
  font-size: 0.8rem;
  position: relative;
  min-height: 1.5rem;
  border-bottom: 1px solid lightgrey;
  .first-line {
    padding: 1px 0;
  }
  .term-item {
    font-weight: 700;
  }
  .index {
    font-style: italic;
    font-size: 0.6rem;
  }
}
</style>
