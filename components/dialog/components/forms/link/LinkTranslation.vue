<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :label="label"
    multiple
    filled
    :search-input.sync="search"
    item-value="id"
    item-text="lang"
    clearable
    return-object
    hide-no-data
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        {{ data.item | fullWord }}
      </v-chip>
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
  </v-autocomplete>
</template>

<script>
import { debounce as _debounce, get as _get } from 'lodash'
import queryString from 'query-string'

export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    word: {
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
      items: this.value.filter((w) => w.langue === this.to),
      model: this.items,
      search: null,
      isLoading: false,
    }
  },
  watch: {
    model(newValue, oldValue) {
      this.$emit('input', newValue)
      if (_get(newValue, 'length') > _get(oldValue, 'length')) {
        this.link(newValue.slice(-1)[0])
      }
    },
    search: {
      handler: _debounce(function (value) {
        this.apiQuery(value)
      }, 500),
    },
  },
  methods: {
    async apiQuery(value) {
      if (this.isLoading) return
      this.isLoading = true
      const query = {}
      query.search = value
      query.langue = this.to
      query.column = this.column
      query.byNative = this.byNative
      const response = await this.$axios.$get(
        `words/autocomplete?${queryString.stringify(query)}`
      )
      // console.log(response.data)
      if (response) {
        this.items = response.data
      }
      this.isLoading = false
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
          `words/${this.word.id}/translations/${translation.id}`
        )
        this.$notifier.success({ message: 'It is now linked!' })
      } catch (e) {
        this.$notifier.error500()
      }
    },

    unlink(translation) {
      try {
        this.$axios.$delete(
          `words/${this.word.id}/translations/${translation.id}`
        )
        this.$notifier.success({ message: 'It is now unlinked!' })
      } catch (e) {
        this.$notifier.error500()
      }
    },
  },
}
</script>
