<template>
  <div class="font-italic font-weight-light">/{{ word.pronon }}/</div>
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
