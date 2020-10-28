<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Langue"
    filled
    item-text="value"
    item-value="key"
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
  },

  data() {
    return {
      selected: this.value,
    }
  },

  computed: {
    ...mapGetters({
      items: 'config/dictionnaries',
    }),
  },

  watch: {
    selected(newValue) {
      this.$emit('input', newValue)
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getDictionnaries')
  },
}
</script>
