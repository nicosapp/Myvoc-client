<template>
  <v-app-bar :clipped-left="false" fixed app>
    <v-row class="mx-n2">
      <v-col cols="3">
        <v-btn
          v-if="!$auth.loggedIn && isHomePage"
          light
          icon
          nuxt
          to="/auth/signin"
        >
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6" class="d-flex justify-space-around align-center">
        <v-toolbar-title class="primary--text font-title">
          MyVoc
        </v-toolbar-title>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <v-btn
          v-if="$auth.loggedIn && isHomePage"
          light
          icon
          nuxt
          to="timeline"
        >
          <v-icon>mdi-format-list-text</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    page: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      drawerLeft: 'drawerLeft/value',
    }),
    logo() {
      return '~/assets/logo.svg'
    },
    title() {
      switch (this.page) {
        case 'account':
          return 'Your profile'
        default:
          return 'MyCodeSnippets'
      }
    },
    isSigninPage() {
      return this.$route.path.indexOf('signin') > 0
    },
    isAccountPage() {
      return this.$route.path.indexOf('account') > 0
    },
    isHomePage() {
      return this.$route.path.length === 1
    },
  },
  methods: {
    ...mapActions({
      setDrawerLeft: 'drawerLeft/setValue',
    }),
    toggleLeft() {
      this.setDrawerLeft(!this.drawerLeft)
    },
  },
}
</script>
