<template>
  <LinkApiTemplate
    v-model="model"
    :label="label"
    :term="term"
    link-endpoint="translations"
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
    from: {
      type: String,
      required: false,
      default: 'fra',
    },
    to: {
      type: String,
      required: true,
    },
    onColumn: {
      type: String,
      required: false,
      default: 'lang',
    },
    label: {
      type: String,
      required: false,
      default: 'Link translation',
    },
    byNative: {
      type: Boolean,
      required: false,
      default: false,
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
      query.langue = this.to
      query.column = this.onColumn
      query.byNative = this.byNative
      return await this.$axios.$get(
        `terms/autocomplete?${queryString.stringify(query)}`
      )
    },
  },
}
</script>
