<template>
  <v-select
    v-model="selected"
    :items="items"
    label="Forme"
    filled
    @change="$emit('change', selected)"
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
      default: 'word',
      type: String,
    },
  },
  data() {
    return {
      selected: { name: this.value },
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/types',
    }),
  },
  watch: {
    selected(newValue) {
      this.$emit('input', newValue.name)
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getTypes')
  },
}
</script>
