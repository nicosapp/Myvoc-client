<template>
  <v-bottom-sheet v-model="bottomSheetVisible">
    <component
      :is="bottomSheetComponent"
      :term="bottomSheetTerm"
      @close="bottomSheetVisible = false"
    />
  </v-bottom-sheet>
</template>

<script>
import bottomSheetHelper from '@/mixins/navigation/bottomSheet'

import TimelineBottomSheetTermActions from './TimelineBottomSheetTermActions'

export default {
  components: {
    TimelineBottomSheetTermActions,
  },
  mixins: [bottomSheetHelper],
}
</script>
