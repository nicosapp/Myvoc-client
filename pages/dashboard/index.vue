<template>
  <v-container>
    <v-btn :to="{ name: 'dashboard-categories' }"> Categories </v-btn>
  </v-container>
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
