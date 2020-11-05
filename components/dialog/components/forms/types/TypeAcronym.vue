<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextField
        v-model="currentTerm.lang"
        label="Acronym"
        name="acronym"
        :rules="[rules.required]"
      />
      <CustomTextField
        v-model="currentTerm.fra"
        label="Meaning"
        name="meaning"
      />
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

    <v-row>
      <v-col>
        <Definition v-model="currentTerm.def_json" />
      </v-col>
    </v-row>
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
