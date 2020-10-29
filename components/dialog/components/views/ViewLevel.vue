<template>
  <div class="font-weight-medium text--secondary">{{ word.level }}</div>
</template>

<script>
export default {
  props: {
    word: {
      required: true,
      type: Object,
    },
  },
}
</script>
