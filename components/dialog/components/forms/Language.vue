<template>
  <v-select
    v-model="selected"
    :items="orderedItems"
    label="Langue"
    filled
    item-text="name"
    item-value="slug"
    :disabled="disabled"
    :rules="[rules.required(items, selected)]"
    return-object
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { rulesSelect as rules } from '@/plugins/formValidation'
import { orderBy as _orderBy } from 'lodash'
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
      rules,
    }
  },

  computed: {
    ...mapGetters({
      items: 'config/dictionnaries',
    }),
    orderedItems() {
      return _orderBy(this.items, 'order', 'asc')
    },
  },

  watch: {
    selected(newValue) {
      if (newValue) this.$emit('input', newValue.slug)
    },
  },
  async mounted() {
    if (!this.items) {
      await this.$store.dispatch('config/getDictionnaries')
    }
    this.selected = this.items.find((i) => i.slug === this.value)
  },
}
</script>
