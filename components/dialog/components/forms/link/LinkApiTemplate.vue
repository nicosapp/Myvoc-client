<template>
  <LinkTemplate
    v-model="model"
    :label="label"
    :term="term"
    :endpoint="linkEndpoint"
    :filter="apiQuery"
    @input="$emit('input', model)"
  >
    <template v-slot:listItemContent="{ item }">
      <slot name="listItemContent" :item="item" />
    </template>

    <template v-slot:chipContent="{ item }">
      <slot name="chipContent" :item="item" />
    </template>
  </LinkTemplate>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    term: {
      required: true,
      type: Object,
    },
    label: {
      type: String,
      required: true,
    },
    linkEndpoint: {
      required: true,
      type: String,
    },
    query: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      model: this.value,
    }
  },

  methods: {
    async apiQuery(value, self) {
      if (self.loading) return
      self.loading = true
      try {
        const response = await this.query(value)
        if (response) {
          self.items = response.data
        }
      } catch (e) {}
      self.loading = false
    },
  },
}
</script>
