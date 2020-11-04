<template>
  <div>
    <TermEditDialog
      v-for="(d, i) in dialogs"
      :key="`dialog-${d.termId}`"
      :index="i"
    />
    <v-bottom-navigation
      v-if="visible"
      v-model="active"
      grow
      app
      class="bottomBar"
      color="primary"
      :min-width="0"
    >
      <v-btn value="timeline" @click="pushRoute('timeline', 'timeline')">
        <div>Terms</div>
        <v-icon>mdi-format-list-text</v-icon>
      </v-btn>

      <v-btn value="actions" @click="timelineActions">
        <div>Actions</div>
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>

      <v-btn value="create" @click="createTerm">
        <div>Create</div>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn value="dashboard" @click="pushRoute('dashboard', 'dashboard')">
        <div>Dashboard</div>
        <v-icon>mdi-view-dashboard-variant-outline</v-icon>
      </v-btn>

      <v-btn value="account" @click="pushRoute('account', 'account')">
        <div>Account</div>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-sheet> </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bottomSheetHelper from '@/mixins/navigation/bottomSheet'

export default {
  mixins: [bottomSheetHelper],
  data() {
    return {
      value: 'home',
    }
  },
  computed: {
    ...mapGetters({
      activeValue: 'bottomBar/active',
      dialogs: 'edit/dialogs',
      terms: 'timeline/terms',
    }),

    visible() {
      return (
        this.$auth.loggedIn && this.$auth.user.is_verified && !this.isEditPage
      )
    },
    active: {
      get() {
        return this.activeValue
      },
      set(activeValue) {
        this.setActive(activeValue)
      },
    },
    isTimelinePage() {
      return this.$route.path.indexOf('timeline') > 0
    },
    isEditPage() {
      return this.$route.path.indexOf('edit') > 0
    },
  },

  methods: {
    ...mapActions({
      setActive: 'bottomBar/setActive',
      pushDialog: 'edit/pushDialog',
    }),

    pushRoute(active, route) {
      this.setActive(active)
      this.$router.push({
        name: route,
      })
    },
    timelineActions() {
      if (!this.isTimelinePage || this.terms === null) return
      this.setBottomSheet({
        visible: true,
        component: 'TimelineBottomSheetTermActions',
      })
    },
    async createTerm() {
      try {
        const term = await this.$axios.$post('terms')
        this.setActive('create')
        this.pushDialog({ termId: term.data.id, edit: false })
      } catch (e) {}
    },
  },
}
</script>

<style scoped lang="scss">
.v-btn {
  min-width: 10px !important;
  padding: 0 !important;
}
</style>
