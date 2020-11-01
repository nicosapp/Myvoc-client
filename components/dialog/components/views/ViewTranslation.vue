<template>
  <div>
    <div class="text-caption">Translations</div>
    <v-alert
      v-for="(terms, language) in items"
      :key="language"
      class="preview-definition mb-2"
      text
      dense
      border="left"
    >
      <template v-slot:prepend>
        <div class="mr-2 text-capitalize font-weight-medium">
          {{ language }}
        </div>
      </template>

      <v-chip
        v-for="term in terms"
        :key="term.id"
        small
        class="mr-1 font-weight-medium"
        @click.prevent="open(term)"
      >
        {{ term | fullTerm }}
      </v-chip>
    </v-alert>
  </div>
</template>

<script>
import { groupBy as _groupBy } from 'lodash'
import editHelper from '@/mixins/edit'

export default {
  mixins: [editHelper],
  props: {
    term: {
      required: true,
      type: Object,
    },
  },
  computed: {
    items() {
      return _groupBy(this.term.translations, 'langue')
    },
  },
  methods: {
    open(item) {
      this.pushDialog({ id: item.id, edit: true })
    },
  },
}
</script>
