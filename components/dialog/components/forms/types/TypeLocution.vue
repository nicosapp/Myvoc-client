<template>
  <div>
    <v-card class="px-4 elevation-8 mb-4">
      <FullLang v-model="currentTerm" />
      <v-row>
        <v-col>
          <Native v-model="currentTerm.fra" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Pronunciation v-model="currentTerm.pronon" />
        </v-col>
      </v-row>
    </v-card>

    <v-card class="px-4 elevation-8 mb-4">
      <LevelRatingHighlight v-model="currentTerm" />
      <Grammar v-model="currentTerm.gram" />
      <Category v-model="currentTerm.categories" :term="currentTerm" />
    </v-card>

    <v-card v-if="!isNative" class="px-4 elevation-8 mb-4">
      <v-row>
        <v-col>
          <LinkTranslation
            v-model="currentTerm.translations"
            :term="currentTerm"
            to="esp"
          />
        </v-col>
      </v-row>
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
      currentTerm: this.value,
    }
  },
  computed: {
    isNative() {
      return this.currentTerm.langue === this.$auth.user.native
    },
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
