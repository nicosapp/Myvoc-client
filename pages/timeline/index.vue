<template>
  <div>
    <div class="text-subtitle-2 grey lighten-3 pa-3">
      <template v-if="total"> Terms found ({{ total }}) </template>
      <template v-else>
        Sorry, we did not find any terms for this request
      </template>
    </div>
    <LoadingCircular v-if="!terms" height="100vh" />
    <div v-else :style="`column-count: ${filterColumn}`" style="column-gap: 0">
      <!-- Short or Long       -->
      <component
        :is="`${term.term}-term-list-item`"
        v-for="(term, index) in terms"
        :key="term.id"
        style="break-inside: avoid-column"
        :term="term"
        :index="index + 1"
      />
    </div>
  </div>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import LongTermListItem from '@/components/layout/timeline/list/LongTermListItem'
import ShortTermListItem from '@/components/layout/timeline/list/ShortTermListItem'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    LongTermListItem,
    ShortTermListItem,
  },
  mixins: [timelineHelper],
  middleware: ['verified'],
  layout: 'timeline',
  async asyncData({ app, store }) {
    await store.dispatch('config/getDictionnaries')
    store.dispatch('config/getRatings')
    store.dispatch('config/getHighlights')
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    ...mapGetters({
      dictionnaries: 'config/dictionnaries',
    }),
  },
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'timeline')
    this.setFilters({
      translation: this.dictionnaries.map((d) => d.slug),
    })
    const column = this.$vuetify.breakpoint.mobile ? 1 : 2
    this.setFilters({ column })
  },

  methods: {
    ...mapActions({
      setFilters: 'filters/setFilters',
    }),
  },
}
</script>
