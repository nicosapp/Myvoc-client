<template>
  <LinkApiTemplate
    v-model="model"
    label="Synonym"
    :term="term"
    link-endpoint="synonyms"
    :query="query"
    @input="(v) => $emit('input', v)"
  >
    <template v-slot:listItemContent="{ item }">
      <ListItemContentShortTerm :item="item" />
    </template>

    <template v-slot:chipContent="{ item }">
      <ChipContentShortTerm :item="item" />
    </template>
  </LinkApiTemplate>
</template>

<script>
import queryString from 'query-string'
export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    term: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      model: this.value,
    }
  },

  methods: {
    async query(value) {
      const query = {}
      query.search = value
      query.langue = this.term.langue
      return await this.$axios.$get(
        `terms/autocomplete?${queryString.stringify(query)}`
      )
    },
  },
}
</script>
