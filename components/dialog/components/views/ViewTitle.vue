<template>
  <div class="text-h5 font-weight-bold">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
  },
}
</script>
