<template>
  <v-app-bar fixed app>
    <v-row class="mx-n2">
      <v-col cols="3"> </v-col>
      <v-col cols="6" class="d-flex justify-space-around align-center">
        <v-toolbar-title class="primary--text font-title">
          Your Profile
        </v-toolbar-title>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <SignOutButton>
          <v-icon>mdi-logout-variant</v-icon>
        </SignOutButton>
      </v-col>
    </v-row>
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
