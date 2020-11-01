<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Langue"
    hide-details
    filled
    item-text="name"
    item-value="slug"
    :disabled="disabled"
    return-object
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      required: false,
      default: 'fra',
      type: String,
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
      items: 'config/dictionnaries',
    }),
  },

  watch: {
    selected(newValue) {
      if (newValue) this.$emit('input', newValue.slug)
    },
    items(items) {
      this.selected = this.items.find((i) => i.slug === this.value)
    },
  },
  mounted() {
    if (!this.items) {
      this.$store.dispatch('config/getDictionnaries')
    }
  },
}
</script>
