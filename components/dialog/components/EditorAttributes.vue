<template>
  <v-container>
    <!-- LANG & FORM -->
    <v-card class="px-4 pt-4 mb-4 elevation-8">
      <div class="d-flex">
        <Language
          v-model="currentTerm.langue"
          class="flex-grow-1 mr-2"
          :disabled="edit"
        />
        <Type v-model="currentTerm.forme" class="flex-grow-1 ml-2" />
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
  props: {
    value: {
      required: true,
      type: Object,
    },
    edit: {
      required: false,
      type: Boolean,
      default: true,
    },
    native: {
      required: true,
      type: String,
    },
    isNative: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      currentTerm: this.value,
    }
  },
  computed: {
    typeLowerCase() {
      return _get(this, 'currentTerm.forme', false)
        ? this.currentTerm.forme.toLowerCase()
        : null
    },
  },
  watch: {
    currentTerm: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
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
