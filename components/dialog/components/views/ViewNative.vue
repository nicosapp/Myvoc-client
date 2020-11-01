<template>
  <div>
    <span class="text-caption">Other:</span>
    <span class="text-subtitle-2">{{ term.fra }}</span>
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
