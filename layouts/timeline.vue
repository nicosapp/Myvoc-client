<template>
  <v-app dark>
    <v-fade-transition>
      <TimelineAppBar @toggle-appbar="(v) => (searchBarVisible = v)">
        <v-expand-x-transition>
          <TimelineSearchAppBar
            v-if="searchBarVisible"
            @toggle-appbar="(v) => (searchBarVisible = v)"
          />
        </v-expand-x-transition>
      </TimelineAppBar>
    </v-fade-transition>

    <TimelineDrawerLeft />
    <v-main>
      <v-btn
        v-if="!disabledPagination"
        style="bottom: 68px"
        fab
        small
        :color="pagination ? 'primary' : null"
        fixed
        right
        @click.prevent="togglePagination"
      >
        <v-icon> mdi-book-open-page-variant </v-icon>
      </v-btn>
      <v-container class="pa-0">
        <TheAlert />
        <nuxt />
      </v-container>
    </v-main>
    <TheBottomBar />
    <TheFixedComponents />
  </v-app>
</template>

<script>
import timelineHelper from '@/mixins/timeline'

export default {
  mixins: [timelineHelper],
  data() {
    return {
      searchBarVisible: false,
    }
  },
  computed: {
    disabledPagination() {
      return this.lastPage <= 1
    },
  },

  methods: {
    togglePagination() {
      this.setPagination(!this.pagination)
    },
  },
}
</script>
