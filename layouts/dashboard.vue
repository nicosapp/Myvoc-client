<template>
  <v-app dark>
    <DashboardAppBar />
    <DashboardDrawerLeft />
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
