<template>
  <v-container>
    <v-form>
      <!-- LANG & FORM -->
      <v-card class="px-4 mb-4 elevation-8">
        <v-row>
          <v-col cols="6">
            <Language v-model="currentWord.langue" />
          </v-col>
          <v-col cols="6">
            <Type v-model="currentWord.forme" />
          </v-col>
        </v-row>
      </v-card>
      <component :is="`type-${typeLowerCase}`" v-model="currentWord" />
    </v-form>
  </v-container>
</template>

<script>
import Language from './forms/Language'
import Type from './forms/Type'

import TypeWord from './types/TypeWord'
import TypeLocution from './types/TypeLocution'
import TypeQuote from './types/TypeQuote'
import TypeAcronym from './types/TypeAcronym'
import TypeExpression from './types/TypeExpression'
import TypeGrammar from './types/TypeGrammar'
import TypeNote from './types/TypeNote'
import TypeExample from './types/TypeExample'

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
  },
  data() {
    return {
      type: 'word',
      currentWord: this.value,
    }
  },
  computed: {
    typeLowerCase() {
      return this.type.toLowerCase()
    },
  },
  watch: {
    currentWord: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
