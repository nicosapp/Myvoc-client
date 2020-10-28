<template>
  <div>
    <v-menu v-model="showMenu" left offset-y close-on-click :max-height="200">
      <template v-slot:activator>
        <v-text-field
          v-model="search"
          hide-details
          filled
          label="Word"
        ></v-text-field>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ item | fullWord }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <strong>{{ item.forme }}</strong>
              <i>{{ item.langue }}</i>
              {{ item.gram }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
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
      showMenu: false,
      items: [],
      isLoading: false,
      currentWord: this.value,
    }
  },
  watch: {
    search: {
      handler: _debounce(async function (value) {
        await this.apiQuery(value, this)
      }, 500),
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
      // if (self.isLoading) return
      // self.isLoading = true
      console.log(value)
      const query = {}
      query.search = value
      const response = await self.$axios.$get(
        `words/autocomplete?${queryString.stringify(query)}`
      )
      // console.log(response.data)
      if (response) {
        self.items = [...response.data]
        if (response.length) self.showMenu = true
      }
      // self.isLoading = false
    },
    // input(item) {
    //   if (item) {
    //     this.currentWord.lang = item.lang
    //     this.model = this.currentWord
    //   }
    // },
    // blur() {
    //   if (this.search) {
    //     this.currentWord.lang = this.search
    //     this.model = this.currentWord
    //   }
    // },
  },
}
</script>
