<template>
  <v-app-bar fixed app>
    <!-- MIDDLE -->
    <v-spacer />
    <v-toolbar-title class="primary--text font-title">
      Your Profile
    </v-toolbar-title>
    <v-spacer />
    <!-- MIDDLE -->
    <SignOutButton>
      <v-icon>mdi-logout-variant</v-icon>
    </SignOutButton>
  </v-app-bar>
</template>

<script>
import SignOutButton from '@/components/global/SignOutButton'
export default {
  components: {
    SignOutButton,
  },
}
</script>
