<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Langue"
    filled
    item-text="name"
    item-value="slug"
    :disabled="disabled"
    :rules="[select.required(items, selected)]"
    return-object
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import validationHelper from '@/mixins/helper/formValidationRules'
export default {
  mixins: [validationHelper],
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
  async mounted() {
    if (!this.items) {
      await this.$store.dispatch('config/getDictionnaries')
    }
    this.selected = this.items.find((i) => i.slug === this.value)
  },
}
</script>
