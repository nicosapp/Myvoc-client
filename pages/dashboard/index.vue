<template>
  <v-container> Dashboard </v-container>
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
