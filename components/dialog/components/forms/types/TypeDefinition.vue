<template>
  <div>
    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <CustomTextField
        v-model="currentTerm.lang"
        name="title"
        label="Title"
        :rules="[rules.required]"
      />
    </v-card>

    <v-card class="px-4 pt-4 elevation-8 mb-4">
      <LevelRatingHighlight v-model="currentTerm" />
      <Grammar v-model="currentTerm.grammars" :term="currentTerm" />
      <Tag v-model="currentTerm.tags" :term="currentTerm" />
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
