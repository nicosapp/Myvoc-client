<template>
  <v-app-bar :clipped-left="false" fixed app>
    <v-row class="mx-n2">
      <v-col cols="3">
        <v-btn icon @click.prevent="toggleDrawerLeft">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6" class="d-flex justify-space-around align-center">
        <v-toolbar-title class="primary--text font-title">
          Dashboard
        </v-toolbar-title>
      </v-col>
      <v-col cols="3"> </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'

export default {
  mixins: [drawerLeft],
}
</script>
