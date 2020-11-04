<template>
  <v-sheet>
    <v-list dense>
      <v-subheader>Quick actions</v-subheader>
      <v-list-item-group v-model="selectedItem">
        <v-list-item :value="0" @click="toggleRating">
          <v-list-item-icon><v-icon>mdi-star</v-icon></v-list-item-icon>
          <v-list-item-title>Rating</v-list-item-title>
        </v-list-item>
        <v-list-item :value="1">
          <v-list-item-icon
            ><v-icon>mdi-cursor-default</v-icon></v-list-item-icon
          >
          <v-list-item-title>Select </v-list-item-title>
        </v-list-item>
        <v-list-item :value="2">
          <v-list-item-icon
            ><v-icon>mdi-cursor-default-click</v-icon></v-list-item-icon
          >
          <v-list-item-title>Select All</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
export default {
  mixins: [timelineHelper],
  data() {
    return {
      selectedItem: null,
    }
  },
  methods: {
    toggleRating() {
      this.rating = !this.rating
      this.$emit('close', null)
    },
  },
}
</script>
