<template>
  <div>
    <v-combobox
      v-model="model"
      no-filter
      :items="items"
      :search-input.sync="search"
      :loading="isLoading"
      filled
      item-text="lang"
      item-value="id"
      clearable
      :label="label"
      hide-no-data
      hide-selected
      :require="required"
    >
      <template v-slot:selection="data">
        {{ data.item.lang }}
      </template>
      <template v-slot:item="data">
        <v-list-item-content>
          <v-list-item-title>
            {{ data.item | fullWord }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <strong>{{ data.item.forme }}</strong>
            <i>{{ data.item.langue }}</i>
            {{ data.item.gram }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <!-- <v-list-item-content v-text="data.item.name"></v-list-item-content> -->
      </template>
    </v-combobox>
    <div>Search {{ search }}</div>
  </div>
</template>

<script>
import { debounce as _debounce } from 'lodash'
import queryString from 'query-string'
export default {
  props: {
    value: {
      required: false,
      default: '',
      type: String,
    },
    currentWord: {
      required: false,
      type: Object,
      default: () => {},
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    label: {
      required: false,
      type: String,
      default: 'Word',
    },
    preload: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      model: null,
      search: null,
      items: [],
      isLoading: false,
    }
  },
  watch: {
    search(value) {
      this.$emit('input', value)
      _debounce(this.apiQuery, 500)(value, this)
    },
  },
  created() {
    if (this.currentWord) {
      this.items.push(this.currentWord)
      this.model = this.currentWord

      // preload.push(this.currentWord)
    }
  },
  methods: {
    async apiQuery(value, self) {
      if (self.isLoading) return
      self.isLoading = true
      const query = {}
      query.search = value
      const response = await self.$axios.$get(
        `words/autocomplete?${queryString.stringify(query)}`
      )
      // console.log(response.data)
      if (response) {
        self.items = response.data
      }
      self.isLoading = false
    },
  },
}
</script>
