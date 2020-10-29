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

    <v-card v-if="!isNative" class="px-4 elevation-8 mb-4">
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
import FullLang from '../combined/FullLang'
import Native from '../Native'
import LevelRatingHighlight from '../combined/LevelRatingHighlight'
import Definition from '../Definition'
import Example from '../Example'
import Conjugation from '../Conjugation'
import Pronunciation from '../Pronunciation'
import Grammar from '../Grammar'
import Category from '../Category'
import LinkTranslation from '../link/LinkTranslation'

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
  computed: {
    isNative() {
      return this.currentWord.langue === this.$auth.user.native
    },
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
