<template>
  <v-container>
    <component :is="`view-type-${typeLowerCase}`" :word="word" />
  </v-container>
</template>

<script>
import ViewTypeWord from './views/types/ViewTypeWord'
import ViewTypeLocution from './views/types/ViewTypeLocution'
import ViewTypeQuote from './views/types/ViewTypeQuote'
import ViewTypeAcronym from './views/types/ViewTypeAcronym'
import ViewTypeExpression from './views/types/ViewTypeExpression'
import ViewTypeGrammar from './views/types/ViewTypeGrammar'
import ViewTypeNote from './views/types/ViewTypeNote'
import ViewTypeExample from './views/types/ViewTypeExample'

export default {
  components: {
    ViewTypeWord,
    ViewTypeLocution,
    ViewTypeQuote,
    ViewTypeAcronym,
    ViewTypeExpression,
    ViewTypeGrammar,
    ViewTypeNote,
    ViewTypeExample,
  },
  props: {
    word: {
      required: true,
      type: Object,
    },
  },
  computed: {
    typeLowerCase() {
      return this.word.forme.toLowerCase()
    },
  },
}
</script>
