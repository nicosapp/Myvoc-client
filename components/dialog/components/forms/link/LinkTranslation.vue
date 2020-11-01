<template>
  <div class="relative">
    <v-menu left offset-y close-on-click :max-height="200">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          hide-details
          filled
          v-bind="attrs"
          :label="label"
          :loading="loading"
          v-on="on"
        >
        </v-text-field>
      </template>
      <v-list v-if="items.length">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click.prevent="add(item)"
        >
          <ListItemContentShortTerm :item="item" />
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="pa-3">
      <v-chip
        v-for="item in model"
        :key="item.id"
        class="mr-1 mb-1"
        close
        @click:close="remove(item)"
      >
        <ChipContentShortTerm :item="item" />
      </v-chip>
    </div>
  </div>
</template>

<script>
import { debounce as _debounce } from 'lodash'
import queryString from 'query-string'

export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    term: {
      required: true,
      type: Object,
    },
    from: {
      type: String,
      required: false,
      default: 'fra',
    },
    to: {
      type: String,
      required: true,
    },
    column: {
      type: String,
      required: false,
      default: 'lang',
    },
    label: {
      type: String,
      required: false,
      default: 'Link translation',
    },
    byNative: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      items: [],
      model: [],
      search: null,
      loading: false,
    }
  },
  computed: {
    menuConfig() {
      return { bottom: true, maxHeight: 200 }
    },
  },
  watch: {
    search: {
      handler: _debounce(function (value) {
        this.apiQuery(value)
      }, 500),
    },
  },
  mounted() {
    this.model = this.value.filter((w) => w.langue === this.to)
  },
  methods: {
    async apiQuery(value) {
      if (this.loading) return
      this.loading = true
      const query = {}
      query.search = value
      query.langue = this.to
      query.column = this.column
      query.byNative = this.byNative
      const response = await this.$axios.$get(
        `terms/autocomplete?${queryString.stringify(query)}`
      )
      // console.log(response.data)
      if (response) {
        this.items = response.data
      }
      this.loading = false
    },
    add(item) {
      this.link(item)
      this.model.push(item)
    },

    remove(item) {
      const index = this.model.indexOf(item)
      if (index >= 0) {
        this.unlink(this.model[index])
        this.model.splice(index, 1)
      }
    },

    link(translation) {
      try {
        this.$axios.$post(
          `terms/${this.term.id}/translations/${translation.id}`
        )
        this.$notifier.success({ message: 'It is now linked!' })
      } catch (e) {
        this.$notifier.error500()
      }
    },

    unlink(translation) {
      try {
        this.$axios.$delete(
          `terms/${this.term.id}/translations/${translation.id}`
        )
        this.$notifier.success({ message: 'It is now unlinked!' })
      } catch (e) {
        this.$notifier.error500()
      }
    },
  },
}
</script>
