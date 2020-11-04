<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Rating"
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
      items: 'config/ratings',
    }),
  },

  watch: {
    selected(newValue) {
      if (newValue) this.$emit('input', newValue.name)
    },
  },
  async mounted() {
    if (!this.items) {
      await this.$store.dispatch('config/getRatings')
    }
    this.selected = this.items.find(
      (i) => parseInt(i.name) === parseInt(this.value)
    )
  },
}
</script>
