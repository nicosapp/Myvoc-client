<template>
  <LinkTemplate
    v-model="model"
    :label="label"
    :term="term"
    :endpoint="linkEndpoint"
    :filter="filter"
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
    items: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      model: this.value,
    }
  },

  methods: {
    filter(v, self) {
      self.loading = true
      self.items = this.items.filter((e) => {
        return (e.name || '').toLowerCase().includes((v || '').toLowerCase())
      })
      self.loading = false
    },
  },
}
</script>
