<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Forme"
    filled
    hide-details
    item-value="name"
    item-text="name"
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
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/types',
    }),
  },
  watch: {
    selected(newValue) {
      if (newValue) {
        this.$emit('input', newValue.name)
      }
    },
    items(items) {
      this.selected = this.items.find((i) => i.name === this.value)
    },
  },
  mounted() {
    if (!this.items) {
      this.$store.dispatch('config/getTypes')
    }
  },
}
</script>
