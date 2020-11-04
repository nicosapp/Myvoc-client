<template>
  <DialogFilter title="Column" :width="200">
    <template v-slot:default>
      <v-list nav dense light>
        <v-list-item-group v-model="model" color="primary">
          <v-list-item
            v-for="i in 4"
            :key="`col-${i}`"
            ripple
            :value="i"
            @click.prevent="filterVisible = false"
          >
            {{ i }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </DialogFilter>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
export default {
  mixins: [timelineHelper],
  data() {
    return {
      model: null,
    }
  },
  watch: {
    model(column) {
      this.setFilters({ column })
    },
  },
  mounted() {
    this.model = this.$vuetify.breakpoint.mobile ? 1 : 2
    this.setFilters({ column: this.model })
  },
}
</script>
