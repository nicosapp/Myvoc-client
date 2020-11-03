<template>
  <div>
    <div class="text-subtitle-2 grey lighten-3 pa-3">
      <template v-if="total"> Terms found ({{ total }}) </template>
      <template v-else>
        Sorry, we did not find any terms for this request
      </template>
    </div>
    <div :style="`column-count: ${filterColumn}`" style="column-gap: 0">
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
  async mounted() {
    this.$store.dispatch('bottomBar/setActive', 'timeline')
    await this.$store.dispatch('config/getDictionnaries')
    this.setFilters({
      translation: this.dictionnaries.map((d) => d.slug),
    })
  },

  methods: {
    ...mapActions({
      setFilters: 'filters/setFilters',
    }),
  },
}
</script>
