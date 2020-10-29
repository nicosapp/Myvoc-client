<template>
  <div>
    <v-card class="px-4 elevation-8">
      <LevelRatingHighlight />
      <v-row>
        <v-col>
          <Mode />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Tense />
        </v-col>
      </v-row>
      <Grammar />
    </v-card>

    <v-row>
      <v-col>
        <CustomTextArea label="Example" name="example" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LevelRatingHighlight from '../combined/LevelRatingHighlight'
import CustomTextArea from '../CustomTextArea'
import Grammar from '../Grammar'
import Mode from '../Mode'
import Tense from '../Tense'

export default {
  components: {
    LevelRatingHighlight,
    CustomTextArea,
    Grammar,
    Mode,
    Tense,
  },
}
</script>
