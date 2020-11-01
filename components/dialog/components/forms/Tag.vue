<template>
  <LinkApiTemplate
    v-model="model"
    label="Tag"
    :term="term"
    link-endpoint="tags"
    :query="query"
    @input="(v) => $emit('input', v)"
  >
    <template v-slot:listItemContent="{ item }">
      <span class="text-capitalize">{{ item.name }}</span>
    </template>

    <template v-slot:chipContent="{ item }">
      <span class="text-capitalize">{{ item.name }}</span>
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
      query.tax = 'tag'
      return await this.$axios.$get(
        `taxonomies/autocomplete?${queryString.stringify(query)}`
      )
    },
  },
}
</script>
