<template>
  <div class="primary--text text-h5 font-weight-bold">
    {{ word | fullWord }}
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
