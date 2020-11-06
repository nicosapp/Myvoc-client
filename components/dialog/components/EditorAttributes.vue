<template>
  <v-container>
    <!-- LANG & FORM -->
    <v-card class="px-4 pt-4 mb-4 elevation-8">
      <div class="d-flex">
        <Language
          v-model="currentTerm.langue"
          style="width: 50%"
          class="mr-2"
          :disabled="edit"
        />
        <Type v-model="currentTerm.forme" style="width: 50%" class="ml-2" />
      </div>
    </v-card>
    <component
      :is="`type-${typeLowerCase}`"
      v-if="typeLowerCase"
      v-model="currentTerm"
      :native="native"
      :is-native="isNative"
    />
  </v-container>
</template>

<script>
import { get as _get } from 'lodash'

import typeTemplate from '@/mixins/edit/typeEdit'
import Language from './forms/Language'
import Type from './forms/Type'

import TypeWord from './forms/types/TypeWord'
import TypeLocution from './forms/types/TypeLocution'
import TypeQuote from './forms/types/TypeQuote'
import TypeAcronym from './forms/types/TypeAcronym'
import TypeExpression from './forms/types/TypeExpression'
import TypeGrammar from './forms/types/TypeGrammar'
import TypeNote from './forms/types/TypeNote'
import TypeExample from './forms/types/TypeExample'

export default {
  components: {
    Language,
    Type,

    TypeWord,
    TypeLocution,
    TypeQuote,
    TypeAcronym,
    TypeExpression,
    TypeGrammar,
    TypeNote,
    TypeExample,
  },
  mixins: [typeTemplate],
  props: {
    edit: {
      required: false,
      type: Boolean,
      default: true,
    },
  },

  computed: {
    typeLowerCase() {
      return _get(this, 'currentTerm.forme', false)
        ? this.currentTerm.forme.toLowerCase()
        : null
    },
  },
}
</script>

<style scoped>
.row,
.col {
  padding: 0;
}
</style>
