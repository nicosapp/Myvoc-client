<template>
  <v-overlay
    style="position: fixed; top: 0; left: 0; right: 0"
    :value="isNotVerified"
  >
    <v-card>
      <v-card-title>Email verification</v-card-title>
      <v-card-subtitle
        >Please check your mail box to activate your account</v-card-subtitle
      >
      <v-card-actions>
        <v-btn text @click.prevent="send"> send a new email </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  data() {
    return {
      absolute: true,
      overlay: true,
    }
  },
  computed: {
    isNotVerified() {
      return this.$auth.loggedIn && !this.$auth.user.is_verified
    },
  },
  methods: {
    async send() {
      try {
        await this.$axios.$post('email/resend')
        this.$notifier.success({
          message:
            'An email has been sent to you! Click on the link to activate your account',
        })
      } catch (e) {
        if (e.response && e.response.status === 429) {
          this.$notifier.warn({
            message: 'Please wait a few minutes to request a new email',
          })
          return
        }
        this.$notifier.error500()
      }
    },
  },
}
</script>
