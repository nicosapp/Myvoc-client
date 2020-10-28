<template>
  <v-combobox
    v-model="model"
    :items="items"
    label="Category"
    multiple
    filled
    item-value="id"
    item-text="name"
    :search-input.sync="search"
    clearable
    return-object
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        {{ data.item.name | capitalize }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      {{ data.item.name | capitalize }}
    </template>
  </v-combobox>
</template>

<script>
import { mapGetters } from 'vuex'
import { get as _get } from 'lodash'
export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    word: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      model: this.value,
      search: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/categories',
    }),
  },

  watch: {
    model(newValue, oldValue) {
      if (_get(newValue, 'length') > _get(oldValue, 'length')) {
        this.link(newValue.slice(-1)[0])
      }
      return this.$emit('input', newValue)
    },
  },

  mounted() {
    if (!this.items) this.$store.dispatch('config/getCategories')
  },

  methods: {
    remove(item) {
      const index = this.model.indexOf(item)
      if (index >= 0) {
        this.unlink(this.model[index])
        this.model.splice(index, 1)
      }
    },

    link(category) {
      try {
        this.$axios.$post(`words/${this.word.id}/categories/${category.id}`)
        this.$notifier.success({ message: 'The category is now linked!' })
      } catch (e) {
        this.$notifier.error500()
      }
    },
    unlink(category) {
      try {
        this.$axios.$delete(`words/${this.word.id}/categories/${category.id}`)
        this.$notifier.success({ message: 'The category is now unlinked!' })
      } catch (e) {
        this.$notifier.error500()
      }
    },
  },
}
</script>
