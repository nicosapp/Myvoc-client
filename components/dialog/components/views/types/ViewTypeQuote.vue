<template>
  <div>
    <v-card class="pa-4 mb-3">
      <ViewDate :term="term" />
      <v-row align="baseline">
        <v-col cols="12" sm="6">
          <ViewTitle :title="term.lang" class="text-center" />
        </v-col>
        <v-col cols="12" sm="6" class="text-right">
          <ViewRating :term="term" />
          <ViewLevel :term="term" />
        </v-col>
      </v-row>
      <ViewCategory :term="term" class="mb-2" />
      <ViewTag :term="term" />
    </v-card>

    <v-card class="pa-4 mb-3">
      <ViewTranslation :term="term" />
    </v-card>
    <v-card class="pa-4">
      <ViewTextArea :text="term.def" label="Quote" />
    </v-card>
  </div>
</template>

<script>
import typeTemplate from '@/mixins/edit/typeView'
export default {
  mixins: [typeTemplate],
}
</script>
