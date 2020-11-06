<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextField
        v-model="currentTerm.lang"
        label="Author"
        name="author"
        :rules="[rules.required]"
      />
      <LevelRatingHighlight v-model="currentTerm" />
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
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextArea
        v-model="currentTerm.def"
        :rules="[rules.required]"
        label="Quote"
        name="quote"
        :rows="1"
      />
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/typeEdit'

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
