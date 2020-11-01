<template>
  <div class="primary--text text-h5 font-weight-bold">
    {{ term | fullTerm }}
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
