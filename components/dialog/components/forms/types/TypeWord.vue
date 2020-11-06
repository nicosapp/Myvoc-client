<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <FullLang v-model="currentTerm" />
      <CustomTextField v-model="currentTerm.fra" name="native" label="Native" />
      <CustomTextField
        v-if="is('word')"
        v-model="currentTerm.pronon"
        name="pronunciation"
        label="Pronunciation"
      />
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

    <v-card v-if="is('word')" class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextArea
        v-model="currentTerm.conj"
        label="Conjugation"
        name="conjugation"
      />
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/typeEdit'
export default {
  mixins: [typeTemplate],
  props: {
    type: {
      required: false,
      type: String,
      default: 'word',
    },
  },

  methods: {
    is(type) {
      return this.type === type
    },
  },
}
</script>
