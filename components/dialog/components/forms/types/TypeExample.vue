<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <LevelRatingHighlight v-model="currentTerm" />
      <Grammar v-model="currentTerm.grammars" :term="currentTerm" />
      <Category v-model="currentTerm.categories" :term="currentTerm" />
      <Tag v-model="currentTerm.tags" :term="currentTerm" />
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <Mode v-model="currentTerm.mode" />
      <Tense v-model="currentTerm.tense" />
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
      <ExampleLink v-model="currentTerm.examples" :term="currentTerm" />
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextArea
        v-model="currentTerm.def"
        :rules="[rules.required]"
        label="Example"
        name="example"
        :rows="1"
      />
      <CustomTextArea
        v-model="currentTerm.web_def"
        label="Translation"
        name="translation"
        :rows="1"
      />
      <CustomTextArea
        v-model="currentTerm.conj"
        label="Comment"
        name="comment"
        :rows="1"
      />
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/type'

import { rulesTextField as rules } from '@/plugins/formValidation'

export default {
  mixins: [typeTemplate],
  data() {
    return {
      rules,
    }
  },
}
</script>
