<template>
  <DialogFilter title="Category" :width="400">
    <template v-slot:default>
      <LoadingCircular v-if="!items" height="200px" />
      <v-list v-else nav dense light>
        <v-list-item-group
          v-model="model"
          multiple
          color="primary"
          active-class=""
        >
          <NestedCategoryItem
            v-for="category in items"
            :key="category.id"
            :category="category"
            :depth="1"
          />
        </v-list-item-group>
      </v-list>
    </template>

    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn text @click.prevent="model = null">Clear</v-btn>
    </template>
  </DialogFilter>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import { mapGetters } from 'vuex'

import NestedCategoryItem from './components/NestedCategoryItem'

export default {
  components: {
    NestedCategoryItem,
  },
  mixins: [timelineHelper],
  data() {
    return {
      model: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/nestedCategories',
    }),
  },
  watch: {
    model(newModel) {
      let category = null
      if (Array.isArray(newModel)) {
        category = newModel.filter((v) => v)
      }
      this.setFilters({ category })
    },
  },
  mounted() {
    this.model = this.filterCategory
  },
}
</script>
