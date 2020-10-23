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
    <v-row>
      <v-col>
        <CustomTextArea />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FullLang from '../forms/combined/FullLang'
import Native from '../forms/Native'
import LevelRatingHighlight from '../forms/combined/LevelRatingHighlight'
import Definition from '../forms/Definition'
import Example from '../forms/Example'
import CustomTextArea from '../forms/CustomTextArea'
import Pronunciation from '../forms/Pronunciation'

export default {
  components: {
    FullLang,
    Native,
    Pronunciation,
    LevelRatingHighlight,
    Definition,
    Example,
    CustomTextArea,
  },
}
</script>
