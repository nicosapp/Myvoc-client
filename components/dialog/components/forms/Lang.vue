<template>
  <div class="relative">
    <v-menu left offset-y close-on-click :max-height="200">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          filled
          v-bind="attrs"
          :rules="[rules.required, rules.min(2, search)]"
          label="Term"
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
import { rulesTextField as rules } from '@/plugins/formValidation'
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
      default: 'Term',
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
      loading: false,
      currentTerm: this.value,
      rules,
    }
  },
  watch: {
    search: {
      handler: _debounce(async function (value) {
        await this.apiQuery(value, this)
      }, 500),
    },
    currentTerm: {
      deep: true,
      handler(value) {
        if (value) this.$emit('input', value)
      },
    },
  },
  created() {
    if (this.currentTerm) {
      this.model = this.currentTerm
    }
  },
  methods: {
    async apiQuery(value, self) {
      if (this.loading) return
      this.loading = true
      const query = {}
      query.search = value
      const response = await self.$axios.$get(
        `terms/autocomplete?${queryString.stringify(query)}`
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
