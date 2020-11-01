<template>
  <v-app-bar :clipped-left="false" fixed app>
    <v-btn icon @click.prevent="toggleDrawerLeft">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <!-- MIDDLE -->
    <v-spacer />
    <v-toolbar-title class="primary--text font-title">
      Dashboard
    </v-toolbar-title>
    <v-spacer />
    <!-- MIDDLE -->
  </v-app-bar>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'

export default {
  mixins: [drawerLeft],
}
</script>
