<template>
  <TypeWord
    v-model="currentTerm"
    :native="native"
    :is-native="isNative"
    type="locution"
  />
</template>

<script>
import typeTemplate from '@/mixins/edit/typeEdit'
export default {
  mixins: [typeTemplate],
}
</script>
