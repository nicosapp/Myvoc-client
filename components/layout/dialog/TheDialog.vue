<template>
  <component :is="component" />
</template>

<script>
import DialogDefault from '@/components/layout/dialog/DialogDefault'
import DialogPrompt from '@/components/layout/dialog/DialogPrompt'

import { mapGetters } from 'vuex'
export default {
  components: {
    DialogDefault,
    DialogPrompt,
  },
  computed: {
    ...mapGetters({
      component: 'dialog/component',
    }),
  },
}
</script>
