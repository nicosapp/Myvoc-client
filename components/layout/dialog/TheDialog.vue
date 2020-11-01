<template>
  <component :is="component" />
</template>

<script>
import DialogDefault from '@/components/layout/dialog/DialogDefault'
import DialogConfirm from '@/components/layout/dialog/DialogConfirm'

import { mapGetters } from 'vuex'
export default {
  components: {
    DialogDefault,
    DialogConfirm,
  },
  computed: {
    ...mapGetters({
      component: 'dialog/component',
    }),
  },
}
</script>
