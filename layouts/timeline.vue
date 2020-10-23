<template>
  <v-app dark>
    <v-fade-transition>
      <TimelineAppBar v-if="true" @toggle-appbar="(v) => (searchVisible = v)">
        <v-expand-x-transition>
          <TimelineSearchAppBar
            v-if="searchVisible"
            @toggle-appbar="(v) => (searchVisible = v)"
          />
        </v-expand-x-transition>
      </TimelineAppBar>
    </v-fade-transition>

    <TimelineDrawerLeft />
    <v-main>
      <v-container>
        <TheAlert />
        <nuxt />
      </v-container>
    </v-main>
    <TheBottomBar />
    <TheFixedComponents />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      searchVisible: false,
    }
  },
}
</script>
