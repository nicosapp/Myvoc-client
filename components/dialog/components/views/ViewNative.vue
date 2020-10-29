<template>
  <div>
    <span class="text-caption">Other:</span>
    <span class="text-subtitle-2">{{ word.fra }}</span>
  </div>
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
