<template>
  <div class="font-weight-medium text--secondary">{{ term.level }}</div>
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
