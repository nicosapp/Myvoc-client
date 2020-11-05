<template>
  <v-select
    v-model="model"
    :items="orderedItems"
    menu-props="auto"
    label="Level"
    filled
    item-text="name"
    item-value="name"
    single-line
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderBy as _orderBy } from 'lodash'
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      model: this.value,
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/levels',
    }),
    orderedItems() {
      return _orderBy(this.items, 'order', 'asc')
    },
  },
  watch: {
    model(newValue) {
      this.$emit('input', newValue)
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getLevels')
  },
}
</script>
