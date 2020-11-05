<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextField
        v-model="currentTerm.lang"
        name="title"
        label="Title"
        :rules="[rules.required]"
      />
      <Category v-model="currentTerm.categories" :term="currentTerm" />
      <Tag v-model="currentTerm.tags" :term="currentTerm" />
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <v-textarea
        v-model="currentTerm.def"
        name="note"
        label="Note"
        filled
        auto-grow
        clearable
        :rules="[rules.required]"
        :rows="10"
        :error="error"
        :hint="hint"
      ></v-textarea>
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/type'

import { rulesTextField as rules } from '@/plugins/formValidation'

import { debounce as _debounce } from 'lodash'

export default {
  mixins: [typeTemplate],
  data() {
    return {
      rules,
      count: 0,
      max: 300,
    }
  },
  computed: {
    hint() {
      return `${this.count} words`
    },
    error() {
      return this.count > this.max
    },
  },
  watch: {
    'currentTerm.def': {
      handler: _debounce(function (words) {
        this.count = words.split(' ').length
      }, 500),
    },
  },
}
</script>
