<template>
  <div v-if="term.pronon" class="font-italic font-weight-light">
    /{{ term.pronon }}/
  </div>
</template>

<script>
export default {
  props: {
    term: {
      required: true,
      type: Object,
    },
  },
}
</script>
