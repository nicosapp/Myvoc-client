<template>
  <v-combobox
    v-model="model"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="Grammar"
    multiple
    filled
    medium-chips
    hide-no-data
    clearable
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        {{ data.item || capitalize }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      search: null,
      model: this.value,
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/grammars',
    }),
  },
  watch: {
    model(newValue) {
      this.$emit('input', newValue)
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getGrammars')
  },
  methods: {
    remove(item) {
      const index = this.model.indexOf(item)
      if (index >= 0) this.model.splice(index, 1)
    },
  },
}
</script>
