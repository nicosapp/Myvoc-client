<template>
  <div>Statistics</div>
</template>

<script>
export default {
  middleware: ['verified'],
  layout: 'dashboard',
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'dashboard')
  },
}
</script>
