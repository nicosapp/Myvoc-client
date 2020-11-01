<template>
  <div>
    {{ item | fullTerm }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
}
</script>
