<template>
  <div>
    <v-card class="px-4 elevation-8">
      <v-row>
        <v-col>
          <Lang />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Native />
        </v-col>
      </v-row>
      <LevelRatingHighlight />
    </v-card>

    <v-row>
      <v-col>
        <Definition />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Lang from '../forms/Lang'
import Native from '../forms/Native'
import LevelRatingHighlight from '../forms/combined/LevelRatingHighlight'
import Definition from '../forms/Definition'

export default {
  components: {
    Lang,
    Native,
    LevelRatingHighlight,
    Definition,
  },
}
</script>
