<template>
  <div class="relative pb-4">
    <v-menu left offset-y close-on-click :max-height="200" max-width="100%">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          hide-details
          filled
          v-bind="attrs"
          :label="label"
          :loading="loading"
          clearable
          nudge-width
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
          <slot :item="item" name="listItemContent" />
        </v-list-item>
      </v-list>
    </v-menu>
    <div v-if="model.length" class="mt-3">
      <v-chip
        v-for="item in model"
        :key="item.id"
        class="mr-1 mb-1"
        close
        @click:close="remove(item)"
      >
        <slot :item="item" name="chipContent" />
      </v-chip>
    </div>
  </div>
</template>

<script>
import { debounce as _debounce } from 'lodash'

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
    label: {
      type: String,
      required: true,
    },
    endpoint: {
      required: true,
      type: String,
    },
    filter: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      model: this.value,
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
        this.filter(value, this)
      }, 500),
    },
  },
  methods: {
    add(item) {
      if (this.model.findIndex((m) => m.id === item.id) >= 0) {
        this.$notifier.warn({ message: `${this.label} is already linked` })
        return
      }
      this.link('link', item)
      this.model.push(item)
    },

    remove(item) {
      const index = this.model.indexOf(item)
      if (index >= 0) {
        this.link('unlink', this.model[index])
        this.model.splice(index, 1)
      }
    },

    async link(method, item) {
      this.loading = true
      try {
        switch (method) {
          case 'link':
            await this.$axios.$post(
              `terms/${this.term.id}/${this.endpoint}/${item.id}`
            )
            break
          case 'unlink':
            await this.$axios.$delete(
              `terms/${this.term.id}/${this.endpoint}/${item.id}`
            )
            break
        }
        this.$notifier.success({
          message: `The ${this.label} is now ${method}ed!`,
        })
      } catch (e) {
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
