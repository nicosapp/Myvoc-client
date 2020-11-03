<template>
  <div>
    <div v-if="withLabel" class="text-caption">Translations</div>
    <v-alert
      v-for="(terms, language) in items"
      :key="language"
      class="preview-definition mb-2"
      :style="[
        list ? { padding: '0px 16px', 'margin-bottom': '0px !important' } : {},
      ]"
      text
      dense
      :color="getColor(language)"
      border="left"
    >
      <template v-if="!list" v-slot:prepend>
        <div class="mr-2 text-caption text-capitalize">
          {{ language }}
        </div>
      </template>

      <v-chip
        v-for="t in terms"
        :key="t.id"
        :x-small="list"
        :small="!list"
        :color="getColor(language)"
        class="mr-1 font-weight-medium"
        @dblclick.prevent="open(t)"
      >
        {{ t | fullTerm }}
      </v-chip>
    </v-alert>
  </div>
</template>

<script>
import { groupBy as _groupBy } from 'lodash'
import editHelper from '@/mixins/edit'
import { mapGetters } from 'vuex'

export default {
  mixins: [editHelper],
  props: {
    term: {
      required: true,
      type: Object,
    },
    dictionnaries: {
      required: false,
      type: [String, Array],
      default: null,
    },
    withLabel: {
      required: false,
      type: Boolean,
      default: true,
    },
    list: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      _dictionnaries: 'config/dictionnaries',
    }),
    items() {
      const grouped = _groupBy(this.term.translations, 'langue')
      if (this.dictionnaries && typeof this.dictionnaries === 'string')
        return grouped[this.dictionnaries] || []
      else if (this.dictionnaries) {
        return _groupBy(
          this.term.translations.filter((d) =>
            this.dictionnaries.includes(d.langue)
          ),
          'langue'
        )
      }
      return grouped
    },
  },

  methods: {
    open(item) {
      this.pushDialog({ id: item.id, edit: true })
    },
    getColor(slug) {
      if (this._dictionnaries) {
        const d = this._dictionnaries.find((d) => d.slug === slug)
        return d ? d.color : null
      }
      return null
    },
  },
}
</script>
