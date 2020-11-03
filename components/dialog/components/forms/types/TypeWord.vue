<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <FullLang v-model="currentTerm" />
      <Native v-model="currentTerm.fra" />
      <Pronunciation v-model="currentTerm.pronon" />
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <LevelRatingHighlight v-model="currentTerm" />
      <Grammar v-model="currentTerm.grammars" :term="currentTerm" />
      <Category v-model="currentTerm.categories" :term="currentTerm" />
      <Tag v-model="currentTerm.tags" :term="currentTerm" />
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <Translation
        v-if="!isNative"
        v-model="currentTerm.translations"
        :term="currentTerm"
        :from="currentTerm.langue"
        :to="native"
        label="Translation"
      />
      <Synonym v-model="currentTerm.synonyms" :term="currentTerm" />
      <ExampleLink v-model="currentTerm.examples" :term="currentTerm" />
    </v-card>
    <v-row>
      <v-col>
        <Definition v-model="currentTerm.def_json" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Example v-model="currentTerm.ex_json" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Conjugation v-model="currentTerm.conj" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FullLang from '../combined/FullLang'
import Native from '../Native'
import LevelRatingHighlight from '../combined/LevelRatingHighlight'
import Definition from '../Definition'
import Example from '../Example'
import Conjugation from '../Conjugation'
import Pronunciation from '../Pronunciation'
import Grammar from '../Grammar'
import Category from '../Category'

export default {
  components: {
    FullLang,
    Native,
    Pronunciation,
    LevelRatingHighlight,
    Definition,
    Example,
    Conjugation,
    Grammar,
    Category,
  },
  props: {
    value: {
      required: true,
      type: Object,
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

  watch: {
    currentTerm: {
      deep: true,
      handler() {
        this.$emit('input', this.currentTerm)
      },
    },
  },
}
</script>
