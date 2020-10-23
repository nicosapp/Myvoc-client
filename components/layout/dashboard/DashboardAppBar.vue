<template>
  <v-app-bar dark :clipped-left="false" fixed app color="primary">
    <v-btn icon @click.prevent="toggleDrawerLeft">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <!-- MIDDLE -->
    <v-spacer />
    <v-toolbar-title class="primaryText--text font-title">
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
