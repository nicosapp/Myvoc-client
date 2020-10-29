<template>
  <div>
    <div class="text-caption">Translations</div>
    <v-alert
      v-for="(words, language) in items"
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
        v-for="word in words"
        :key="word.id"
        small
        class="mr-1 font-weight-medium"
        @click.prevent="open(word)"
      >
        {{ word | fullWord }}
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
    word: {
      required: true,
      type: Object,
    },
  },
  computed: {
    items() {
      return _groupBy(this.word.translations, 'langue')
    },
  },
  methods: {
    open(item) {
      this.pushDialog({ id: item.id, edit: true })
    },
  },
}
</script>
