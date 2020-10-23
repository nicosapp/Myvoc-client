<template>
  <v-app-bar dark :clipped-left="false" fixed app color="primary">
    <div class="d-flex align-center" style="width: 100%">
      <v-btn icon @click.prevent="toggleDrawerLeft">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- MIDDLE -->
      <v-spacer />
      <v-img
        class="mr-3"
        max-height="60px"
        contain
        :src="require('~/assets/logo.svg')"
      ></v-img>
      <v-spacer />
      <!-- MIDDLE -->
      <v-btn
        v-if="!$auth.loggedIn && isHomePage"
        color="primaryText"
        icon
        nuxt
        to="/auth/signin"
      >
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn icon @click.prevent="$emit('toggle-appbar', true)">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <slot />

    <template v-slot:extension>
      <div>
        <FilterChip>Dictionnaries</FilterChip>
        <FilterChip :value="false">CrossDico</FilterChip>
        <FilterChip>Select By</FilterChip>
        <FilterChip>Filter By</FilterChip>
        <FilterChip>Display</FilterChip>
        <FilterChip>Column</FilterChip>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'

export default {
  mixins: [drawerLeft],
}
</script>
