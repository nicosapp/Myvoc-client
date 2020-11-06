<template>
  <ViewTypeWord
    :native="native"
    :is-native="isNative"
    :term="term"
    type="locution"
  />
</template>

<script>
import typeTemplate from '@/mixins/edit/typeView'
export default {
  mixins: [typeTemplate],
}
</script>
