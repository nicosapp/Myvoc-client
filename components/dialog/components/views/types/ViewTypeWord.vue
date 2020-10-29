<template>
  <div>
    <v-card class="pa-4 mb-3">
      <ViewDate :word="word" />
      <v-row align="baseline">
        <v-col cols="6">
          <ViewLang :word="word" class="text-center" />
          <ViewPronunciation :word="word" class="text-center" />
        </v-col>
        <v-col cols="6" class="text-right">
          <ViewRating :word="word" />
          <ViewLevel :word="word" />
        </v-col>
      </v-row>
      <ViewGrammar :word="word" />
      <ViewCategory :word="word" />
      <ViewTag :word="word" />
    </v-card>
    <v-card class="pa-4 mb-3">
      <ViewTranslation :word="word" />
      <ViewNative v-if="!isNative" :word="word" />
    </v-card>
    <v-card class="pa-4 mb-3">
      <ViewDefinition :word="word" />
      <ViewExample :word="word" />
    </v-card>
    <v-card class="pa-4">
      <ViewConjugation :word="word" />
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isNative() {
      return this.word.langue === this.$auth.user.native
    },
  },
}
</script>
