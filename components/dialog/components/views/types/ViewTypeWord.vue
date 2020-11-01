<template>
  <div>
    <v-card class="pa-4 mb-3">
      <ViewDate :term="term" />
      <v-row align="baseline">
        <v-col cols="6">
          <ViewLang :term="term" class="text-center" />
          <ViewPronunciation :term="term" class="text-center" />
        </v-col>
        <v-col cols="6" class="text-right">
          <ViewRating :term="term" />
          <ViewLevel :term="term" />
        </v-col>
      </v-row>
      <ViewGrammar :term="term" />
      <ViewCategory :term="term" />
      <ViewTag :term="term" />
    </v-card>
    <v-card class="pa-4 mb-3">
      <ViewTranslation :term="term" />
      <ViewNative v-if="!isNative" :term="term" />
    </v-card>
    <v-card class="pa-4 mb-3">
      <ViewDefinition :term="term" />
      <ViewExample :term="term" />
    </v-card>
    <v-card class="pa-4">
      <ViewConjugation :term="term" />
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isNative() {
      return this.term.langue === this.$auth.user.native
    },
  },
}
</script>
