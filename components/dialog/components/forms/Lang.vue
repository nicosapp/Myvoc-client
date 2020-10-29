<template>
  <div class="relative">
    <v-menu left offset-y close-on-click :max-height="200">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          hide-details
          filled
          v-bind="attrs"
          label="Word"
          v-on="on"
          @input="(v) => $emit('input', v)"
        >
        </v-text-field>
      </template>
      <v-list v-if="items.length">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click.prevent="edit(item)"
        >
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
import editHelper from '@/mixins/edit'
import { debounce as _debounce } from 'lodash'
import queryString from 'query-string'
export default {
  mixins: [editHelper],
  props: {
    value: {
      required: false,
      default: '',
      type: String,
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
      search: this.value,
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
    },

    edit(item) {
      this.pushDialog({ id: item.id, edit: true })
    },
    // blur() {
    //   if (this.search) {
    //     this.currentWord.lang = this.search
    //     this.model = this.currentWord
    //   }
    // },
  },
}
</script>
