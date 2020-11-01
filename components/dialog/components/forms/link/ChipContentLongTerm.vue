<template>
  <div class="d-inline-block text-truncate" style="max-width: 150px">
    {{ item.def }}
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
