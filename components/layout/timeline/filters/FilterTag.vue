<template>
  <DialogFilter title="Grammar" :width="500">
    <template v-slot:default>
      <div class="pa-3">
        <div>
          <v-text-field
            v-model="search"
            filled
            label="Search your tags"
            name="name"
            clearable
            hide-details
            :loading="isSearching"
          />
        </div>
        <LoadingCircular v-if="!items" height="200px" />
        <v-chip-group
          v-model="model"
          active-class="primary--text"
          column
          multiple
        >
          <v-chip
            v-for="item in lists"
            :key="item.id"
            ripple
            :value="item.id"
            class="text-capitalize"
          >
            <span>{{ item.name }}</span>
            <span class="font-weight-light">({{ item.terms_count }})</span>
          </v-chip>
        </v-chip-group>
        <div v-if="showLoadMore" class="d-flex justify-center">
          <v-btn
            color="primary"
            small
            rounded
            :disabled="isLoading"
            :loading="isLoading"
            @click="loadMore"
          >
            load
          </v-btn>
        </div>
      </div>
    </template>

    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn text @click.prevent="model = []">Clear</v-btn>
    </template>
  </DialogFilter>
</template>

<script>
import timelineHelper from '@/mixins/timeline'

import {
  debounce as _debounce,
  intersectionWith as _intersectionWith,
  isEmpty as _isEmpty,
} from 'lodash'

import queryString from 'query-string'
import { mapGetters } from 'vuex'

export default {
  mixins: [timelineHelper],
  data() {
    return {
      isSearching: false,
      isLoading: false,
      filtered: null,
      model: [],
      search: '',
      endpoint: 'taxonomies',
      page: {
        currentPage: 2,
        lastPage: 2,
      },
    }
  },
  computed: {
    ...mapGetters({
      tags: 'config/tags',
    }),
    items: {
      get() {
        return this.tags
      },
      set(values) {
        this.$store.commit('config/SET_TAGS', values)
      },
    },
    showLoadMore() {
      return !this.searching && this.page.currentPage <= this.page.lastPage
    },
    searching() {
      return !_isEmpty(this.search.length)
    },
    lists() {
      return this.searching ? this.filtered : this.items
    },
  },
  watch: {
    search: {
      handler: _debounce(function (v) {
        this.filter(v)
      }, 500),
    },
    model(newModel) {
      let tag = null
      if (Array.isArray(newModel)) {
        tag = newModel.filter((v) => v)
      }
      this.setFilters({ tag })
    },
  },
  async mounted() {
    if (!this.items) await this.$store.dispatch('config/getTags')
    this.filtered = this.items
    this.model = this.filterTag
  },
  beforeDestroy() {
    this.$store.commit('config/SET_TAGS', this.items)
  },
  methods: {
    async filter(v) {
      this.isSearching = true
      const query = {
        tax: 'tag',
        search: v,
      }
      try {
        const response = await this.$axios.$get(
          `${this.endpoint}/autocomplete?${queryString.stringify(query)}`
        )
        const existing = _intersectionWith(
          this.items,
          this.model,
          (item, model) => item.id === model
        )
        this.items = [...this.items, ...response.data]
        this.filtered = [...existing, ...response.data]
      } catch (e) {}
      this.isSearching = false
    },
    async loadMore() {
      this.isLoading = true
      const query = {
        tax: 'tag',
        page: this.page.currentPage,
      }
      try {
        const response = await this.$axios.$get(
          `${this.endpoint}?${queryString.stringify(query)}`
        )
        this.items = [...this.items, ...response.data]
        this.page.lastPage = response.meta.last_page
        this.page.currentPage++
      } catch (e) {}
      this.isLoading = false
    },
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
