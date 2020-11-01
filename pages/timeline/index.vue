<template>
  <div>
    <!-- {{ filterType }} {{ filterOrderBy }} {{ filterTaxonomy }}
        {{ filterDictionnary }} {{ filterDisplay }} {{ filterComponent }}
        {{ filterCrossDico }} {{ filterVisible }}
        <div>
          {{ filterCategory }}
          {{ filterGrammar }}
          {{ filterLevel }}
          {{ filterRating }}
          {{ filterHighlight }}
          {{ filterTag }}
          {{ filterDate }}
        </div> -->
    <div class="text-subtitle-2 grey lighten-3 pa-3">
      <template v-if="total"> Terms found ({{ total }}) </template>
      <template v-else>
        Sorry, we did not find any terms for this request
      </template>
    </div>
    <div :style="`column-count: ${filterColumn}`" style="column-gap: 0">
      <TermListItem
        v-for="(term, index) in terms"
        :key="term.id"
        :term="term"
        :index="index + 1"
      />
    </div>
  </div>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import TermListItem from './components/TermListItem'

export default {
  components: {
    TermListItem,
  },
  mixins: [timelineHelper],
  middleware: ['verified'],
  layout: 'timeline',

  data() {
    return {
      page: 1,
    }
  },

  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'timeline')
  },
}
</script>
