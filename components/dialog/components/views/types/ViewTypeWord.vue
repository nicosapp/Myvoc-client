<template>
  <div>
    <v-card class="pa-4 mb-3">
      <ViewDate :term="term" />
      <v-row align="baseline">
        <v-col cols="12" sm="6">
          <ViewTitle :title="fullTerm" class="text-center primary--text" />
          <ViewPronunciation :term="term" class="text-center" />
        </v-col>
        <v-col cols="12" sm="6" class="text-right">
          <ViewRating :term="term" />
          <ViewLevel :term="term" />
        </v-col>
      </v-row>
      <ViewGrammar :term="term" class="mb-2" />
      <ViewCategory :term="term" class="mb-2" />
      <ViewTag :term="term" />
    </v-card>
    <v-card class="pa-4 mb-3">
      <ViewTranslation :term="term" />
      <ViewNative v-if="!isNative && is('word')" :term="term" />
    </v-card>
    <v-card class="pa-4 mb-3">
      <ViewDefinition :term="term" />
      <ViewExample :term="term" />
    </v-card>
    <v-card v-if="is('word')" class="pa-4">
      <ViewConjugation :term="term" class="preview-conjugation" />
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/typeView'
export default {
  mixins: [typeTemplate],
  props: {
    type: {
      required: false,
      type: String,
      default: 'word',
    },
  },
  computed: {
    fullTerm() {
      return this.$options.filters.fullTerm(this.term)
    },
  },
  methods: {
    is(type) {
      return this.type === type
    },
  },
}
</script>

<style>
.preview-conjugation textarea {
  font-size: 0.9rem;
}
</style>
