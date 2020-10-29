<template>
  <div>
    <v-card class="px-4 elevation-8">
      <FullLang />
      <v-row>
        <v-col>
          <Native />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Pronunciation />
        </v-col>
      </v-row>
      <LevelRatingHighlight />
    </v-card>

    <v-row>
      <v-col>
        <Definition />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Example />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FullLang from '../combined/FullLang'
import Native from '../Native'
import LevelRatingHighlight from '../combined/LevelRatingHighlight'
import Definition from '../Definition'
import Example from '../Example'
import Pronunciation from '../Pronunciation'

export default {
  components: {
    FullLang,
    Native,
    Pronunciation,
    LevelRatingHighlight,
    Definition,
    Example,
  },
}
</script>
