<template>
  <div>
    <div v-if="show('term')" class="term-list-item px-2 d-flex align-baseline">
      <span v-if="index" class="index mr-2">{{ index }}.</span>
      <div
        class="term-item grey--text text--darken-3 cursor-pointer"
        @dblclick.prevent="click"
      >
        {{ term || 'Undefined' | fullTerm }}
      </div>
      <div v-if="show('native')">{{ term.fra }}</div>
      <v-spacer></v-spacer>
      <div style="width: 60%">
        <ViewTranslation
          v-if="show('translation')"
          :dictionnaries="filterTranslation"
          :with-label="false"
          :list="true"
          :term="term"
        />
      </div>
    </div>
    <TermListItemDefinition
      v-if="show('definition')"
      class="px-2"
      :term="term"
    />
    <TermListItemExample v-if="show('example')" class="px-2" :term="term" />
    <v-divider></v-divider>
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
    }),
  },
  methods: {
    click() {
      this.pushDialog({ edit: true, id: this.term.id })
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
  padding-top: 1px;
  padding-bottom: 1px;
  .term-item {
    font-weight: 700;
  }
  .index {
    font-style: italic;
    font-size: 0.6rem;
  }
}
</style>
