<template>
  <LinkApiTemplate
    v-model="model"
    label="Example"
    :term="term"
    link-endpoint="examples"
    :query="query"
    @input="(v) => $emit('input', v)"
  >
    <template v-slot:listItemContent="{ item }">
      <ListItemContentLongTerm :item="item" />
    </template>

    <template v-slot:chipContent="{ item }">
      <ChipContentLongTerm :item="item" />
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
      model: this.value.filter((w) => w.langue === this.to),
    }
  },

  methods: {
    async query(value) {
      const query = {}
      query.search = value
      query.forme = 'example'
      query.column = 'def'
      query.langue = this.term.langue
      return await this.$axios.$get(
        `terms/autocomplete?${queryString.stringify(query)}`
      )
    },
  },
}
</script>
