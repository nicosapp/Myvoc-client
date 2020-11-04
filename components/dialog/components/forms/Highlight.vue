<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Highlight"
    filled
    item-text="name"
    item-value="name"
    :disabled="!items"
    return-object
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      required: false,
      default: 0,
      type: [String, Number],
    },
    disabled: {
      required: false,
      default: true,
      type: Boolean,
    },
  },

  data() {
    return {
      selected: {},
    }
  },

  computed: {
    ...mapGetters({
      items: 'config/highlights',
    }),
  },

  watch: {
    selected(newValue) {
      if (newValue) this.$emit('input', newValue.name)
    },
    items(items) {
      this.selected = this.items.find((i) => i.name === this.value)
    },
  },
  async mounted() {
    if (!this.items) {
      await this.$store.dispatch('config/getHighlights')
    }
    this.selected = this.items.find(
      (i) => parseInt(i.name) === parseInt(this.value)
    )
  },
}
</script>
