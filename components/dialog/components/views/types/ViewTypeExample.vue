<template>
  <div>
    <v-card class="pa-4 mb-3">
      <ViewDate :term="term" />
      <v-row align="baseline">
        <v-col cols="12" sm="6">
          <ViewChipPropertyTemplate :items="term.mode" label="Mode" />
          <ViewChipPropertyTemplate :items="term.tense" label="Tense" />
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
    </v-card>
    <v-card class="pa-4">
      <ViewTextArea
        :text="term.def"
        label="Example"
        class="font-weight-medium primary--text mb-1"
      />
      <ViewTextArea
        :text="term.web_def"
        label="Translation"
        class="font-weight-medium mb-1"
      />
      <ViewTextArea :text="term.conj" label="Comment" />
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/typeView'
export default {
  mixins: [typeTemplate],
}
</script>
