<template>
  <v-dialog
    v-model="filterVisible"
    :width="width"
    scrollable
    :fullscreen="$vuetify.breakpoint.mobile"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar dark dense color="primary">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
      </v-card-title>

      <v-card-text class="pa-0">
        <slot />
      </v-card-text>
      <v-card-actions style="height: 48px" class="grey lighten-3 elevation-1">
        <slot name="actions">
          <v-spacer></v-spacer>
        </slot>
        <v-btn text color="primary" @click.prevent="filterVisible = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
export default {
  mixins: [timelineHelper],
  props: {
    title: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 300,
    },
  },
}
</script>
