<template>
  <div>
    <v-card class="px-4 elevation-8 mb-4">
      <FullLang v-model="currentWord" />
      <v-row>
        <v-col>
          <Native v-model="currentWord.fra" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Pronunciation v-model="currentWord.pronon" />
        </v-col>
      </v-row>
    </v-card>

    <v-card class="px-4 elevation-8 mb-4">
      <LevelRatingHighlight v-model="currentWord" />
      <Grammar v-model="currentWord.gram" />
      <Category v-model="currentWord.categories" :word="currentWord" />
    </v-card>

    <v-card class="px-4 elevation-8 mb-4">
      <v-row>
        <v-col>
          <LinkTranslation
            v-model="currentWord.translations"
            :word="currentWord"
            to="esp"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col>
        <Definition v-model="currentWord.def_json" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Example v-model="currentWord.ex_json" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Conjugation v-model="currentWord.conj" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FullLang from '../forms/combined/FullLang'
import Native from '../forms/Native'
import LevelRatingHighlight from '../forms/combined/LevelRatingHighlight'
import Definition from '../forms/Definition'
import Example from '../forms/Example'
import Conjugation from '../forms/Conjugation'
import Pronunciation from '../forms/Pronunciation'
import Grammar from '../forms/Grammar'
import Category from '../forms/Category'
import LinkTranslation from '../forms/link/LinkTranslation'

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

    LinkTranslation,
  },
  props: {
    value: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currentWord: this.value,
    }
  },
  watch: {
    currentWord: {
      deep: true,
      handler() {
        this.$emit('input', this.currentWord)
      },
    },
  },
}
</script>
