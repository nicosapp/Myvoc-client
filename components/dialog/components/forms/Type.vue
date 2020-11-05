<template>
  <v-select
    v-model="selected"
    :items="orderedItems"
    label="Type"
    filled
    item-value="name"
    item-text="name"
    :disabled="!items"
    :rules="[rules.required(items, selected)]"
    return-object
  >
    <template v-slot:selection="data">
      <!-- HTML that describe how select should render selected items -->
      {{ data.item.name | capitalize }}
    </template>
    <template v-slot:item="data">
      <!-- HTML that describe how select should render selected items -->
      {{ data.item.name | capitalize }}
    </template>
  </v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { rulesSelect as rules } from '@/plugins/formValidation'
import { orderBy as _orderBy } from 'lodash'
export default {
  props: {
    value: {
      required: false,
      default: null,
      type: String,
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
      items: 'config/types',
    }),
    orderedItems() {
      return _orderBy(this.items, 'order', 'asc')
    },
  },
  watch: {
    selected(newValue) {
      if (newValue) {
        this.$emit('input', newValue.name)
      }
    },
  },
  async mounted() {
    if (!this.items) {
      await this.$store.dispatch('config/getTypes')
    }
    this.selected = this.items.find((i) => i.name === this.value)
  },
}
</script>
