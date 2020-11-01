<template>
  <div
    class="d-flex primary align-center"
    style="position: absolute; right: 0; top: 0; height: 100%; width: 100%"
  >
    <v-btn icon @click.prevent="$emit('toggle-appbar', false)">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-menu left offset-y close-on-click :max-height="200">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          solo-inverted
          flat
          hide-details
          :loading="loading"
          class="mr-4"
          filled
          v-bind="attrs"
          label="Type your term :)"
          v-on="on"
          @input="(v) => $emit('input', v)"
          @focus="$emit('focus', true)"
          @blur="$emit('blur', true)"
        >
        </v-text-field>
      </template>
      <v-list v-if="items.length">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click.prevent="edit(item)"
        >
          <ListItemContentShortTerm :item="item" />
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
  data() {
    return {
      searchBar: false,
      select: null,
      search: '',
      items: [],
      loading: false,
    }
  },
  watch: {
    search: {
      handler: _debounce(async function (value) {
        await this.apiQuery(value, this)
      }, 500),
    },
  },
  methods: {
    async apiQuery(value, self) {
      if (this.loading) return
      this.loading = true
      const query = {}
      query.search = value
      const response = await self.$axios.$get(
        `term/autocomplete?${queryString.stringify(query)}`
      )
      // console.log(response.data)
      if (response) {
        self.items = [...response.data]
        if (response.length) self.showMenu = true
      }
      this.loading = false
    },

    edit(item) {
      this.pushDialog({ id: item.id, edit: true })
    },
  },
}
</script>
