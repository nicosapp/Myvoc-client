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
      :menu-props="{
        bottom: true,
        left: true,
        overflowY: true,
        maxHeight: '200',
      }"
      @blur="blur"
      @input="input"
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
    <div>Model {{ model }}</div>
    <div>CurrentWord {{ currentWord }}</div>
  </div>
</template>

<script>
import { debounce as _debounce } from 'lodash'
import queryString from 'query-string'
export default {
  props: {
    value: {
      required: false,
      default: () => {},
      type: Object,
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
      currentWord: this.value,
    }
  },
  watch: {
    search(value) {
      if (value) {
        this.currentWord.lang = value
        this.model = null
      }
      _debounce(this.apiQuery, 500)(value, this)
    },
    currentWord: {
      deep: true,
      handler(value) {
        if (value) this.$emit('input', value)
      },
    },
  },
  created() {
    if (this.currentWord) {
      this.model = this.currentWord
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
        self.items = [...response.data]
      }
      self.isLoading = false
    },
    input(item) {
      if (item) {
        this.currentWord.lang = item.lang
        this.model = this.currentWord
      }
    },
    blur() {
      if (this.search) {
        this.currentWord.lang = this.search
        this.model = this.currentWord
      }
    },
  },
}
</script>
