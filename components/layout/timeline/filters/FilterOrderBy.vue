<template>
  <DialogFilter title="Order By" :width="200">
    <template v-slot:default>
      <LoadingCircular v-if="!items" height="200px" />
      <v-list v-else nav dense light>
        <v-list-item-group v-model="model" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="`order-${i}`"
            ripple
            :value="item.name"
            @click.prevent="filterVisible = false"
          >
            {{ item.name | capitalize }}
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
      items: [
        { name: 'alphabetical' },
        { name: 'random' },
        { name: 'date' },
        { name: 'grammar' },
        { name: 'rating' },
        { name: 'highlight' },
        { name: 'level' },
      ],
    }
  },
  watch: {
    model(newValue) {
      let orderBy = newValue
      if (orderBy === 'random') {
        orderBy += ',' + this.randomSeed()
      }
      this.setFilters({ orderBy })
    },
  },
  mounted() {
    this.model = this.filterOrderBy
  },
  methods: {
    randomSeed() {
      return Math.floor(Math.random() * 10000)
    },
  },
}
</script>
