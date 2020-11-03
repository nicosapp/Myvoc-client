<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Rating"
    filled
    item-text="name"
    item-value="name"
    :disabled="!items"
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      required: false,
      default: 'fra',
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
      items: 'config/ratings',
    }),
  },

  watch: {
    selected(newValue) {
      if (newValue) this.$emit('input', newValue)
    },
    items(items) {
      this.selected = this.items.find((i) => i.name === this.value)
    },
  },
  mounted() {
    if (!this.items) {
      this.$store.dispatch('config/getRatings')
    }
  },
}
</script>
