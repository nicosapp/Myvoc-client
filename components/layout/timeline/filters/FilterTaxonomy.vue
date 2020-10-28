<template>
  <v-dialog v-model="filterVisible" width="200">
    <v-card>
      <v-list nav dense light>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="`tax-${i}`"
            ripple
            @click.prevent="set(item)"
          >
            {{ item.name | capitalize }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
export default {
  mixins: [timelineHelper],
  data() {
    return {
      items: [
        { name: 'category' },
        { name: 'note' },
        { name: 'grammar' },
        { name: 'level' },
        { name: 'rating' },
        { name: 'date' },
      ],
    }
  },
  methods: {
    set(item) {
      this.setFilters({ taxonomy: item.name })
      this.visible = false
    },
  },
}
</script>
